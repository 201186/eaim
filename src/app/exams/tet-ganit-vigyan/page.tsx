import Link from "next/link";

const sets = Array.from({ length: 8 }, (_, i) => i + 1);

export default function TETGanitVigyanLanding() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">TET – Ganit Vigyan (Maths & Science)</h1>
      <p className="text-gray-600 mb-6">
        દરેક ટેસ્ટ સેટ માં જુદા જુદા પ્રશ્નો આવશે.  
        ગણિત અને વિજ્ઞાન વિષયના અભ્યાસક્રમ મુજબ દરેક પ્રયત્ન માં નવા પ્રશ્નો મળશે.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sets.map((n) => (
          <Link
            key={n}
            href={`/exams/tet-ganit-vigyan/${n}`}
            className="rounded-2xl border bg-green-100 hover:bg-green-200 p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl font-bold text-green-800">Set {n}</div>
            <div className="mt-1 text-sm text-gray-700">40 Questions</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-gray-700 leading-relaxed">
        <p>
          The <strong>Teacher Eligibility Test (TET) – Ganit Vigyan</strong> is an
          essential section for candidates aspiring to become teachers of Mathematics
          and Science. This part of the exam evaluates subject knowledge, problem-solving
          ability, and teaching methodology in both areas.
        </p>
        <p className="mt-4">
          Our <strong>TET Ganit Vigyan practice sets</strong> include 40 questions in each
          test, carefully designed to mirror the real exam pattern. These sets cover key
          topics such as arithmetic, algebra, geometry, physics, chemistry, and biology,
          along with pedagogy-related questions. Every attempt reshuffles the sequence,
          ensuring fresh practice every time and preventing rote memorization.
        </p>
        <p className="mt-4">
          By regularly practicing these mock tests, candidates can strengthen conceptual
          clarity, improve accuracy, and build time-management skills for the real exam.
          These free online TET Ganit Vigyan practice sets are an excellent resource for
          boosting preparation and moving closer to success in the teaching profession.
        </p>
      </div>
    </div>
  );
}
