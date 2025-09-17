// src/app/exams/visual/page.tsx
import Link from "next/link";

const sets = Array.from({ length: 8 }, (_, i) => i + 1);

export default function VisualLanding() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Visual Reasoning – Practice Sets</h1>

      <p className="text-gray-600 mb-6">
        नीचे 1 થી 8 સેટમાંથી કોઈ સેટ પસંદ કરો. દરેક સેટમાં{" "}
        <span className="font-semibold">20 પ્રશ્નો</span> હશે (આને તમે જરૂર મુજબ બદલી શકો).
        પ્રશ્નોમાં સામાન્ય રીતે આકૃતિઓ (SVG/WEBP) અને લખાણ બંને હોઈ શકે છે.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sets.map((n) => (
          <Link
            key={n}
            href={`/exams/visual/${n}`}
            className="rounded-2xl border bg-indigo-100 hover:bg-indigo-200 p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl font-bold text-indigo-800">Set {n}</div>
            <div className="mt-1 text-sm text-gray-700">20 Questions</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-gray-700 leading-relaxed">
        <p>
          Our <strong>Visual Reasoning practice sets</strong> focus on figure
          analysis, pattern recognition, mirror/rotation, odd-one-out, missing-piece
          and more. Images (SVG/WEBP) are served from <code>/public/images/</code> or a CDN.
        </p>

        <p className="mt-4">
          ટિપ્સ: પ્રેક્ટિસ દરમિયાન images ને સાવધાનીથી જુઓ — દરેક વિકલ્પનું માપ અને સંરચના તપાસો.
          સેટ શરૂ કરવા માટે તમારા પસંદ થયેલ સેટ પર ક્લિક કરો.
        </p>
      </div>
    </div>
  );
}
