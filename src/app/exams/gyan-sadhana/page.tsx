import Link from "next/link";

const sets = Array.from({ length: 8 }, (_, i) => i + 1);

export default function GyanSadhanaLanding() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Gyan Sadhana – Practice Sets</h1>
      <p className="text-gray-600 mb-6">
        નીચેના 1 થી 8 સેટમાંથી કોઈપણ પસંદ કરીને 40 પ્રશ્નોની ટેસ્ટ આપો. દરેક પ્રયાસે નવા ક્રમે પ્રશ્નો આવશે.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sets.map((n) => (
          <Link
            key={n}
            href={`/exams/gyan-sadhana/${n}`}
            className="rounded-2xl border bg-yellow-100 hover:bg-yellow-200 p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl font-bold text-yellow-800">Set {n}</div>
            <div className="mt-1 text-sm text-gray-700">40 Questions</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-gray-700 leading-relaxed">
        <p>
          The <strong>Gyan Sadhana Scholarship Exam</strong> is an important initiative
          aimed at supporting bright and deserving students in their academic journey.
          This exam provides financial assistance to meritorious students, ensuring that
          they can continue their education without the burden of economic limitations.
          Preparing effectively for this exam not only helps students perform better but
          also strengthens their logical reasoning, critical thinking, and subject knowledge.
        </p>
        <p className="mt-4">
          Our <strong>Gyan Sadhana practice sets</strong> are designed with 40 carefully
          selected questions in each set, covering key topics from Mathematics, Science,
          Mental Ability, and General Knowledge. Every attempt generates questions in a
          new sequence, helping students stay alert and practice in a real exam-like
          environment. By solving these mock tests regularly, students learn time
          management, boost accuracy, and gain confidence before appearing in the actual
          exam. These free online practice sets are a reliable way to sharpen your skills
          and increase your chances of success in the Gyan Sadhana Scholarship Exam.
        </p>
      </div>
    </div>
  );
}
