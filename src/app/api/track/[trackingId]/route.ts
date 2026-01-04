import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// 1x1 transparent GIF (smallest valid GIF)
const TRANSPARENT_GIF = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

interface RouteParams {
  params: Promise<{ trackingId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { trackingId } = await params;

    // Remove .gif extension if present (for /api/track/[trackingId]/pixel.gif style URLs)
    const cleanTrackingId = trackingId.replace(/\.gif$/, "");

    // Update tracking record in database
    const emailOpen = await prisma.emailOpen.findUnique({
      where: { trackingId: cleanTrackingId },
    });

    if (emailOpen) {
      const now = new Date();
      await prisma.emailOpen.update({
        where: { trackingId: cleanTrackingId },
        data: {
          firstOpenedAt: emailOpen.firstOpenedAt ?? now,
          lastOpenedAt: now,
          openCount: { increment: 1 },
        },
      });
    }

    // Return transparent 1x1 GIF with no-cache headers
    return new NextResponse(TRANSPARENT_GIF, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        "Content-Length": String(TRANSPARENT_GIF.length),
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Error tracking email open:", error);
    // Still return the GIF even if tracking fails
    return new NextResponse(TRANSPARENT_GIF, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        "Content-Length": String(TRANSPARENT_GIF.length),
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  }
}


