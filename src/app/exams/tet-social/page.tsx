import Link from "next/link";

const sets = Array.from({ length: 8 }, (_, i) => i + 1);

export default function TETSocialLanding() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">TET – Samajik Vigyan (Social Science)</h1>
      <p className="text-gray-600 mb-6">
        દરેક ટેસ્ટ સેટ માં જુદા જુદા પ્રશ્નો આવશે .
      સામાજિક વિજ્ઞાન ના અભ્યાસક્રમ મુજબ  દરેક પ્રયત્ન માં જુદા જુદા પ્રશ્ન આવશે .
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sets.map((n) => (
          <Link
            key={n}
            href={`/exams/tet-social/${n}`}
            className="rounded-2xl border bg-yellow-100 hover:bg-yellow-200 p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl font-bold text-yellow-800">Set {n}</div>
            <div className="mt-1 text-sm text-gray-700">40 Questions</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-gray-700 leading-relaxed">
        <p>
          The <strong>TET Samajik Vigyan (Social Science)</strong> section is one of the
          most important parts of the Teacher Eligibility Test for candidates applying
          to teach Social Studies. This portion evaluates a candidate’s knowledge of
          History, Geography, Civics, and Economics, along with pedagogy-related concepts.
          Scoring well in this section demonstrates strong subject command and the
          ability to teach social sciences effectively to students in classrooms.
        </p>
        <p className="mt-4">
          Our <strong>TET Social Science practice sets</strong> provide 40 questions in
          each test, carefully designed to match the real exam pattern. These sets cover
          a balanced mix of factual knowledge, analytical reasoning, and teaching
          methodology questions. Each attempt reshuffles the order of questions, giving
          you a new test experience every time. Practicing regularly helps candidates
          improve accuracy, strengthen time management skills, and build confidence for
          the actual exam. These free online mock tests are an excellent way to prepare
          for the Social Science section of TET, ensuring you are exam-ready and closer
          to achieving your goal of becoming a teacher.
        </p>
      </div>
    </div>
  );
}
