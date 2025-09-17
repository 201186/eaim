// lib/questionService.ts
import { supabase } from "./supabaseClient";

type QuestionInput = {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: "a" | "b" | "c" | "d"; // 👈 enforce DB constraint
  content_type?: "plain" | "math";
};

export async function addNmmsQuestion(input: QuestionInput) {
  const { data, error } = await supabase
    .from("nmms_questions")
    .insert([
      {
        question: input.question,
        option_a: input.option_a,
        option_b: input.option_b,
        option_c: input.option_c,
        option_d: input.option_d,
        correct_answer: input.correct_answer, // always 'a'|'b'|'c'|'d'
        content_type: input.content_type ?? "plain",
      },
    ])
    .select();

  if (error) throw error;
  return data;
}
