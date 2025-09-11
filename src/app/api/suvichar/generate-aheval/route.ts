// src/app/api/generate-aheval/route.ts
import { NextResponse } from "next/server";

type ReqBody = {
  name?: string;
  school?: string;
  eventName?: string;
  date?: string;
  days?: number;
  length?: "short" | "medium" | "long";
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured on server. Set OPENAI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const systemPrompt = `You are an assistant that writes formal Gujarati event reports for schools. Keep tone respectful, clear, and about 180-230 words for "medium" length. Use provided fields (name, school, eventName, date, days). Mention the event, activities, participants, positive outcomes and a closing congratulatory sentence. Produce only the report text (no headings, no extra JSON).`;

    const userPrompt = `
Generate a Gujarati school event report using these details:

Event name: ${body.eventName || "અનામ રૂબરૂ ઇવેન્ટ"}
Participant / name: ${body.name || "વિદ્યાર્થી/ભાગ લઈને"}
School: ${body.school || "અમારી શાળા"}
Date: ${body.date || "સંપૂર્ણતાની તારીખ"}
Days: ${body.days ?? 1}

Desired length: ${body.length || "medium"} (short ~80-120 words, medium ~180-230 words, long ~300+ words).

Write in Gujarati. Do not include any explanation about how the text was generated. Do not include markup or quotes — only plain Gujarati paragraphs.
    `;

    // NOTE: choose a model you have access to.
    // If you get 401/404, try "gpt-4" or "gpt-3.5-turbo" or another model available in your account.
    const model = "gpt-4o-mini";

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 900,
      }),
    });

    if (!openaiRes.ok) {
      // propagate the error details for debugging
      const txt = await openaiRes.text();
      console.error("OpenAI responded with error:", openaiRes.status, txt);
      return NextResponse.json({ error: "OpenAI error", details: txt }, { status: 500 });
    }

    const data = await openaiRes.json();

    // Try common response shapes:
    // 1) Chat completions: data.choices[0].message.content
    // 2) Older style: data.choices[0].text
    // 3) Responses API style: data.output_text or data.output[0].content[0].text
    let text: string | null = null;

    try {
      text =
        (data?.choices?.[0]?.message?.content as string) ||
        (data?.choices?.[0]?.text as string) ||
        (data?.output_text as string) ||
        (Array.isArray(data?.output) && data.output[0]?.content?.map((c: any) => c?.text || c?.content || "").join(" ")) ||
        null;
    } catch (e) {
      text = null;
    }

    if (!text) {
      console.warn("Could not find text in OpenAI response shape. Returning raw data for debugging.");
      return NextResponse.json({ error: "No text in OpenAI response", raw: data }, { status: 500 });
    }

    return NextResponse.json({ report: String(text).trim() });
  } catch (err: any) {
    console.error("API generate-aheval error:", err);
    return NextResponse.json({ error: "Server error", details: String(err) }, { status: 500 });
  }
}
