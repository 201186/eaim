import Link from "next/link";

const sets = Array.from({ length: 8 }, (_, i) => i + 1);

export default function GKLanding() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">General Knowledge – Practice Sets</h1>
      <p className="text-gray-600 mb-6">
        નીચેના 1 થી 8 સેટમાંથી કોઈપણ પસંદ કરો. દરેક સેટમાં 25 પ્રશ્નો હશે, અને દરેક પ્રયત્ને નવા ક્રમે પ્રશ્નો આવશે.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sets.map((n) => (
          <Link
            key={n}
            href={`/exams/general-knowledge/${n}`}
            className="rounded-2xl border bg-orange-100 hover:bg-orange-200 p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl font-bold text-orange-800">Set {n}</div>
            <div className="mt-1 text-sm text-gray-700">25 Questions</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-gray-700 leading-relaxed">
        <p>
          <strong>General Knowledge (GK)</strong> plays a vital role in almost every
          competitive exam, scholarship test, and interview process. It reflects how
          well a student is aware of the world, society, and current developments.
          GK covers a wide range of topics including History, Geography, Science,
          Sports, Current Affairs, and Important Personalities. Preparing for GK is
          not only helpful for exams but also for building confidence and improving
          overall awareness in day-to-day life.
        </p>
        <p className="mt-4">
          Our <strong>General Knowledge practice sets</strong> are designed with 25
          carefully chosen questions in each set. Every attempt presents the questions
          in a new sequence, keeping the experience fresh and engaging. These practice
          tests are ideal for students preparing for school-level quizzes, competitive
          exams, or government recruitment tests where GK is a scoring subject.
          Regular practice helps improve memory retention, speed, and accuracy.
          Attempting these free online GK mock tests will give you a clear advantage
          in understanding the exam pattern and enhancing your performance. With
          consistent practice, you can strengthen your GK foundation and increase your
          chances of success in any exam or interview.
        </p>
      </div>
    </div>
  );
}
