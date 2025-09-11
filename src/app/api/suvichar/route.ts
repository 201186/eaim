// app/api/suvichar/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1) Random quote from Quotable (free, OSS)
    const qRes = await fetch("https://api.quotable.io/random", { cache: "no-store" });
    if (!qRes.ok) throw new Error("Failed to fetch quote");
    const qJson = await qRes.json();
    const content: string = qJson.content;
    const author: string | undefined = qJson.author;

    // 2) Translate to Gujarati using LibreTranslate
    const LT_URL = process.env.LT_URL || "https://libretranslate.com/translate";
    const LT_API_KEY = process.env.LT_API_KEY || undefined;

    const tRes = await fetch(LT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: content,
        source: "en",
        target: "gu",
        format: "text",
        ...(LT_API_KEY ? { api_key: LT_API_KEY } : {}),
      }),
    });

    let translated = content;
    if (tRes.ok) {
      const tJson = await tRes.json();
      translated = tJson.translatedText || content;
    }

    return NextResponse.json({
      text_gu: translated,
      text_en: content,
      author,
      source: "Quotable + LibreTranslate",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
