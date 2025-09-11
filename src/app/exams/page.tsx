import Link from "next/link";

const exams = [
  { id: "nmms", title: "NMMS Exam", desc: "Practice sets for NMMS", questions: 40, color: "bg-blue-100 hover:bg-blue-200 text-blue-800" },
  { id: "gyan-sadhana", title: "Gyan Sadhana Exam", desc: "Scholarship practice", questions: 40, color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800" },
  { id: "general-knowledge", title: "General Knowledge (GK)", desc: "GK mixed practice", questions: 25, color: "bg-orange-100 hover:bg-orange-200 text-orange-800" },
  { id: "tet-social", title: "TET – Samajik Vigyan", desc: "Social Science practice sets", questions: 40, color: "bg-green-100 hover:bg-green-200 text-green-800" },
  { id: "tet-bhasha", title: "TET – Bhasha", desc: "Language practice sets", questions: 40, color: "bg-purple-100 hover:bg-purple-200 text-purple-800" }
];

export default function ExamsHome() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Online Exams</h1>
      <p className="text-gray-600 mb-6">Choose an exam to start practicing.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {exams.map((e) => (
          <Link
            key={e.id}
            href={`/exams/${e.id}`}
            className={`block border rounded-2xl p-5 shadow-sm hover:shadow-md transition ${e.color}`}
          >
            <h3 className="font-semibold">{e.title}</h3>
            <p className="text-sm mt-1">{e.desc}</p>
            <p className="text-xs mt-2">{e.questions} Questions</p>
            <span className="text-sm mt-3 inline-block font-medium">Start →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
