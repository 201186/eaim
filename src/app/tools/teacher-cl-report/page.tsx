"use client";

import { useMemo, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// helpers
function parseDate(val: string): Date | null {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}
function fmtDate(d: Date | null): string {
  if (!d) return "";
  return d.toLocaleDateString("gu-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
function diffDaysIncl(a: Date | null, b: Date | null): number {
  if (!a || !b) return 0;
  const one = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const two = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  const diff = Math.round((two - one) / (1000 * 60 * 60 * 24));
  return diff < 0 ? 0 : diff + 1;
}

export default function TeacherCLReport() {
  const [teacherName, setTeacherName] = useState<string>("");
  const [schoolName, setSchoolName] = useState<string>("");
  const [applicationDate, setApplicationDate] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [reason, setReason] = useState<string>("વ્યક્તિગત કામ");
  const [subject, setSubject] = useState<string>("CL રજા મંજૂર કરવા બાબત");
  const [totalCL, setTotalCL] = useState<string>("12");
  const [usedCL, setUsedCL] = useState<string>("0");
  const [place, setPlace] = useState<string>("");

  const reportRef = useRef<HTMLDivElement | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const dFrom = useMemo(() => parseDate(fromDate), [fromDate]);
  const dTo = useMemo(() => parseDate(toDate), [toDate]);
  const daysAsked = useMemo(() => diffDaysIncl(dFrom, dTo), [dFrom, dTo]);

  const balance = useMemo(() => {
    const total = parseInt(totalCL || "0", 10);
    const used = parseInt(usedCL || "0", 10);
    return total - used;
  }, [totalCL, usedCL]);

  // (kept normalize + inline functions from previous version if needed)
  function normalizeColorValue(val: string | null, fallback = "#000000"): string {
    if (!val) return fallback;
    if (/\boklch\(|\boklab\(|\bcolor\(/i.test(val)) {
      return fallback;
    }
    return val.replace(/\boklch\([^)]+\)/gi, fallback).replace(/\boklab\([^)]+\)/gi, fallback);
  }

  function inlineAllComputedStyles(source: HTMLElement, target: HTMLElement): void {
    try {
      const srcRootStyle = getComputedStyle(source);
      const rootCssText = (srcRootStyle as any).cssText as string | undefined;
      if ((target.style as any).cssText !== undefined && rootCssText) {
        (target.style as any).cssText = rootCssText.replace(/\boklch\([^)]+\)/gi, "#000000");
      } else {
        for (let i = 0; i < srcRootStyle.length; i++) {
          const prop = srcRootStyle.item(i);
          try {
            let val = srcRootStyle.getPropertyValue(prop);
            val = normalizeColorValue(val, "#000000");
            target.style.setProperty(prop, val, srcRootStyle.getPropertyPriority(prop));
          } catch (e) {}
        }
      }
    } catch (e) {}

    const srcNodes = Array.from(source.querySelectorAll<HTMLElement>("*"));
    const tgtNodes = Array.from(target.querySelectorAll<HTMLElement>("*"));

    for (let i = 0; i < srcNodes.length; i++) {
      const s = srcNodes[i];
      const t = tgtNodes[i];
      if (!t) continue;
      const cs = getComputedStyle(s);

      try {
        const cssText = (cs as any).cssText as string | undefined;
        if (cssText && (t.style as any).cssText !== undefined) {
          const sanitized = cssText.replace(/\boklch\([^)]+\)/gi, "#000000").replace(/\boklab\([^)]+\)/gi, "#000000");
          (t.style as any).cssText = sanitized;
          t.style.backgroundImage = "none";
          t.style.filter = "none";
          t.style.boxShadow = "none";
          continue;
        }
      } catch (e) {}

      for (let j = 0; j < cs.length; j++) {
        const prop = cs.item(j);
        try {
          let val = cs.getPropertyValue(prop);
          val = normalizeColorValue(val, prop.includes("background") || prop.includes("fill") ? "#ffffff" : "#000000");
          if (val) t.style.setProperty(prop, val, cs.getPropertyPriority(prop));
        } catch (err) {}
      }

      try {
        t.style.backgroundImage = "none";
        t.style.filter = "none";
        t.style.boxShadow = "none";
      } catch (e) {}

      try {
        const bc = cs.getPropertyValue("border-color");
        if (bc && /\boklch\(|\boklab\(/i.test(bc)) {
          t.style.borderColor = "#000000";
        }
      } catch (e) {}
    }
  }

  // --- A4 printing settings ---
  // A4 in mm = 210 x 297
  // px per mm at 96dpi = 96 / 25.4 = ~3.779527559
  const PX_PER_MM = 96 / 25.4;
  const A4_WIDTH_PX = Math.round(210 * PX_PER_MM); // ~794
  const A4_HEIGHT_PX = Math.round(297 * PX_PER_MM); // ~1123

  const downloadPDF = async (): Promise<void> => {
    if (!reportRef.current) return;
    setIsGenerating(true);

    try {
      const original = reportRef.current as HTMLElement;

      // Clone and inline styles (to preserve layout)
      const cloned = original.cloneNode(true) as HTMLElement;
      inlineAllComputedStyles(original, cloned);

      // Create hidden iframe
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      iframe.style.top = "0";
      iframe.style.border = "none";
      document.body.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) {
        document.body.removeChild(iframe);
        throw new Error("Iframe could not be created");
      }

      // Add Google Noto Sans Gujarati (optional) and force wrapper to A4 px size
      // If you prefer local font, replace the <link> with your local @font-face CSS
      const fontLink = `<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati&display=swap" rel="stylesheet">`;

      const wrapperStyles = `
        <style>
          ${fontLink}
          html, body { margin:0; padding:0; background:#ffffff; -webkit-print-color-adjust: exact; }
          .report-root-wrapper {
            width: ${A4_WIDTH_PX}px;
            min-height: ${A4_HEIGHT_PX}px;
            margin: 0 auto;
            box-sizing: border-box;
            padding: 28px; /* you can adjust page margins here (in px) */
            background: #ffffff;
            color: #000000;
            font-family: 'Noto Sans Gujarati', sans-serif;
          }
          * { background-image:none !important; box-shadow:none !important; filter:none !important; color:#000000 !important; }
          table { border-collapse: collapse !important; width: 100%; }
        </style>
      `;

      const contentHTML = `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            ${wrapperStyles}
          </head>
          <body>
            <div class="report-root-wrapper">
              ${cloned.innerHTML}
            </div>
          </body>
        </html>
      `;

      doc.open();
      doc.write(contentHTML);
      doc.close();

      // Give iframe time to load webfont & layout (increase if slow)
      await new Promise((res) => setTimeout(res, 500));

      // Capture the wrapper element (not whole body) for exact A4 size
      const wrapper = doc.querySelector(".report-root-wrapper") as HTMLElement;
      if (!wrapper) throw new Error("Wrapper not found in iframe");

      // Ensure iframe size matches wrapper
      const rect = wrapper.getBoundingClientRect();
      iframe.style.width = rect.width + "px";
      iframe.style.height = rect.height + "px";

      // Use html2canvas on the wrapper
      const canvas = await html2canvas(wrapper, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        // allowTaint: true,
      });

      // Convert canvas to image and insert into A4 pdf
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate image size in mm to fit A4 (full width)
      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210 mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // If height exceeds one page, add extra pages (simple slicing approach)
      if (pdfHeight > pdf.internal.pageSize.getHeight()) {
        // Convert canvas to multiple pages
        let remainingHeight = canvas.height;
        const pageHeightPx = (canvas.width * pdf.internal.pageSize.getHeight()) / pdfWidth; // px height per pdf page
        let position = 0;
        // create a temporary canvas to draw slices
        const tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = canvas.width;
        const tmpCtx = tmpCanvas.getContext("2d")!;
        while (remainingHeight > 0) {
          tmpCanvas.height = Math.min(pageHeightPx, remainingHeight);
          tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
          tmpCtx.drawImage(
            canvas,
            0,
            position,
            canvas.width,
            tmpCanvas.height,
            0,
            0,
            tmpCanvas.width,
            tmpCanvas.height
          );
          const imgPart = tmpCanvas.toDataURL("image/png");
          if (position > 0) pdf.addPage();
          const h_mm = (tmpCanvas.height * pdfWidth) / tmpCanvas.width;
          pdf.addImage(imgPart, "PNG", 0, 0, pdfWidth, h_mm);
          position += tmpCanvas.height;
          remainingHeight -= tmpCanvas.height;
        }
      }

      pdf.save("teacher-report.pdf");

      try {
        document.body.removeChild(iframe);
      } catch (e) {}
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("PDF બનાવવામાં ત્રુટિ આવી છે — Console ખોલીને error મોકલો તો હું વધુ મદદ કરીશ.");
    } finally {
      setIsGenerating(false);
    }
  };

  const labelCls = "text-sm font-medium text-gray-700";
  const inputCls =
    "mt-1 w-full rounded-lg border border-[#d1d5db] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]";

  return (
    <div className="space-y-10">
      {/* --- Form --- */}
      <section className="border rounded-2xl bg-[#ffffff] p-6 max-w-4xl mx-auto shadow-sm">
        <h1 className="text-xl font-bold mb-4">👩‍🏫 રિપોર્ટ જનરેટર</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>શિક્ષકનું નામ</label>
            <input
              className={inputCls}
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>શાળાનું નામ</label>
            <input
              className={inputCls}
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>અરજી તારીખ</label>
            <input
              type="date"
              className={inputCls}
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Leave From</label>
            <input
              type="date"
              className={inputCls}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Leave To</label>
            <input
              type="date"
              className={inputCls}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>કારણ</label>
            <select
              className={inputCls}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option>વ્યક્તિગત કામ</option>
              <option>આરોગ્ય કારણસર</option>
              <option>કુટુંબિય કાર્ય</option>
              <option>ઉત્સવ/વિશેષ</option>
              <option>શાસકીય ફરજ</option>
              <option>અન્ય</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>વિષય</label>
            <select
              className={inputCls}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option>CL રજા મંજૂર કરવા બાબત</option>
              <option>BLO ફરજ મંજૂર કરવા બાબત</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>કુલ CL</label>
            <input
              type="number"
              className={inputCls}
              value={totalCL}
              onChange={(e) => setTotalCL(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>લીઘેલી CL</label>
            <input
              type="number"
              className={inputCls}
              value={usedCL}
              onChange={(e) => setUsedCL(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>સ્થળ</label>
            <input
              className={inputCls}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={downloadPDF}
          disabled={isGenerating}
          className="mt-6 px-6 py-2 rounded-xl bg-[#2563eb] text-[#ffffff] font-medium disabled:opacity-60"
        >
          {isGenerating ? "PDF બની રહ્યું છે..." : "PDF ડાઉનલોડ કરો"}
        </button>
      </section>

      {/* --- Preview --- */}
      <section
        ref={reportRef}
        id="report-root"
        className="mx-auto max-w-3xl print:max-w-none"
        style={{ fontFamily: "'Noto Sans Gujarati', sans-serif" }}
      >
        <div className="border-4 border-[#9ca3af] rounded-2xl p-6 bg-[#ffffff] shadow">
          {/* Header */}
          <h1 className="text-2xl font-bold text-center mb-6">રજા ની અરજી</h1>

          {/* Right side info */}
          <div className="text-right mb-6">
            <div>{teacherName || "__________"}</div>
            <div>{schoolName || "__________ શાળા"}</div>
            <div>
              {applicationDate ? fmtDate(parseDate(applicationDate)) : "__________"}
            </div>
          </div>

          {/* Subject */}
          <div className="text-center mb-6 font-semibold">વિષય : {subject}</div>

          {/* Salutation */}
          <div className="mb-6">
            <p>પ્રતિ શ્રી,</p>
             <p>આચાર્યશ્રી,</p>
            <p>{schoolName || "__________ શાળા"}</p>
          </div>

          {/* Body */}
          <div className="mb-6 text-justify">
            ઉપરોક્ત વિષય સંદર્ભે જાણ કરવા માં આવે છે કે{" "}
            <b>{fmtDate(dFrom) || "____"}</b> થી <b>{fmtDate(dTo) || "____"}</b>{" "}
            દરમિયાન <b>{reason || "____"}</b> કારણે ફરજ પર હાજર રહી શકું એમ નથી.
            તો આપશ્રી કૃપા કરીને મારી <b>{daysAsked}</b> દિવસની રજા મંજુર કરવા વિનંતી
            છે.
          </div>

          {/* CL હિસાબ → Table */}
          <div className="mb-6">
            <table className="w-full border border-black text-center border-collapse">
              <thead>
                <tr className="font-semibold">
                  <th className="border border-black p-2">કુલ CL</th>
                  <th className="border border-black p-2">લીઘેલી CL</th>
                  <th className="border border-black p-2">બાકી CL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2">{totalCL}</td>
                  <td className="border border-black p-2">{usedCL}</td>
                  <td className="border border-black p-2">{balance}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Closing Section */}
          <div className="mt-8">
            <div className="grid grid-cols-2">
              {/* Left side */}
              <div className="space-y-1 text-left">
                <p>સ્થળ: {place || "__________"}</p>
                <p>
                  તારીખ: {applicationDate ? fmtDate(parseDate(applicationDate)) : "__________"}
                </p>
              </div>

              {/* Right side */}
              <div className="text-right space-y-12">
                <p>આપનો વિશ્વાસુ </p>
                <p>------------- </p>
                <p className="mt-12">આચાર્યની સહી: ____________________</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
