import { NextRequest, NextResponse } from "next/server";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequest {
  messages: Message[];
}

const SYSTEM_PROMPT = `You are a helpful assistant for Emerald Tide Financial, specialists in Tax-Free Pensions.

Your role:
- Answer general questions about Tax-Free Pensions and how they work
- Explain the benefits of tax-free retirement income
- Be friendly, professional, and helpful

Important rules:
- NEVER mention life insurance, whole life, universal life, IUL, or any insurance products
- NEVER provide specific financial advice or make promises about returns
- For detailed questions about individual situations, eligibility, or to get started, direct users to book a consultation at: https://calendly.com/d/cmd8-9f4-5jf/tax-free-pension-tfp
- Keep responses concise and helpful

If asked about life insurance or insurance products, respond: "At Emerald Tide Financial, we focus exclusively on Tax-Free Pension strategies. I'd be happy to tell you more about how Tax-Free Pensions work, or you can schedule a consultation with our team to discuss your specific situation."

Key talking points about Tax-Free Pensions:
- Tax-free growth on contributions
- Tax-free income in retirement
- Principal protection from market volatility
- No government-imposed contribution limits
- Flexible access to funds
- Legacy planning benefits

Emerald Tide Financial contact information:
- Phone: (575) 363-7253 (575.EMERALD)
- Email: neil@emeraldtidefinancial.com
- Book a consultation at: https://calendly.com/d/cmd8-9f4-5jf/tax-free-pension-tfp

Remember: For any substantive financial questions or personalized advice, always recommend booking a free consultation.`;

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      // Return a fallback response if OpenAI is not configured
      return NextResponse.json({
        message: "Thank you for your question! For detailed information about Tax-Free Pensions and how they can work for your specific situation, I'd recommend booking a free consultation with our team. You can schedule a call at your convenience through our calendar. Is there anything else I can help you with?",
      });
    }

    // Prepare messages with system prompt
    const messages: Message[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...body.messages.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    ];

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      throw new Error("Failed to get response from AI");
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error("No response from AI");
    }

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        message:
          "I apologize, but I'm having trouble processing your request right now. For immediate assistance, please call us at (575) 363-7253 or book a free consultation with our team.",
      },
      { status: 200 } // Return 200 so the UI shows the message gracefully
    );
  }
}
