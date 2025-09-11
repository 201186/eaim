"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Q = {
  id: string;
  question: string;
  options: string[];     // jsonb[] from DB
  correct_index: number; // 0-based
  explain?: string | null;
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptionsKeepAnswer(qs: Q[]) {
  return qs.map((q) => {
    const opts = shuffle(q.options);
    const correctText = q.options[q.correct_index];
    const newIndex = opts.indexOf(correctText);
    return { ...q, options: opts, correct_index: newIndex };
  });
}

const QUESTION_COUNT = 40;               // NMMS full test
const RPC_NAME = "get_nmms_questions";   // ⬅️ new per-exam RPC

export default function NMMSSetAllOnOnePage() {
  const { set } = useParams<{ set: string }>();
  const router = useRouter();
  const setNo = Number(set);

  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState<Q[]>([]);
  const [answers, setAnswers] = useState<number[]>([]); // -1 = unanswered

  useEffect(() => {
    if (!setNo || setNo < 1 || setNo > 8) router.replace("/exams/nmms");
  }, [setNo, router]);

  async function startNewAttempt() {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc(RPC_NAME, { p_limit: QUESTION_COUNT });
      if (error) throw error;

      const raw = (data as any[] | null) ?? [];
      if (raw.length === 0) {
        alert("No questions available for NMMS yet. Please add some in Supabase.");
        return;
      }

      // Force types: options is jsonb from DB
      const normalized: Q[] = raw.map((r: any) => ({
        id: r.id,
        question: r.question,
        options: r.options as string[],
        correct_index: r.correct_index,
        explain: r.explain ?? null,
      }));

      const qs = shuffleOptionsKeepAnswer(normalized);
      setQuestions(qs);
      setAnswers(Array(qs.length).fill(-1));
      setSubmitted(false);
      setStarted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      console.error(e);
      alert("Error loading questions.");
    } finally {
      setLoading(false);
    }
  }

  const attempted = useMemo(() => answers.filter((a) => a !== -1).length, [answers]);
  const score = useMemo(
    () => (submitted ? answers.reduce((s, a, i) => (a === questions[i].correct_index ? s + 1 : s), 0) : 0),
    [answers, submitted, questions]
  );

  const onPick = (qi: number, optIdx: number) => {
    if (submitted) return;
    const next = [...answers];
    next[qi] = optIdx;
    setAnswers(next);
  };

  const onSubmit = () => {
    if (answers.some((a) => a === -1) && !confirm("Some questions are unanswered. Submit anyway?")) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- Landing ----------
  if (!started) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2">NMMS – Set {setNo}</h1>
        <p className="text-gray-700 mb-6">
          આ સેટમાં {QUESTION_COUNT} પ્રશ્નો છે. દરેક પ્રયત્ને questions અને options નવા ક્રમે આવે છે. નીચેના બટનથી ટેસ્ટ શરૂ કરો.
        </p>
        <button
          onClick={startNewAttempt}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Start Test"}
        </button>
      </div>
    );
  }

  // ---------- Result ----------
  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2">NMMS – Set {setNo}</h1>
        <p className="text-gray-600 mb-6">
          Score: <span className="font-semibold">{score}</span> / {questions.length} • Accuracy:{" "}
          {Math.round((score / questions.length) * 100)}% • Attempted: {attempted}/{questions.length}
        </p>

        <div className="space-y-5">
          {questions.map((q, qi) => {
            const user = answers[qi];
            const correct = q.correct_index;
            return (
              <div key={q.id} className="rounded-2xl border bg-white p-5">
                <p className="font-medium mb-3">
                  <span className="text-gray-500 mr-2">Q{qi + 1}.</span>
                  {q.question}
                </p>
                <div className="grid gap-2">
                  {q.options.map((opt, oi) => {
                    const picked = oi === user;
                    const isCorrect = oi === correct;
                    const cls = isCorrect
                      ? "bg-green-50 border-green-500 text-green-800"
                      : picked && !isCorrect
                      ? "bg-red-50 border-red-500 text-red-800"
                      : "bg-gray-50 border-gray-200";
                    return (
                      <div key={oi} className={`flex items-center gap-3 border rounded-lg px-3 py-2 ${cls}`}>
                        <input type="radio" checked={picked} readOnly />
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs mt-2">
                  <span className="font-semibold">Correct answer:</span> {q.options[correct]}
                </p>
                {q.explain && <p className="text-xs text-gray-600 mt-1">Note: {q.explain}</p>}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={startNewAttempt} className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white">
            Take New Test (Shuffle)
          </button>
        </div>
      </div>
    );
  }

  // ---------- Test UI (ALL questions on one page) ----------
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-4 text-sm text-gray-600">
        Set {setNo} • Attempted: {attempted}/{questions.length}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-5"
      >
        {questions.map((q, qi) => (
          <fieldset key={q.id} className="rounded-2xl border bg-white p-5">
            <legend className="font-medium mb-3">
              <span className="text-gray-500 mr-2">Q{qi + 1}.</span>
              {q.question}
            </legend>

            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const name = `q-${qi}`;
                const checked = answers[qi] === oi;
                return (
                  <label
                    key={oi}
                    className={`flex items-center gap-3 border rounded-lg px-3 py-2 cursor-pointer ${
                      checked ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={name}
                      value={oi}
                      checked={checked}
                      onChange={() => onPick(qi, oi)}
                      className="accent-indigo-600"
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="sticky bottom-4 mt-6 flex justify-end">
          <button
            type="submit"
            disabled={answers.some((a) => a === -1)}
            className="px-6 py-3 rounded-xl bg-emerald-600 text-white disabled:opacity-60"
            title={answers.some((a) => a === -1) ? "Please answer all questions" : "Submit"}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
