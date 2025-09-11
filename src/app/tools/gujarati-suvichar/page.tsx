"use client";

import { useMemo, useRef, useState } from "react";

type Quote = { text: string; author?: string; category?: string };

const GRADIENTS = [
  "from-rose-100 via-pink-100 to-amber-100",
  "from-teal-100 via-cyan-100 to-sky-100",
  "from-amber-100 via-lime-100 to-emerald-100",
  "from-slate-100 via-zinc-100 to-neutral-100",
  "from-indigo-100 via-sky-100 to-cyan-100",
  "from-fuchsia-100 via-pink-100 to-rose-100",
];

export default function GujaratiSuvichar() {
  const [current, setCurrent] = useState<Quote | null>(null);
  const [bg, setBg] = useState(GRADIENTS[0]);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function randomItem<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  async function generate() {
    try {
      setLoading(true);
      const res = await fetch("/api/suvichar", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setCurrent({ text: data.text_gu, author: data.author });
        setBg(randomItem(GRADIENTS));
      } else {
        alert(data.error || "API error");
      }
    } finally {
      setLoading(false);
    }
  }

  async function copyText() {
    if (!current) return;
    const text = `“${current.text}”${current.author ? ` — ${current.author}` : ""}`;
    await navigator.clipboard.writeText(text);
    alert("ટેક્સ્ટ કૉપી થયું ✅");
  }

  async function shareText() {
    if (!current) return;
    const text = `“${current.text}”${current.author ? ` — ${current.author}` : ""}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "ગુજરાતી સુવિચાર", text });
      } catch {
        await navigator.clipboard.writeText(text);
        alert("શેર સપોર્ટેડ નથી. ટેક્સ્ટ કૉપી કર્યું ✅");
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert("શેર સપોર્ટેડ નથી. ટેક્સ્ટ કૉપી કર્યું ✅");
    }
  }

  async function downloadImage() {
    if (!cardRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: null });
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "suvichar.png";
    a.click();
  }

  return (
    <div className="min-h-[100dvh] bg-white">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">ગુજરાતી સુવિચાર જનરેટર</h1>
          <p className="text-sm text-gray-600 mt-1">“નવું સુવિચાર” → Copy / Share / Image Download</p>
        </header>

        <div className="flex gap-3 items-stretch mb-6">
          <button
            onClick={generate}
            disabled={loading}
            className="rounded-xl px-4 py-2 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "લો્ડ થઈ રહ્યું છે…" : "નવું સુવિચાર"}
          </button>
        </div>

        <div ref={cardRef} className={`rounded-2xl p-6 md:p-10 shadow-sm border border-gray-200 bg-gradient-to-br ${bg}`}>
          {current ? (
            <div className="text-center">
              <p className="text-xl md:text-2xl leading-relaxed font-semibold">“{current.text}”</p>
              {current.author && (
                <div className="mt-3 text-sm text-gray-800/80">— {current.author}</div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-600">પહેલા “નવું સુવિચાર” દબાવો 📜</div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button onClick={copyText} disabled={!current} className="rounded-xl px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50">કૉપી</button>
          <button onClick={shareText} disabled={!current} className="rounded-xl px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50">શેર</button>
          <button onClick={downloadImage} disabled={!current} className="rounded-xl px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50">ઈમેજ ડાઉનલોડ</button>
        </div>
      </div>
    </div>
  );
}
