import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  smsConsent: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // If Resend is configured, send notification email
    if (resend) {
      try {
        await resend.emails.send({
          from: "Emerald Tide Financial <noreply@emeraldtidefinancial.com>",
          to: ["neil@emeraldtidefinancial.com"],
          subject: `New Contact Form Submission from ${body.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Phone:</strong> ${body.phone}</p>
            <p><strong>Message:</strong> ${body.message || "No message provided"}</p>
            <p><strong>SMS Consent:</strong> ${body.smsConsent ? "Yes" : "No"}</p>
            <hr />
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError);
        // Continue even if email fails - we don't want to block the form submission
      }
    } else {
      // Log the submission if Resend is not configured
      console.log("Contact form submission:", {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        smsConsent: body.smsConsent,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process form submission" },
      { status: 500 }
    );
  }
}
