import Link from "next/link";

const sets = Array.from({ length: 8 }, (_, i) => i + 1);

export default function NMMSLanding() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">NMMS – Practice Sets</h1>
      <p className="text-gray-600 mb-6">
        નીચેના 1 થી 8 સેટમાંથી પસંદ કરીને 40 પ્રશ્નોની ટેસ્ટ આપો. દરેક પ્રયાસે નવા ક્રમે પ્રશ્નો આવે.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sets.map((n) => (
          <Link
            key={n}
            href={`/exams/nmms/${n}`}
            className="rounded-2xl border bg-blue-100 hover:bg-blue-200 p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl font-bold text-blue-800">Set {n}</div>
            <div className="mt-1 text-sm text-gray-700">40 Questions</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-gray-700 leading-relaxed">
        <p>
          The <strong>National Means-cum-Merit Scholarship (NMMS) Exam</strong> is
          conducted to support talented students from economically weaker sections.
          Preparing through practice sets helps improve accuracy, speed, and
          confidence. These NMMS practice tests are designed with 40 important
          questions in each set, covering both MAT (Mental Ability Test) and SAT
          (Scholastic Aptitude Test) sections. Regular practice allows students to
          understand exam patterns, manage time effectively, and strengthen problem-solving
          skills. Attempting these free online NMMS mock tests is one of the best ways to
          get exam-ready and increase your chances of success.
        </p>
      </div>
    </div>
  );
}
