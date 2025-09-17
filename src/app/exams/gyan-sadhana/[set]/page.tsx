"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import QuestionRenderer from "@/components/QuestionRenderer"; // ensure this exists

type Q = {
  id: string;
  question: string;
  options: string[];       // array of option strings
  correct_index: number;   // 0-based
  explain?: string | null;
};

const QUESTION_COUNT = 40;                         // full test
const RPC_NAME = "get_gyan_sadhana_questions";     // change if your RPC has different name

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
    // if not found, try to keep same index (fallback)
    return { ...q, options: opts, correct_index: newIndex >= 0 ? newIndex : q.correct_index };
  });
}

export default function GyanSadhanaSetAllOnOnePage() {
  const { set } = useParams<{ set: string }>();
  const router = useRouter();
  const setNo = Number(set);

  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState<Q[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (!setNo || setNo < 1 || setNo > 8) router.replace("/exams/gyan-sadhana");
  }, [setNo, router]);

  // helper: ensure options is string[]
  function parseOptions(rawOptions: any): string[] {
    if (!rawOptions) return [];
    if (Array.isArray(rawOptions)) {
      return rawOptions.map((o) => (o === null || o === undefined ? "" : String(o)));
    }
    // sometimes DB may return JSON string
    if (typeof rawOptions === "string") {
      try {
        const parsed = JSON.parse(rawOptions);
        if (Array.isArray(parsed)) return parsed.map((o) => String(o));
      } catch (e) {
        // not JSON — fallback: split on newline or semicolon? but simplest: return as single option
        return [rawOptions];
      }
    }
    // fallback
    return [String(rawOptions)];
  }

  async function startNewAttempt() {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc(RPC_NAME, { p_limit: QUESTION_COUNT });
      if (error) throw error;

      const raw = (data as any[] | null) ?? [];
      if (raw.length === 0) {
        alert("No questions available for Gyan Sadhana yet. Please add some in Supabase.");
        return;
      }

      // normalize shape coming from RPC (jsonb -> string[])
      const normalized: Q[] = raw.map((r: any) => {
        // r.options might be text[] already, or JSON string, or a different field name.
        const opts = parseOptions(r.options ?? r.opts ?? r.option_list);

        // correct index may come as integer or string (a/b/c). handle both:
        let correctIndex = -1;
        if (typeof r.correct_index === "number") {
          correctIndex = r.correct_index;
        } else if (typeof r.correct_answer === "string") {
          // convert 'a'/'b'/'c'/'d' to 0..3
          const ca = r.correct_answer.trim().toLowerCase();
          if (["a", "b", "c", "d"].includes(ca)) {
            correctIndex = ["a", "b", "c", "d"].indexOf(ca);
          } else {
            // maybe correct_answer is numeric string: "2"
            const asNum = Number(r.correct_answer);
            if (!Number.isNaN(asNum)) correctIndex = asNum;
          }
        } else if (typeof r.correct_index === "string") {
          const asNum = Number(r.correct_index);
          if (!Number.isNaN(asNum)) correctIndex = asNum;
        }

        // ensure correctIndex in-range
        if (correctIndex < 0 || correctIndex >= opts.length) {
          // try to find by matching text (if raw returned `correct_text`)
          if (r.correct_text) {
            const idx = opts.indexOf(String(r.correct_text));
            if (idx >= 0) correctIndex = idx;
          }
          // fallback to 0
          if (correctIndex < 0) correctIndex = 0;
        }

        return {
          id: String(r.id),
          question: String(r.question ?? r.q ?? ""),
          options: opts,
          correct_index: correctIndex,
          explain: r.explain ?? null,
        };
      });

      const qs = shuffleOptionsKeepAnswer(normalized);
      setQuestions(qs);
      setAnswers(Array(qs.length).fill(-1));
      setSubmitted(false);
      setStarted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      // show helpful message in console and alert
      console.error("Failed to load questions RPC:", e);
      alert("Error loading questions. See console for details.");
    } finally {
      setLoading(false);
    }
  }

  const attempted = useMemo(() => answers.filter((a) => a !== -1).length, [answers]);
  const score = useMemo(
    () => (submitted ? answers.reduce((s, a, i) => (a === questions[i].correct_index ? s + 1 : s), 0) : 0),
    [answers, submitted, questions]
  );

  const onPick = (qi: number, oi: number) => {
    if (submitted) return;
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
  };
  const onSubmit = () => {
    if (answers.some((a) => a === -1) && !confirm("Some questions are unanswered. Submit anyway?")) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- Landing ----
  if (!started) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2">Gyan Sadhana – Set {setNo}</h1>
        <p className="text-gray-700 mb-6">
          આ ટેસ્ટ સેટમાં કુલ  {QUESTION_COUNT} પ્રશ્નો છે. દરેક પ્રયત્ને Questions અને Options ઓટોમેટીક આવે છે. નીચેના બટનથી ટેસ્ટ શરૂ કરો.
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

  // ---- Result ----
  if (submitted) {
    const scorePct = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2">Result – Set {setNo}</h1>
        <p className="text-gray-600 mb-6">
          Score: <b>{score}</b> / {questions.length} • Accuracy: {scorePct}% • Attempted: {attempted}/{questions.length}
        </p>

        <div className="space-y-5">
          {questions.map((q, qi) => {
            const user = answers[qi];
            const correct = q.correct_index;
            return (
              <div key={q.id} className="rounded-2xl border bg-white p-5">
                <p className="font-medium mb-3 flex gap-2">
                  <span className="text-gray-500">Q{qi + 1}.</span>
                  <QuestionRenderer text={q.question} />
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
                        <QuestionRenderer text={opt} />
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs mt-2 flex gap-2">
                  <b>Correct answer:</b>
                  <QuestionRenderer text={q.options[correct]} />
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

  // ---- Test UI ----
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-4 text-sm text-gray-600">
        Set {setNo} • Attempted: {attempted}/{questions.length}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-5">
        {questions.map((q, qi) => (
          <fieldset key={q.id} className="rounded-2xl border bg-white p-5">
            <legend className="font-medium mb-3 flex gap-2">
              <span className="text-gray-500">Q{qi + 1}.</span>
              <QuestionRenderer text={q.question} />
            </legend>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
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
                      name={`q-${qi}`}
                      value={oi}
                      checked={checked}
                      onChange={() => onPick(qi, oi)}
                      className="accent-indigo-600"
                    />
                    <QuestionRenderer text={opt} />
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
