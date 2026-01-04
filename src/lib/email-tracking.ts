import { randomUUID } from "crypto";
import prisma from "@/lib/db";

export type EmailType = "status_update" | "welcome" | "admin_invitation";

interface CreateEmailTrackingParams {
  clientId: string;
  emailType: EmailType;
  subject: string;
}

/**
 * Creates an email tracking record and returns the tracking ID
 */
export async function createEmailTracking({
  clientId,
  emailType,
  subject,
}: CreateEmailTrackingParams): Promise<string> {
  const trackingId = randomUUID();

  await prisma.emailOpen.create({
    data: {
      trackingId,
      clientId,
      emailType,
      subject,
    },
  });

  return trackingId;
}

/**
 * Generates the tracking pixel HTML to embed in emails
 */
export function generateTrackingPixel(trackingId: string): string {
  const baseUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
  const trackingUrl = `${baseUrl}/api/track/${trackingId}`;
  
  return `<img src="${trackingUrl}" width="1" height="1" style="display:none;width:1px;height:1px;border:0;" alt="" />`;
}

/**
 * Gets email tracking stats for a client
 */
export async function getClientEmailStats(clientId: string) {
  const emailOpens = await prisma.emailOpen.findMany({
    where: { clientId },
    orderBy: { createdAt: "desc" },
  });

  return emailOpens;
}

/**
 * Gets the most recent email open for a client
 */
export async function getLatestEmailOpen(clientId: string) {
  return await prisma.emailOpen.findFirst({
    where: { clientId },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Gets email open statistics summary for a client
 */
export async function getEmailOpenSummary(clientId: string) {
  const emails = await prisma.emailOpen.findMany({
    where: { clientId },
    orderBy: { createdAt: "desc" },
  });

  const totalEmails = emails.length;
  const openedEmails = emails.filter((e) => e.openCount > 0).length;
  const latestEmail = emails[0] || null;
  const latestOpenedEmail = emails.find((e) => e.openCount > 0) || null;

  return {
    totalEmails,
    openedEmails,
    unopenedEmails: totalEmails - openedEmails,
    latestEmail,
    latestOpenedEmail,
    hasOpenedAny: openedEmails > 0,
  };
}



