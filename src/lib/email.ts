import { Resend } from "resend";
import { getStageById, getProgressPercentage, STAGES } from "./stages";
import { createEmailTracking, generateTrackingPixel } from "./email-tracking";

// Lazy initialization to avoid build errors
let resend: Resend | null = null;

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

interface SendStatusUpdateEmailParams {
  to: string;
  clientName: string;
  clientId: string;
  newStage: number;
  note?: string;
}

export async function sendStatusUpdateEmail({
  to,
  clientName,
  clientId,
  newStage,
  note,
}: SendStatusUpdateEmailParams) {
  const resendClient = getResendClient();
  
  if (!resendClient) {
    console.warn("Resend API key not configured, skipping email");
    return null;
  }

  const stage = getStageById(newStage);
  const progress = getProgressPercentage(newStage);
  const isComplete = newStage === STAGES.length;

  if (!stage) {
    throw new Error(`Invalid stage: ${newStage}`);
  }

  const nextStage = newStage < STAGES.length ? getStageById(newStage + 1) : null;

  const subject = isComplete
    ? "Congratulations! Your Tax-Free Pension Is Now In Force"
    : `Application Update: ${stage.name}`;

  const baseUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";

  // Create email tracking record
  const trackingId = await createEmailTracking({
    clientId,
    emailType: "status_update",
    subject,
  });
  const trackingPixel = generateTrackingPixel(trackingId);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1e3a5f; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Emerald Tide Financial</h1>
            <p style="color: #c9a227; margin: 10px 0 0 0; font-size: 14px;">Tax-Free Pension Application Update</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; margin: 0 0 20px 0;">
              Dear ${clientName},
            </p>
            
            <p style="color: #333; font-size: 16px; margin: 0 0 20px 0;">
              ${isComplete 
                ? "We are thrilled to inform you that your Tax-Free Pension application process is complete!" 
                : "We wanted to update you on the status of your Tax-Free Pension application."}
            </p>
            
            <div style="background-color: #f8f9fa; border-left: 4px solid #c9a227; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="color: #666; margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Current Status</p>
              <p style="color: #1e3a5f; margin: 0; font-size: 20px; font-weight: bold;">${stage.name}</p>
              <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">${stage.description}</p>
            </div>
            
            <div style="background-color: #e9ecef; border-radius: 10px; height: 20px; margin: 20px 0; overflow: hidden;">
              <div style="background: linear-gradient(90deg, #1e3a5f 0%, #c9a227 100%); height: 100%; width: ${progress}%; border-radius: 10px; transition: width 0.5s ease;"></div>
            </div>
            <p style="color: #666; text-align: center; font-size: 14px; margin: 0 0 20px 0;">
              Progress: <strong>${progress}%</strong> complete (Step ${newStage} of ${STAGES.length})
            </p>
            
            ${note ? `
              <div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #856404; margin: 0; font-size: 14px;"><strong>Note from your advisor:</strong></p>
                <p style="color: #856404; margin: 10px 0 0 0; font-size: 14px;">${note}</p>
              </div>
            ` : ""}
            
            ${nextStage && !isComplete ? `
              <p style="color: #666; font-size: 14px; margin: 20px 0;">
                <strong>Next step:</strong> ${nextStage.name}
              </p>
            ` : ""}
            
            <p style="color: #333; font-size: 16px; margin: 20px 0;">
              You can view your full application progress at any time by logging into your client portal.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${baseUrl}/progress" style="display: inline-block; background-color: #1e3a5f; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-size: 16px; font-weight: bold;">View Your Progress</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              If you have any questions, please contact your financial advisor.<br>
              Emerald Tide Financial | Neil Gronowetter
            </p>
          </div>
        </div>
        ${trackingPixel}
      </body>
    </html>
  `;

  const fromAddress = process.env.EMAIL_FROM || "Emerald Tide Financial <onboarding@resend.dev>";
  
  console.log("[Email Debug] Attempting to send status update email:", {
    from: fromAddress,
    to,
    subject,
    clientName,
    stage: newStage,
    trackingId,
  });

  try {
    const { data, error } = await resendClient.emails.send({
      from: fromAddress,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error("[Email Debug] Resend API returned error:", JSON.stringify(error, null, 2));
      const enhancedError = new Error(`Resend API error: ${error.message || JSON.stringify(error)}`);
      (enhancedError as Error & { resendError: unknown }).resendError = error;
      throw enhancedError;
    }

    console.log("[Email Debug] Email sent successfully:", JSON.stringify(data, null, 2));
    return { ...data, trackingId };
  } catch (error) {
    console.error("[Email Debug] Exception sending email:", {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "Unknown",
      stack: error instanceof Error ? error.stack : undefined,
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error as object), 2),
    });
    throw error;
  }
}

export async function sendAdminInvitationEmail({
  to,
  name,
  token,
  invitedBy,
}: {
  to: string;
  name: string;
  token: string;
  invitedBy: string;
}) {
  const client = getResendClient();
  
  if (!client) {
    console.warn("Resend API key not configured, skipping email");
    return null;
  }

  const baseUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
  const signupUrl = `${baseUrl}/admin/signup?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1e3a5f; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Emerald Tide Financial</h1>
            <p style="color: #c9a227; margin: 10px 0 0 0; font-size: 14px;">Admin Portal Invitation</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; margin: 0 0 20px 0;">
              Dear ${name},
            </p>
            
            <p style="color: #333; font-size: 16px; margin: 0 0 20px 0;">
              You have been invited by <strong>${invitedBy}</strong> to join the Emerald Tide Financial Admin Portal. 
              This portal allows you to manage client applications and track their progress.
            </p>
            
            <div style="background-color: #f8f9fa; border-left: 4px solid #c9a227; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;"><strong>Your Invited Email:</strong></p>
              <p style="color: #333; margin: 0; font-size: 14px;">${to}</p>
            </div>
            
            <p style="color: #333; font-size: 16px; margin: 20px 0;">
              To complete your account setup, please click the button below. You'll be asked to create a secure password for your account.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${signupUrl}" style="display: inline-block; background-color: #1e3a5f; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-size: 16px; font-weight: bold;">Create Your Account</a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin: 20px 0;">
              <strong>Important:</strong> This invitation link will expire in 7 days. If you have any questions, please contact ${invitedBy}.
            </p>
            
            <p style="color: #999; font-size: 12px; margin: 20px 0;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <span style="color: #1e3a5f; word-break: break-all;">${signupUrl}</span>
            </p>
            
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              Emerald Tide Financial Admin Portal
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const fromAddress = process.env.EMAIL_FROM || "Emerald Tide Financial <onboarding@resend.dev>";

  try {
    const { data, error } = await client.emails.send({
      from: fromAddress,
      to: [to],
      subject: "You've been invited to join the Admin Portal",
      html,
    });

    if (error) {
      console.error("Failed to send admin invitation email:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error sending admin invitation email:", error);
    throw error;
  }
}

export async function sendWelcomeEmail({
  to,
  name,
  email,
  password,
  clientId,
}: {
  to: string;
  name: string;
  email: string;
  password: string;
  clientId: string;
}) {
  const resendClient = getResendClient();
  
  if (!resendClient) {
    console.warn("Resend API key not configured, skipping email");
    return null;
  }

  const baseUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";

  // Create email tracking record
  const subject = "Welcome to Your Client Portal";
  const trackingId = await createEmailTracking({
    clientId,
    emailType: "welcome",
    subject,
  });
  const trackingPixel = generateTrackingPixel(trackingId);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1e3a5f; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Welcome to Emerald Tide Financial</h1>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; margin: 0 0 20px 0;">
              Dear ${name},
            </p>
            
            <p style="color: #333; font-size: 16px; margin: 0 0 20px 0;">
              Your client portal account has been created. You can now track the progress of your Tax-Free Pension application online.
            </p>
            
            <div style="background-color: #f8f9fa; border-left: 4px solid #c9a227; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;"><strong>Your Login Credentials:</strong></p>
              <p style="color: #333; margin: 0 0 5px 0; font-size: 14px;">Email: <strong>${email}</strong></p>
              <p style="color: #333; margin: 0; font-size: 14px;">Password: <strong>${password}</strong></p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin: 20px 0;">
              For security, we recommend changing your password after your first login.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${baseUrl}/progress" style="display: inline-block; background-color: #1e3a5f; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-size: 16px; font-weight: bold;">Access Your Portal</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              If you have any questions, please contact your financial advisor.<br>
              Emerald Tide Financial | Neil Gronowetter
            </p>
          </div>
        </div>
        ${trackingPixel}
      </body>
    </html>
  `;

  const fromAddress = process.env.EMAIL_FROM || "Emerald Tide Financial <onboarding@resend.dev>";

  try {
    const { data, error } = await resendClient.emails.send({
      from: fromAddress,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error("Failed to send welcome email:", error);
      throw error;
    }

    return { ...data, trackingId };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
}
