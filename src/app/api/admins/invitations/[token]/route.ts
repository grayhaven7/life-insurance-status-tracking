import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prisma from "@/lib/db";

interface RouteParams {
  params: Promise<{ token: string }>;
}

// GET /api/admins/invitations/[token] - Validate invitation token
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { token } = await params;

    const invitation = await prisma.adminInvitation.findUnique({
      where: { token },
      include: {
        invitedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Invalid invitation token" },
        { status: 404 }
      );
    }

    if (invitation.usedAt) {
      return NextResponse.json(
        { error: "This invitation has already been used" },
        { status: 400 }
      );
    }

    if (new Date() > invitation.expiresAt) {
      return NextResponse.json(
        { error: "This invitation has expired" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: invitation.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      email: invitation.email,
      name: invitation.name,
      contactEmail: invitation.contactEmail,
      contactPhone: invitation.contactPhone,
      invitedBy: invitation.invitedBy.name,
      expiresAt: invitation.expiresAt,
    });
  } catch (error: any) {
    console.error("Error validating invitation:", error);
    
    // Handle Prisma table doesn't exist error
    if (error?.code === "P2021" || error?.message?.includes("does not exist")) {
      return NextResponse.json(
        { error: "Database table not found. Please run database migrations." },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admins/invitations/[token]/accept - Accept invitation and create account
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { token } = await params;
    const body = await request.json();
    const { name, password } = body;

    if (!name || !password) {
      return NextResponse.json(
        { error: "Name and password are required" },
        { status: 400 }
      );
    }

    // Validate invitation
    const invitation = await prisma.adminInvitation.findUnique({
      where: { token },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Invalid invitation token" },
        { status: 404 }
      );
    }

    if (invitation.usedAt) {
      return NextResponse.json(
        { error: "This invitation has already been used" },
        { status: 400 }
      );
    }

    if (new Date() > invitation.expiresAt) {
      return NextResponse.json(
        { error: "This invitation has expired" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: invitation.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const bcrypt = await import("bcryptjs");
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user account and mark invitation as used in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the user
      const user = await tx.user.create({
        data: {
          email: invitation.email,
          name,
          passwordHash,
          role: "admin",
          contactEmail: invitation.contactEmail,
          contactPhone: invitation.contactPhone,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      // Mark invitation as used
      await tx.adminInvitation.update({
        where: { id: invitation.id },
        data: { usedAt: new Date() },
      });

      return user;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Error accepting invitation:", error);
    console.error("Error details:", {
      code: error?.code,
      message: error?.message,
      meta: error?.meta,
    });
    
    // Handle Prisma table doesn't exist error
    if (error?.code === "P2021" || error?.message?.includes("does not exist")) {
      return NextResponse.json(
        { error: "Database table not found. Please run database migrations." },
        { status: 500 }
      );
    }
    
    // Handle Prisma unique constraint errors
    if (error?.code === "P2002") {
      const field = error?.meta?.target?.[0] || "field";
      return NextResponse.json(
        { error: `An account with this ${field} already exists` },
        { status: 400 }
      );
    }
    
    // Handle foreign key constraint errors
    if (error?.code === "P2003") {
      return NextResponse.json(
        { error: "Invalid invitation reference" },
        { status: 400 }
      );
    }
    
    // Handle transaction errors
    if (error?.message?.includes("transaction")) {
      return NextResponse.json(
        { error: "Failed to complete account creation. Please try again." },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

