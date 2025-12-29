import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendAdminInvitationEmail } from "@/lib/email";
import crypto from "crypto";

// POST /api/admins/invitations - Create a new admin invitation
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, contactEmail, contactPhone } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if email already exists as a user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    // Check if there's already a pending invitation for this email
    const existingInvitation = await prisma.adminInvitation.findFirst({
      where: {
        email,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (existingInvitation) {
      return NextResponse.json(
        { error: "A pending invitation already exists for this email" },
        { status: 400 }
      );
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString("hex");
    
    // Set expiration to 7 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Create the invitation
    const invitation = await prisma.adminInvitation.create({
      data: {
        email,
        name,
        token,
        contactEmail: contactEmail || null,
        contactPhone: contactPhone || null,
        invitedById: session.user.id,
        expiresAt,
      },
      include: {
        invitedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Send invitation email
    try {
      await sendAdminInvitationEmail({
        to: email,
        name,
        token,
        invitedBy: invitation.invitedBy.name,
      });
    } catch (emailError) {
      console.error("Failed to send invitation email:", emailError);
      // Don't fail the request if email fails, but log it
    }

    return NextResponse.json(
      {
        id: invitation.id,
        email: invitation.email,
        name: invitation.name,
        expiresAt: invitation.expiresAt,
        createdAt: invitation.createdAt,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating invitation:", error);
    
    // Handle Prisma unique constraint errors
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "An invitation with this email already exists" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/admins/invitations - Get all pending invitations (admin only)
export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invitations = await prisma.adminInvitation.findMany({
      where: {
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        invitedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(invitations);
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

