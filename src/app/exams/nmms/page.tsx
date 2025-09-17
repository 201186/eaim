import Link from "next/link";

const sets = Array.from({ length: 8 }, (_, i) => i + 1);

export default function NMMSLanding() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">NMMS – Practice Sets</h1>
      <p className="text-gray-600 mb-6">
        નીચેના 1 થી 8 સેટમાંથી કોઈપણ પસંદ કરો. દરેક સેટમાં{" "}
        <span className="font-semibold">40 પ્રશ્નો</span> હશે,દરેક ટેસ્ટ સેટ માં જુદા જુદા પ્રશ્નો આવશે .
      ગણિત, વિજ્ઞાન ના અભ્યાસક્રમ મુજબ  દરેક પ્રયત્ન માં જુદા જુદા પ્રશ્ન આવશે .
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sets.map((n) => (
          <Link
            key={n}
            href={`/exams/nmms/${n}`}
            className="rounded-2xl border bg-indigo-100 hover:bg-indigo-200 p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl font-bold text-indigo-800">Set {n}</div>
            <div className="mt-1 text-sm text-gray-700">40 Questions</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-gray-700 leading-relaxed">
        <p>
          The <strong>NMMS (National Means cum Merit Scholarship)</strong> exam
          is conducted to identify talented students and provide them financial
          assistance for further studies. It evaluates logical reasoning,
          general knowledge, and scholastic aptitude.
        </p>
        <p className="mt-4">
          Our <strong>NMMS practice sets</strong> provide 40 questions in each
          test, carefully designed to match the real exam pattern. Each attempt
          reshuffles the order of questions and options, giving you a new test
          experience every time. Practicing these mock tests regularly will help
          you improve accuracy, strengthen problem-solving skills, and build
          confidence for the actual NMMS exam.
        </p>
      </div>
    </div>
  );
}
