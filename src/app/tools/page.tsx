import Link from "next/link";

export default function ToolsHome() {
  const items = [
    {
      href: "/tools/percentage-calculator",
      title: "Percentage Calculator",
      desc: "Find % of marks or increase/decrease",
      color: "bg-blue-100 hover:bg-blue-200 text-blue-800",
    },
    {
      href: "/tools/teacher-certificate",
      title: "Teacher Certificate Generator (Gujarati)",
      desc: "શિક્ષક માટે ડાયનેમિક પ્રમાણપત્ર બનાવો અને PDF ડાઉનલોડ કરો",
      color: "bg-green-100 hover:bg-green-200 text-green-800",
    },
    {
      href: "/tools/teacher-cl-report",
      title: "Teacher CL Report Generator (Gujarati)",
      desc: "શિક્ષકની CL (Casual Leave) રિપોર્ટ બનાવો — કુલ, ઉપયોગ, બેલેન્સ સાથે PDF",
      color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
    },
    {
      href: "/tools/gujarati-suvichar",
      title: "Gujarati Suvichar Generator",
      desc: "ગુજરાતી સુવિચાર રેન્ડમ જનરેટ કરો, Copy / Share / Download",
      color: "bg-purple-100 hover:bg-purple-200 text-purple-800",
    },
    {
      href: "/tools/school-letter",
      title: "School Letter Generator",
      desc: "સ્કૂલ માટે અરજીઓ અને લેટર પાસા કરો, Print / PDF સેવ કરો",
      color: "bg-orange-100 hover:bg-orange-200 text-orange-800",
    },
    {
      href: "/tools/aheval",
      title: "Aheval Generator (અહેવાલ)",
      desc: "ફોટો અપલોડ કરો, ઇવેન્ટ અને નામ દાખલ કરો અને અહેવાલ PDF તરીકે ડાઉનલોડ કરો",
      color: "bg-pink-100 hover:bg-pink-200 text-pink-800",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Study Tools</h1>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it) => (
          <li
            key={it.href}
            className={`border rounded-2xl p-5 shadow-sm hover:shadow-md transition ${it.color}`}
          >
            <h3 className="font-semibold">{it.title}</h3>
            <p className="text-sm mt-1">{it.desc}</p>
            <Link
              className="text-sm mt-3 inline-block font-medium"
              href={it.href}
            >
              Open →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
