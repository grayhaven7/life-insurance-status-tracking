import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendStatusUpdateEmail } from "@/lib/email";
import { sendStatusUpdateSms } from "@/lib/sms";
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
    let emailDebugInfo: Record<string, unknown> | null = null;

    if (process.env.RESEND_API_KEY) {
      try {
        const emailResult = await sendStatusUpdateEmail({
          to: client.email,
          clientName: client.name,
          clientId: client.id,
          newStage: stage,
          note,
        });
        emailSent = emailResult !== null;
        if (emailResult) {
          emailDebugInfo = { emailId: emailResult.id, trackingId: emailResult.trackingId };
        }
      } catch (err) {
        console.error("Failed to send status update email:", err);
        emailError = err instanceof Error ? err.message : "Failed to send email";
        // Capture additional debug info from Resend errors
        if (err && typeof err === "object") {
          const resendErr = (err as { resendError?: unknown }).resendError;
          if (resendErr) {
            emailDebugInfo = { resendError: resendErr };
          }
        }
      }
    } else {
      emailError = "Email service not configured (RESEND_API_KEY missing)";
    }

    // Send SMS notification (Twilio)
    let smsSent = false;
    let smsError: string | null = null;
    let smsDebugInfo: Record<string, unknown> | null = null;

    if (!client.phone) {
      smsError = "Client has no phone number on file";
    } else {
      try {
        const smsResult = await sendStatusUpdateSms({
          to: client.phone,
          clientName: client.name,
          newStage: stage,
          note,
        });
        smsSent = smsResult !== null;
        if (smsResult && typeof smsResult === "object") {
          const maybe = smsResult as { sid?: unknown; status?: unknown; to?: unknown };
          smsDebugInfo = { sid: maybe.sid, status: maybe.status, to: maybe.to };
        }
      } catch (err) {
        console.error("Failed to send status update SMS:", err);
        smsError = err instanceof Error ? err.message : "Failed to send SMS";
      }
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
      emailDebugInfo,
      smsSent,
      smsError,
      smsDebugInfo,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
