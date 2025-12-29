import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { hashPassword } from "@/lib/auth";
import prisma from "@/lib/db";

// GET /api/admins - Fetch all admins
export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admins = await prisma.user.findMany({
      where: { role: "admin" },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        contactEmail: true,
        contactPhone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admins - Create a new admin
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, password, contactEmail, contactPhone } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    const admin = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "admin",
        contactEmail: contactEmail || null,
        contactPhone: contactPhone || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        contactEmail: true,
        contactPhone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(admin, { status: 201 });
  } catch (error: any) {
    console.error("Error creating admin:", error);
    
    // Handle Prisma unique constraint errors (duplicate email)
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}










