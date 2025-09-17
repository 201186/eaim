// src/app/exams/mental/[set]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import QuestionRenderer from "@/components/QuestionRenderer";

type MQ = {
  id: string;
  question_text: string;
  image_url?: string | null;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string; // 'a'|'b'|'c'|'d'
  explain?: string | null;
};

const QUESTION_COUNT = 20;

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MentalSetPage() {
  const { set } = useParams<{ set: string }>();
  const router = useRouter();
  const setNo = Number(set);

  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState<MQ[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (!setNo || setNo < 1) {
      // optional redirect
    }
  }, [setNo, router]);

  async function startNewAttempt() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("mental_ability_questions")
        .select("id, question_text, image_url, option_a, option_b, option_c, option_d, correct_answer, explain")
        .limit(QUESTION_COUNT);
      if (error) throw error;
      const raw = (data as MQ[] | null) ?? [];
      if (raw.length === 0) {
        alert("No questions available. Add questions in Supabase.");
        return;
      }
      setQuestions(shuffle(raw));
      setAnswers(Array(raw.length).fill(-1));
      setStarted(true);
      setSubmitted(false);
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
    () =>
      submitted
        ? answers.reduce((s, a, i) => {
            if (a === -1) return s;
            const correctChar = questions[i]?.correct_answer?.toLowerCase() ?? "a";
            const idx = ["a", "b", "c", "d"].indexOf(correctChar);
            return a === idx ? s + 1 : s;
          }, 0)
        : 0,
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
    if (answers.some((a) => a === -1) && !confirm("Some unanswered. Submit anyway?")) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!started) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2">Mental Ability – Set {setNo ?? ""}</h1>
        <p className="text-gray-700 mb-6">આ સેટમાં {QUESTION_COUNT} પ્રશ્નો છે. શરૂ કરવા ઉપર ક્લિક કરો.</p>
        <button onClick={startNewAttempt} disabled={loading} className="px-6 py-3 rounded-xl bg-indigo-600 text-white">
          {loading ? "Loading..." : "Start Test"}
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2">Result – Set {setNo ?? ""}</h1>
        <p className="text-gray-600 mb-6">Score: <strong>{score}</strong> / {questions.length} • Attempted: {attempted}/{questions.length}</p>

        <div className="space-y-4">
          {questions.map((q, qi) => {
            const user = answers[qi];
            const correctChar = q.correct_answer.toLowerCase();
            const correctIndex = ["a", "b", "c", "d"].indexOf(correctChar);
            return (
              <div key={q.id} className="rounded-xl border bg-white p-4">
                <div className="mb-2 flex gap-2">
                  <span className="text-gray-500">Q{qi+1}.</span>
                  <div>
                    <QuestionRenderer text={q.question_text} />
                    {q.image_url && <img src={q.image_url} alt={`q-${qi}`} className="mt-2 max-w-full h-auto" />}
                  </div>
                </div>

                <div className="grid gap-2">
                  {["option_a","option_b","option_c","option_d"].map((k, oi) => {
                    const opt = (q as any)[k] as string;
                    const picked = oi === user;
                    const isCorrect = oi === correctIndex;
                    const cls = isCorrect ? "bg-green-50 border-green-400" : picked && !isCorrect ? "bg-red-50 border-red-400" : "bg-gray-50 border-gray-200";
                    return (
                      <div key={oi} className={`flex items-center gap-3 border rounded-md px-3 py-2 ${cls}`}>
                        <input type="radio" checked={picked} readOnly />
                        <QuestionRenderer text={opt} />
                      </div>
                    );
                  })}
                </div>

                <div className="text-xs mt-2">
                  <strong>Correct:</strong> <QuestionRenderer text={(q as any)[["option_a","option_b","option_c","option_d"][correctIndex]]} />
                  {q.explain && <div className="text-gray-600 mt-1">Note: {q.explain}</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <button onClick={startNewAttempt} className="px-5 py-2 rounded-lg bg-emerald-600 text-white">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-3 text-sm text-gray-600">Set {setNo ?? ""} • Attempted: {attempted}/{questions.length}</div>

      <form onSubmit={onSubmit} className="space-y-5">
        {questions.map((q, qi) => (
          <fieldset key={q.id} className="rounded-xl border bg-white p-4">
            <legend className="font-medium mb-2 flex gap-2">
              <span className="text-gray-500">Q{qi+1}.</span>
              <div>
                <QuestionRenderer text={q.question_text} />
                {q.image_url && <img src={q.image_url} alt={`q-${qi}`} className="mt-2 max-w-full h-auto" />}
              </div>
            </legend>

            <div className="grid gap-2">
              {["option_a","option_b","option_c","option_d"].map((k, oi) => {
                const name = `q-${qi}`;
                const opt = (q as any)[k] as string;
                const checked = answers[qi] === oi;
                return (
                  <label key={oi} className={`flex items-center gap-3 border rounded-md px-3 py-2 cursor-pointer ${checked ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-gray-50"}`}>
                    <input type="radio" name={name} value={oi} checked={checked} onChange={() => onPick(qi, oi)} className="accent-indigo-600"/>
                    <QuestionRenderer text={opt} />
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="flex justify-end sticky bottom-4">
          <button type="submit" className="px-6 py-3 rounded-xl bg-emerald-600 text-white">Submit</button>
        </div>
      </form>
    </div>
  );
}
