// lib/quizzes.ts
export type QuizMeta = {
  id: string;
  title: string;
  subject: string;
  class?: string | number;
};

export const quizzes: QuizMeta[] = [
  {
    id: "general-knowledge",
    title: "General Knowledge (GK)",
    subject: "GK",
    class: "-"
  },
  {
    id: "nmms",
    title: "NMMS Exam",
    subject: "Scholarship",
    class: "8"
  },
  {
    id: "gyan-sadhana",
    title: "Gyan Sadhana Exam",
    subject: "Scholarship",
    class: "9"
  }
];
