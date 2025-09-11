"use client";

import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PX_PER_MM = 96 / 25.4;
const A4_WIDTH_PX = Math.round(210 * PX_PER_MM);
const A4_HEIGHT_PX = Math.round(297 * PX_PER_MM);

function generateGujaratiReport(params: {
  name: string;
  school: string;
  eventName: string;
  date: string;
  days: number;
}): string {
  const { name, school, eventName, date, days } = params;
  const key = (eventName || "").toLowerCase().trim();

  if (key.includes("sixandin") || key.includes("શિક્ષણ") || key.includes("teachers")) {
    return `શિક્ષણ આપણું જીવંત મોર્ચું છે અને શિક્ષકો તેમાનું અજોડ યોગદાન આપે છે. અમારી શાળા ${date} ના રોજ ${eventName} ખૂબ જ ઉલ્લાસપૂર્વક ઉજવાઈ હતી. આયોજનનો મુખ્ય ઉદ્દેશ વિદ્યાર્થીઓમાં શિક્ષણના મૂલ્યો, શિસ્ત અને નિષ્ઠા પ્રોત્સાહિત કરવાનું હતું. કાર્યક્રમની શરૂઆત પ્રાર્થનાથી થઇ અને ત્યારબાદ શિક્ષકોને સન્માન આપવામાં આવ્યું. વિવિધ કક્ષાએ નાટક, કાવ્યપઠ, ભાષણ સ્પર્ધા અને સંગીત દ્વારા વિદ્યાર્થીઓએ તેમની પ્રતિભા રજૂ કરી. ${name ? `${name}એ` : "વિદ્યાર્થીોએ"} ઉત્સાહપૂર્વક ભાગ લઈને કાર્યક્રમને સફળ બનાવવામાં સહયોગ આપ્યો. શિક્ષકમંડળ અને પ્રિન્સિપાલે અભિનંદન પાઠવતા પ્રયત્નો અને મહેનતની પ્રશંસા કરી. આ ઉજવણી દ્વારા શાળા સમુદાયમાં ઔદાર્ય અને જ્ઞાનની ભાવના વધતી રહી છે.`;
  }

  if (key.includes("વિજ્ઞાન") || key.includes("science")) {
    return `વિજ્ઞાન દિવસ વિદ્યાર્થીમાં કુતુહલ અને શોધખોળ પ્રોત્સાહિત કરે છે. ${school || "અમારી શાળા"} માં ${date} થી શરૂ થયેલ ${eventName} દરમ્યાન વૈજ્ઞાનિક પ્રદર્શન, પ્રોજેક્ટ-શો અને પ્રયોગશાળાના કાર્યક્રમો આયોજિત થયા. વિદ્યાર્થીઓએ પોતાના પ્રયોગ અને પ્રોજેક્ટ રજૂ કરી જ્ઞાનપ્રસિદ્ધિ બતાવી. ${name ? `${name}એ` : "એક વિદ્યાર્થીએ"} પણ પ્રવૃત્તિમાં ભાગ લઈને અનુભવ અને કુશળતા દર્શાવી. શિક્ષકમંડળે માર્ગદર્શન આપ્યું અને શાળાનું વૈજ્ઞાનિક મૂલ્ય વધ્યું.`;
  }

  if (key.includes("સ્વચ્છ") || key.includes("swachh") || key.includes("swachata")) {
    return `સ્વચ્છતા દિવસ શાળામાં અને સમુદાયમાં સફાઈ તથા પર્યાવરણ જાગૃતિ લાવવા માટે મહત્વપૂર્ણ છે. ${school || "આપણી શાળા"} માં ${date} ના રોજ ${eventName} દરમિયાન વિદ્યાર્થીઓ અને શિક્ષકો દ્વારા મીલીને સફાઈ અભિયાન ચલાવવામાં આવ્યું અને પ્લાસ્ટિક ઘટાડવા પર કાર્યશાળા આયોજિત થઈ. ${name ? `${name}એ` : "વિદ્યાર્થીઓએ"} ઉત્સાહથી ભાગ લઈ પ્રેરણા આપી. આવી પ્રવૃત્તિઓથી પર્યાવરણ સંરક્ષણમાં મદદ મળે છે.`;
  }

  if (key.includes("guru") || key.includes("પંચમી") || key.includes("guru panchami") || key.includes("ગુરૂ")) {
    return `ગુરુ પંચમી ગુરુ-શિષ્ય સંબંધની પરંપરા ઉજવવાનું મહત્ત્વપૂર્ણ અવસર છે. ${school || "આપણી શાળા"} માં ${date} ના રોજ ${eventName} ની ઉજવણીમાં શિક્ષકોને સન્માન આપવામાં આવ્યું. વિદ્યાર્થીઓ દ્વારા કાવ્ય, ભાષણ અને ગીત દ્વારા ગુરુની મહત્તા વ્યક્ત કરવામાં આવી. ${name ? `${name}એ` : "વિદ્યાર્થીએ"} પ્રભાવશાળી ભાગ લીધો અને આ પ્રસંગ સફળ બન્યો.`;
  }

  if (key.includes("ગણતંત્ર") || key.includes("republic") || key.includes("સ્વતંત્રતા") || key.includes("independence")) {
    return `દેશભક્તિ અને એકતાનો પ્રદર્શન કરતા ${eventName} ની ઉજવણી ${school || "અમારી શાળા"} માં ${date} ના રોજ યોજાઇ. રાષ્ટ્રીય ધ્વજ ફરાવા, ભાષણો અને સાંસ્કૃતિક પ્રદર્શનોથી કાર્યક્રમ ભવ્ય બન્યો. ${name ? `${name}એ` : "વિદ્યાર્થીએ"} ભાગ લઈને દેશપ્રેમની ભાવના વ્યક્ત કરી.`;
  }

  if (key.includes("sports") || key.includes("sports day") || key.includes("spors")) {
    return `સ્પોર્ટ્સ ડે દરમ્યાન વિવિધ રમતગમત સ્પર્ધાઓ યોજાઇ, જેના દ્વારા વિદ્યાર્થીઓની ફિટનેસ અને ટીમવર્ક પર ભાર મુકાયો. ${school || "આપણી શાળા"} માં ${date} ના રોજ ${eventName} ઉત્સાહભર્યો રહ્યો. ${name ? `${name}એ` : "વિદ્યાર્થીએ"} ભાગ લઈને ટીમ સ્પિરિટ અને પ્રતિભાનું પ્રદર્શન કર્યું.`;
  }

  if (key.includes("annual") || key.includes("annual day") || key.includes("વર્ષિક")) {
    return `વાર્ષિક દિવસે શાળાના વર્ષભરના સિદ્ધિઓનું સમાપન થાય છે. ${school || "આપણી શાળા"} માં ${date} ના રોજ ${eventName} ભવ્ય રીતે આયોજિત થયું અને વિદ્યાર્થીઓએ નૃત્ય, નાટક અને સંગીત દ્વારા પોતાની પ્રતિભા દર્શાવી. ${name ? `${name}એ` : "વિદ્યાર્થીએ"} ખાસ યોગદાન આપ્યું.`;
  }

  // Generic adaptive fallback
  const speaker = name ? `${name}` : "વિદ્યાર્થીઓ અને ભાગ લેનારા";
  const schoolLabel = school || "અમારી શાળા";
  const dayLabel = days === 1 ? "દિવસ" : "દિવસો";

  const sentences: string[] = [];
  sentences.push(`${schoolLabel} ખાતે ${date}થી શરૂ થયેલ ${eventName} ની ઉજવણી ${days} ${dayLabel} સુધી ગોઠવણ અને ઉત્સાહ સાથે યોજાઇ.`);
  sentences.push(`આ કાર્યક્રમનો ઉદ્દેશ વિદ્યાર્થીઓમાં સક્રિય ભાગીદારી, શૈક્ષણિક પ્રેરણા અને સાંસ્કૃતિક જાગૃતિ લાવવાનો હતો.`);
  sentences.push(`${speaker}એ કાર્યક્રમમાં ઉત્સાહથી ભાગ લઈને તેને સફળ બનાવવામાં સહયોગ આપ્યો.`);
  sentences.push(`પ્રદર્શન, વર્કશોપ અને સ્પર્ધાઓ દ્વારા વિદ્યાર્થીઓને વ્યવહારિક અનુભવ અને આદર મળ્યો.`);
  sentences.push(`શાળા પ્રિન્સિપાલ અને શિક્ષકમંડળે માર્ગદર્શન આપ્યું અને તમામનો આભાર મનાવવામાં આવ્યો.`);
  sentences.push(`આ પ્રકારની પ્રવૃત્તિઓથી વિદ્યાર્થીઓમાં જવાબદારી, ટીમવર્ક અને કુશળતાનું વિકાસ થાય છે.`);

  let paragraph = sentences.join(" ");
  const wordCount = paragraph.trim().split(/\s+/).length;
  if (wordCount < 180) {
    paragraph += " " + `આ અનુભવ અને પ્રસ્તુતિઓ દ્વારા ભવિષ્યમાં વધુ સ્તરે તાલીમ અને કાર્યક્રમ આયોજિત કરવાની પ્રેરણા મલેશે.`;
  }
  const finalWordCount = paragraph.trim().split(/\s+/).length;
  if (finalWordCount < 200) {
    paragraph += " " + `આ અહેવાલ કાર્યક્રમને દસ્તાવેજિકૃત કરી શાળા પ્રબંધન અને ભાગ લેનારાઓ માટે આધારભૂત જાણકારી તરીકે કામ કરશે.`;
  }

  return paragraph;
}

export default function AhevalPage() {
  const [name, setName] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [eventName, setEventName] = useState<string>("Sixandin");
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [days, setDays] = useState<number>(1);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);

  const [generatedReport, setGeneratedReport] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiMode, setAiMode] = useState<boolean>(true); // use AI API by default
  const previewRef = useRef<HTMLDivElement | null>(null);

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  async function handleGenerateReport() {
    setGeneratedReport("");
    setIsGenerating(true);

    const payload = { name, school, eventName, date, days, length: "medium" };

    if (!aiMode) {
      const rpt = generateGujaratiReport({ name, school, eventName, date, days });
      setGeneratedReport(rpt);
      setIsGenerating(false);
      return;
    }

    try {
      const res = await fetch("/api/generate-aheval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data?.report) {
        console.warn("AI API error, falling back to local generator:", data);
        const rpt = generateGujaratiReport({ name, school, eventName, date, days });
        setGeneratedReport(rpt);
      } else {
        setGeneratedReport(String(data.report).trim());
      }
    } catch (err) {
      console.error("Error calling AI API, fallback to local generator:", err);
      const rpt = generateGujaratiReport({ name, school, eventName, date, days });
      setGeneratedReport(rpt);
    } finally {
      setIsGenerating(false);
    }
  }

  const downloadPDF = async () => {
    if (!previewRef.current) {
      alert("Preview materialen મળી નથી.");
      return;
    }
    setIsGenerating(true);
    try {
      const clone = previewRef.current.cloneNode(true) as HTMLElement;

      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      iframe.style.top = "0";
      iframe.style.border = "none";
      document.body.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) throw new Error("Iframe document તૈયાર કરી શકાતો નથી.");

      const styles = `
        <style>
          @media print { @page { size: A4; margin: 0; } }
          html,body { margin:0; padding:0; background:#ffffff; font-family: 'Noto Sans Gujarati', sans-serif; }
          .wrap { width: ${A4_WIDTH_PX}px; min-height: ${A4_HEIGHT_PX}px; box-sizing: border-box; padding: 28px; background:#ffffff; color:#000000; }
          .card { width:100%; height:100%; border:6px solid #000; border-radius:12px; padding: 18px; box-sizing:border-box; position:relative; }
          img { max-width:100%; height:auto; }
        </style>
      `;

      doc.open();
      doc.write(`<!doctype html><html><head><meta charset="utf-8" />${styles}</head><body><div class="wrap">${clone.innerHTML}</div></body></html>`);
      doc.close();

      await new Promise((r) => setTimeout(r, 600));

      const wrapper = doc.querySelector(".wrap") as HTMLElement;
      if (!wrapper) throw new Error("Wrapped element not found.");

      const rect = wrapper.getBoundingClientRect();
      iframe.style.width = rect.width + "px";
      iframe.style.height = rect.height + "px";

      const canvas = await html2canvas(wrapper, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (pdfHeight <= pdf.internal.pageSize.getHeight()) {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      } else {
        let position = 0;
        const pageHeightPx = Math.round((canvas.width * pdf.internal.pageSize.getHeight()) / pdfWidth);
        const tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = canvas.width;
        const ctx = tmpCanvas.getContext("2d")!;
        let remaining = canvas.height;
        while (remaining > 0) {
          const sliceHeight = Math.min(pageHeightPx, remaining);
          tmpCanvas.height = sliceHeight;
          ctx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
          ctx.drawImage(canvas, 0, position, canvas.width, sliceHeight, 0, 0, tmpCanvas.width, tmpCanvas.height);
          const imgPart = tmpCanvas.toDataURL("image/png");
          if (position > 0) pdf.addPage();
          const h_mm = (tmpCanvas.height * pdfWidth) / tmpCanvas.width;
          pdf.addImage(imgPart, "PNG", 0, 0, pdfWidth, h_mm);
          position += sliceHeight;
          remaining -= sliceHeight;
        }
      }

      pdf.save(`aheval-${(name || "report")}.pdf`);

      try {
        document.body.removeChild(iframe);
      } catch {
        // ignore
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("PDF generation error:", err);
      alert("PDF બનાવવામાં ભૂલ — Console તપાસો.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">અહેવाल જનરેટર (Aheval)</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <label className="block mb-2 font-medium">ઇવેન્ટ પસંદ કરો</label>
          <select
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          >
            <option>Sixandin</option>
            <option>Science Day</option>
            <option>Swachata Divas</option>
            <option>Sports Day</option>
            <option>Annual Day</option>
            <option>Guru Panchami</option>
            <option>ગણતંત્ર દિવસ</option>
            <option>અન્ય</option>
          </select>

          <label className="block mb-2 font-medium">AI ઉપયોગ કરવો?</label>
          <div className="flex items-center gap-3 mb-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={aiMode} onChange={(e) => setAiMode(e.target.checked)} />
              <span className="text-sm">AI થી અહેવાલ બનાવો (server API જરૂરી)</span>
            </label>
          </div>

          <label className="block mb-2 font-medium">અહેવાલ માટેનું નામ</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            placeholder="નામ લખો"
          />

          <label className="block mb-2 font-medium">શાળાનું નામ</label>
          <input
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            placeholder="શાળાનું નામ"
          />

          <label className="block mb-2 font-medium">તારીખ</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="block mb-2 font-medium">ઉજવણી કેટલા દિવસની છે?</label>
          <input
            type="number"
            min={1}
            value={days}
            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value || "1", 10)))}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="block mb-2 font-medium">ફોટો અપલોડ</label>
          <input type="file" accept="image/*" onChange={onPhotoChange} className="w-full mb-3" />
          {photoDataUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoDataUrl} alt="photo" className="w-32 h-40 object-cover border" />
          )}

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {isGenerating ? "Generating..." : "અહેવાલ બનાવો"}
            </button>

            <button
              onClick={() => {
                setGeneratedReport("");
                setName("");
                setSchool("");
                setPhotoDataUrl(null);
              }}
              className="px-4 py-2 border rounded"
            >
              રીસેટ
            </button>
          </div>
        </div>

        <div className="p-4 border rounded flex flex-col items-center">
          <div
            ref={previewRef}
            style={{
              width: A4_WIDTH_PX,
              minHeight: A4_HEIGHT_PX,
              transform: "scale(0.48)",
              transformOrigin: "top left",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "100%", minHeight: "100%", padding: 28, background: "#fff", boxSizing: "border-box" }}>
              <div style={{ border: "6px solid #000", borderRadius: 12, padding: 20, position: "relative", minHeight: 800 }}>
                <h2 style={{ textAlign: "center", fontSize: 28, margin: 0 }}>{eventName}</h2>
                <div style={{ textAlign: "center", marginTop: 6, fontSize: 16 }}>{school || "______"}</div>

                <div style={{ position: "absolute", right: 24, top: 90, width: 120, height: 150, border: "3px solid #000", overflow: "hidden", background: "#fff" }}>
                  {photoDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photoDataUrl} alt="photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ padding: 8, textAlign: "center", color: "#666" }}>ફોટો</div>
                  )}
                </div>

                <div style={{ marginTop: 60, textAlign: "center", padding: "0 40px", lineHeight: 1.8 }}>
                  <p style={{ margin: 0, fontSize: 16 }}>આથી પ્રમાણિત થાય છે કે</p>
                  <h3 style={{ margin: "8px 0", fontSize: 22 }}>{name || "____________________"}</h3>

                  <div style={{ marginTop: 12, textAlign: "justify", fontSize: 14 }}>
                    {generatedReport ? (
                      <div style={{ whiteSpace: "pre-wrap" }}>{generatedReport}</div>
                    ) : (
                      <div style={{ color: "#666" }}>અહેવાલ (અહીં જનરેટ થયેલ ટેક્સ્ટ દેખાશે) — "અહેવાલ બનાવો" બટન દબાવો.</div>
                    )}
                  </div>
                </div>

                <div style={{ position: "absolute", left: 36, bottom: 48 }}>તારીખ: {date}</div>
                <div style={{ position: "absolute", right: 36, bottom: 48 }}>સહી: ____________________</div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-600">Preview (scaled). PDF માટે "Download PDF" દબાવો.</p>

          <button
            onClick={downloadPDF}
            disabled={isGenerating}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
          >
            {isGenerating ? "PDF બની રહ્યું છે..." : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
