// src/app/exams/mental/page.tsx
import Link from "next/link";

const sets = Array.from({ length: 8 }, (_, i) => i + 1);

export default function MentalLanding() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Mental Ability – Practice Sets</h1>

      <p className="text-gray-600 mb-6">
        નીચે 1 થી 8 સેટમાંથી કોઈ સેટ પસંદ કરો. દરેક સેટમાં{" "}
        <span className="font-semibold">20 પ્રશ્નો</span> હશે (આને તમે જરૂરી પ્રમાણે બદલી શકો).
        પ્રશ્નોમાં ચાર વિકલ્પ હશે અને કેટલાક પ્રશ્નો સાથે સીમ્બોલ/આકૃતિ (SVG/WEBP)
        સમાવિષ્ટ રહેશે.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sets.map((n) => (
          <Link
            key={n}
            href={`/exams/mental/${n}`}
            className="rounded-2xl border bg-indigo-100 hover:bg-indigo-200 p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl font-bold text-indigo-800">Set {n}</div>
            <div className="mt-1 text-sm text-gray-700">20 Questions</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-gray-700 leading-relaxed">
        <p>
          Our <strong>Mental Ability practice sets</strong> are designed to test visual
          reasoning, pattern recognition, series completion, analogy, mirror/rotation,
          and spatial understanding. Some questions include images (SVG) that are served
          from <code>/public/images/</code> or a CDN.
        </p>

        <p className="mt-4">
          ટિપ્સ: દરેક સેટને નિયમિતપણે પ્રેક્ટિસ કરો — ખાસ કરીને રજુ કરવામાં આવેલી
          આકૃતિઓને ધીમે ધીમે ધ્યાનથી જોઈને ઉકેલવાની કલા વિકસાવો. તમે નવી પ્રાયોગિકતા
          શરૂ કરવા માટે, પસંદ કરેલ સેટ પર ક્લિક કરો.
        </p>
      </div>
    </div>
  );
}
