import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendStatusUpdateEmail } from "@/lib/email";
import { STAGES } from "@/lib/stages";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { stage, note } = body;

    // Validate stage
    if (!stage || stage < 1 || stage > STAGES.length) {
      return NextResponse.json(
        { error: `Invalid stage. Must be between 1 and ${STAGES.length}` },
        { status: 400 }
      );
    }

    // Get current client
    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Update client stage
    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        currentStage: stage,
      },
    });

    // Create status history entry
    const historyEntry = await prisma.statusHistory.create({
      data: {
        clientId: id,
        stage,
        changedBy: session.user.id,
        note: note || null,
      },
    });

    // Send email notification
    let emailSent = false;
    let emailError: string | null = null;

    if (process.env.RESEND_API_KEY) {
      try {
        const emailResult = await sendStatusUpdateEmail({
          to: client.email,
          clientName: client.name,
          newStage: stage,
          note,
        });
        emailSent = emailResult !== null;
      } catch (err) {
        console.error("Failed to send status update email:", err);
        emailError = err instanceof Error ? err.message : "Failed to send email";
      }
    } else {
      emailError = "Email service not configured";
    }

    return NextResponse.json({
      client: {
        id: updatedClient.id,
        currentStage: updatedClient.currentStage,
      },
      historyEntry: {
        id: historyEntry.id,
        stage: historyEntry.stage,
        note: historyEntry.note,
        createdAt: historyEntry.createdAt,
      },
      emailSent,
      emailError,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
