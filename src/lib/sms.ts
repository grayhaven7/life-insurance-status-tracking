import { getStageById, STAGES } from "@/lib/stages";

type TwilioConfig =
  | {
      accountSid: string;
      authToken: string;
      fromNumber?: string;
      messagingServiceSid?: string;
    }
  | { error: string };

function getTwilioConfig(): TwilioConfig {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  if (!accountSid || !authToken) {
    return { error: "SMS service not configured (TWILIO_ACCOUNT_SID/TWILIO_AUTH_TOKEN missing)" };
  }

  if (!fromNumber && !messagingServiceSid) {
    return { error: "SMS service not configured (TWILIO_FROM_NUMBER or TWILIO_MESSAGING_SERVICE_SID required)" };
  }

  return { accountSid, authToken, fromNumber: fromNumber || undefined, messagingServiceSid: messagingServiceSid || undefined };
}

function normalizePhoneNumber(raw: string): string {
  const trimmed = raw.trim();
  const cleaned = trimmed.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) return cleaned;

  const digits = cleaned.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`; // default to US if user entered 10 digits
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return cleaned;
}

function getBaseUrl(): string {
  return process.env.AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
}

export interface SendStatusUpdateSmsParams {
  to: string;
  clientName: string;
  newStage: number;
  note?: string;
}

export async function sendStatusUpdateSms({ to, clientName, newStage, note }: SendStatusUpdateSmsParams) {
  const cfg = getTwilioConfig();
  if ("error" in cfg) {
    console.warn(cfg.error);
    return null;
  }

  const stage = getStageById(newStage);
  if (!stage) {
    throw new Error(`Invalid stage: ${newStage}`);
  }

  const toPhone = normalizePhoneNumber(to);
  const baseUrl = getBaseUrl();

  const bodyLines = [
    `Emerald Tide Financial: Hi ${clientName}, your application is now at Stage ${newStage}/${STAGES.length} - ${stage.shortName || stage.name}.`,
  ];
  if (note && note.trim()) {
    bodyLines.push(`Note: ${note.trim()}`);
  }
  bodyLines.push(`Portal: ${baseUrl}/login`);

  const body = bodyLines.join(" ");

  const url = `https://api.twilio.com/2010-04-01/Accounts/${cfg.accountSid}/Messages.json`;
  const auth = Buffer.from(`${cfg.accountSid}:${cfg.authToken}`).toString("base64");

  const form = new URLSearchParams();
  form.set("To", toPhone);
  form.set("Body", body);
  if (cfg.messagingServiceSid) {
    form.set("MessagingServiceSid", cfg.messagingServiceSid);
  } else if (cfg.fromNumber) {
    form.set("From", cfg.fromNumber);
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Twilio SMS failed (${res.status}): ${text}`);
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { raw: text };
  }
}
