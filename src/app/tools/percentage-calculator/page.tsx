"use client";
import { useState } from "react";

export default function PercentageCalculator() {
  const [obt, setObt] = useState("");
  const [total, setTotal] = useState("");
  const percent = (() => {
    const o = parseFloat(obt), t = parseFloat(total);
    if (!t || isNaN(o) || isNaN(t)) return "";
    return ((o / t) * 100).toFixed(2);
  })();

  return (
    <div className="border rounded-2xl bg-white p-6 max-w-2xl">
      <h1 className="text-xl font-semibold mb-4">Percentage Calculator</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm">Obtained Marks</label>
          <input className="mt-1 w-full rounded border px-3 py-2" value={obt} onChange={e=>setObt(e.target.value)} placeholder="457" />
        </div>
        <div>
          <label className="text-sm">Total Marks</label>
          <input className="mt-1 w-full rounded border px-3 py-2" value={total} onChange={e=>setTotal(e.target.value)} placeholder="600" />
        </div>
        <div>
          <label className="text-sm">Result (%)</label>
          <input className="mt-1 w-full rounded border px-3 py-2 bg-gray-50" value={percent} readOnly />
        </div>
      </div>
    </div>
  );
}
