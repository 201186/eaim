"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function TeacherCertificate() {
  const [teacherName, setTeacherName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState(
    "શિક્ષણ ક્ષેત્રે આપના ઉત્કૃષ્ટ યોગદાન બદલ આ પ્રમાણપત્ર આપવામાં આવે છે."
  );
  const certRef = useRef<HTMLDivElement>(null);

  // PDF Export
  const downloadPDF = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "a4"); // landscape A4
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("teacher-certificate.pdf");
  };

  return (
    <div className="space-y-10">
      {/* Form */}
      <section className="border rounded-2xl bg-white p-6 max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-4">👩‍🏫 શિક્ષક પ્રમાણપત્ર જનરેટર</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">શિક્ષકનુ નામ</label>
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="જેમ કે: રવિભાઈ પટેલ"
            />
          </div>
          <div>
            <label className="text-sm">શાળાનુ નામ</label>
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="જેમ કે: સરકારી પ્રાથમિક શાળા"
            />
          </div>
          <div>
            <label className="text-sm">તારીખ</label>
            <input
              type="date"
              className="mt-1 w-full rounded border px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm">પ્રસંશા સંદેશ</label>
            <textarea
              className="mt-1 w-full rounded border px-3 py-2"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={downloadPDF}
          className="mt-6 px-6 py-2 rounded-xl bg-blue-600 text-white font-medium"
        >
          PDF ડાઉનલોડ કરો
        </button>
      </section>

      {/* Certificate Preview */}
      <section
        ref={certRef}
        className="bg-gradient-to-br from-yellow-50 to-orange-100 border-4 border-yellow-500 rounded-2xl shadow-lg mx-auto p-12 text-center max-w-4xl"
        style={{ fontFamily: "'Noto Sans Gujarati', sans-serif" }}
      >
        <h1 className="text-3xl font-bold mb-6 text-yellow-800">પ્રમાણપત્ર</h1>
        <p className="text-lg mb-4">
          આ પ્રમાણપત્ર{" "}
          <span className="font-bold underline">
            {teacherName || "________"}
          </span>{" "}
          ને આપવામાં આવે છે.
        </p>
        <p className="text-lg mb-4">{message}</p>
        <p className="mt-6">
          <span className="font-semibold">{schoolName || "________"}</span>
        </p>
        <p className="mt-2">{date || "____/____/____"}</p>

        <div className="mt-10 flex justify-between px-12">
          <p>હસ્તાક્ષર (પ્રિન્સિપાલ)</p>
          <p>મુદ્રા</p>
        </div>
      </section>
    </div>
  );
}
