"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import QuestionRenderer from "@/components/QuestionRenderer";

type VRQ = {
  id: string;
  set_no: number;
  question_text?: string | null;
  question_image?: string | null;
  options: string[];    // from jsonb
  correct_index: number;
  explain?: string | null;
};

const QUESTION_COUNT = 20; // per set - change if desired

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function VisualSetPage() {
  const { set } = useParams<{ set: string }>();
  const router = useRouter();
  const setNo = Number(set) || 1;

  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState<VRQ[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (!setNo || setNo < 1) router.replace("/exams");
  }, [setNo, router]);

  async function startNewAttempt() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("visual_reasoning_questions")
        .select("id, set_no, question_text, question_image, options, correct_index, explain")
        .eq("set_no", setNo)
        .limit(QUESTION_COUNT);
      if (error) throw error;

      const raw = (data as any[] | null) ?? [];
      if (raw.length === 0) {
        alert("No questions available for this set yet. Please add some in Supabase.");
        return;
      }

      const normalized: VRQ[] = raw.map((r: any) => ({
        id: r.id,
        set_no: r.set_no,
        question_text: r.question_text ?? null,
        question_image: r.question_image ?? null,
        options: r.options as string[],
        correct_index: r.correct_index,
        explain: r.explain ?? null,
      }));

      // shuffle question order but keep options as stored (important for image mapping)
      const qs = shuffle(normalized);
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

  const onSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (answers.some((a) => a === -1) && !confirm("Some questions are unanswered. Submit anyway?")) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!started) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2">Visual Reasoning – Set {setNo}</h1>
        <p className="text-gray-700 mb-6">
          This set contains up to {QUESTION_COUNT} questions. Click below to start.
        </p>
        <button onClick={startNewAttempt} disabled={loading} className="px-6 py-3 rounded-xl bg-indigo-600 text-white">
          {loading ? "Loading..." : "Start Test"}
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2">Result – Set {setNo}</h1>
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
                <p className="font-medium mb-3 flex gap-2">
                  <span className="text-gray-500">Q{qi + 1}.</span>
                  <div>
                    {q.question_text && <QuestionRenderer text={q.question_text} />}
                    {q.question_image && <img src={q.question_image} alt={`q-${qi}`} className="mt-2 max-w-full h-auto" />}
                  </div>
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
                        <OptionRenderer text={opt} />
                      </div>
                    );
                  })}
                </div>

                <p className="text-xs mt-2 flex gap-2">
                  <span className="font-semibold">Correct answer:</span>
                  <OptionRenderer text={q.options[correct]} />
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

  // Test UI
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-4 text-sm text-gray-600">Set {setNo} • Attempted: {attempted}/{questions.length}</div>

      <form onSubmit={onSubmit} className="space-y-5">
        {questions.map((q, qi) => (
          <fieldset key={q.id} className="rounded-2xl border bg-white p-5">
            <legend className="font-medium mb-3 flex gap-2 items-start">
              <span className="text-gray-500">Q{qi + 1}.</span>
              <div>
                {q.question_text && <QuestionRenderer text={q.question_text} />}
                {q.question_image && <img src={q.question_image} alt={`q-${qi}`} className="mt-2 max-w-full h-auto" />}
              </div>
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
                    <OptionRenderer text={opt} />
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="sticky bottom-4 mt-6 flex justify-end">
          <button type="submit" className="px-6 py-3 rounded-xl bg-emerald-600 text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// small OptionRenderer component (in same file or separate file and import)
function OptionRenderer({ text }: { text: string }) {
  if (!text) return null;
  const t = text.trim();
  if (/^(\/|https?:\/\/)/.test(t)) {
    return <img src={t} alt="option" style={{ maxWidth: 220, height: "auto" }} loading="lazy" />;
  }
  // otherwise use QuestionRenderer to allow markdown/math
  return <QuestionRenderer text={t} />;
}
