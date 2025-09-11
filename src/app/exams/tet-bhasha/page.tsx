import Link from "next/link";

const sets = Array.from({ length: 8 }, (_, i) => i + 1);

export default function TETBhashaLanding() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">TET – Bhasha (Language)</h1>
      <p className="text-gray-600 mb-6">
        નીચેના 1 થી 8 સેટમાંથી પસંદ કરો. દરેક સેટમાં 40 પ્રશ્નો હશે, અને દરેક પ્રયત્ને નવા ક્રમે આવશે.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sets.map((n) => (
          <Link
            key={n}
            href={`/exams/tet-bhasha/${n}`}
            className="rounded-2xl border bg-blue-100 hover:bg-blue-200 p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl font-bold text-blue-800">Set {n}</div>
            <div className="mt-1 text-sm text-gray-700">40 Questions</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-gray-700 leading-relaxed">
        <p>
          The <strong>Teacher Eligibility Test (TET) – Bhasha</strong> is an important
          section for candidates aspiring to become teachers. This part of the exam
          evaluates a candidate’s proficiency in the chosen language subject, including
          grammar, comprehension, vocabulary, and teaching methodology. Performing well
          in the Bhasha section is crucial, as it directly reflects a teacher’s ability
          to communicate and explain concepts effectively to students in the classroom.
        </p>
        <p className="mt-4">
          Our <strong>TET Bhasha practice sets</strong> include 40 questions in each
          test, carefully designed to mirror the real exam pattern. These sets cover
          multiple aspects such as reading comprehension, language skills, and
          pedagogy-related questions. Every attempt reshuffles the sequence, offering
          a fresh experience and preventing memorization. By regularly practicing
          these mock tests, candidates can improve accuracy, boost confidence, and
          manage time effectively during the actual exam. These free online TET Bhasha
          practice sets are a valuable resource for aspiring teachers to strengthen
          their preparation and move closer to qualifying for their teaching career.
        </p>
      </div>
    </div>
  );
}
