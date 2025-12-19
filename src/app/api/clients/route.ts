import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/email";

export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clients = await prisma.client.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        currentStage: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, password, sendEmail } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingClient = await prisma.client.findUnique({
      where: { email },
    });

    if (existingClient) {
      return NextResponse.json(
        { error: "A client with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create client
    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone: phone || null,
        passwordHash,
        currentStage: 1,
      },
    });

    // Create initial status history
    await prisma.statusHistory.create({
      data: {
        clientId: client.id,
        stage: 1,
        changedBy: session.user.id,
        note: "Application submitted - account created",
      },
    });

    // Send welcome email if requested
    if (sendEmail) {
      try {
        await sendWelcomeEmail({
          to: email,
          name,
          email,
          password,
        });
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      id: client.id,
      name: client.name,
      email: client.email,
    });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
