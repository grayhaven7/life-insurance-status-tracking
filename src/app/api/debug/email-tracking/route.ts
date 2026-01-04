import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { createEmailTracking, generateTrackingPixel } from "@/lib/email-tracking";

/**
 * Debug endpoint for testing email tracking
 * GET: View all email tracking records
 * POST: Create a test tracking record
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");

    const where = clientId ? { clientId } : {};

    const emailOpens = await prisma.emailOpen.findMany({
      where,
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({
      count: emailOpens.length,
      emailOpens,
    });
  } catch (error) {
    console.error("Error fetching email tracking records:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

/**
 * POST: Create a test email tracking record
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { clientId, emailType = "status_update", subject = "Test Email" } = body;

    if (!clientId) {
      return NextResponse.json({ error: "clientId is required" }, { status: 400 });
    }

    // Verify client exists
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      select: { id: true, name: true, email: true },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Create tracking record
    const trackingId = await createEmailTracking({
      clientId,
      emailType: emailType as "status_update" | "welcome" | "admin_invitation",
      subject,
    });

    const baseUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
    const trackingUrl = `${baseUrl}/api/track/${trackingId}`;
    const trackingPixel = generateTrackingPixel(trackingId);

    return NextResponse.json({
      success: true,
      trackingId,
      trackingUrl,
      trackingPixel,
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
      },
      testInstructions: {
        step1: "Copy the trackingUrl above",
        step2: "Open it in a browser or use curl to simulate an email open",
        step3: "Check the emailOpens table to see if openCount increased",
        curlExample: `curl "${trackingUrl}" -o /dev/null -v`,
      },
    });
  } catch (error) {
    console.error("Error creating test email tracking:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

