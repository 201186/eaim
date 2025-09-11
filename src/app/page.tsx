import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border p-8">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          EducationAim: Learn • Practice • Succeed
        </h1>
        <p className="mt-3 text-lg text-gray-700 max-w-2xl">
          Exam-oriented blogs, handy study tools, and free online practice tests — all in one place. 
          Whether you are preparing for board exams, entrance tests, or scholarships — we make your journey simpler.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/exams"
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium"
          >
            Start Practice
          </Link>
          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-xl border font-medium"
          >
            Read Blog
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg">Fresh Exam Blogs</h3>
            <p className="text-sm text-gray-700 mt-1">
              Read strategies, syllabus updates, and previous year questions (PYQs) 
              written in simple language to boost your preparation.
            </p>
            <Link
              href="/blog"
              className="text-blue-600 text-sm mt-3 inline-block"
            >
              Explore →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg">Smart Tools</h3>
            <p className="text-sm text-gray-700 mt-1">
              Percentage calculators, grade predictors, ratio solvers, and other 
              handy tools designed for students — save time & study smart.
            </p>
            <Link
              href="/tools"
              className="text-blue-600 text-sm mt-3 inline-block"
            >
              Try Tools →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg">Online Exams</h3>
            <p className="text-sm text-gray-700 mt-1">
              Practice MCQs with instant scoring & analysis. 
              Test yourself anytime, anywhere & improve step by step.
            </p>
            <Link
              href="/exams"
              className="text-blue-600 text-sm mt-3 inline-block"
            >
              Start Now →
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Why Choose Us */}
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold">Why Choose EducationAim?</h2>
        <p className="mt-3 text-gray-700">
          We bring everything a student needs at one place:
        </p>
        <ul className="mt-6 grid sm:grid-cols-2 gap-6 text-left">
          <li className="p-4 border rounded-xl bg-white shadow-sm">
            ✅ Easy-to-understand blogs covering all exam topics
          </li>
          <li className="p-4 border rounded-xl bg-white shadow-sm">
            ✅ Free tools to calculate percentages, grades & more
          </li>
          <li className="p-4 border rounded-xl bg-white shadow-sm">
            ✅ Online exam practice with real-time results
          </li>
          <li className="p-4 border rounded-xl bg-white shadow-sm">
            ✅ 100% student-friendly, no unnecessary complexity
          </li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border p-10">
        <h2 className="text-2xl font-bold">Start your learning journey today 🚀</h2>
        <p className="mt-2 text-gray-700">
          Join thousands of students who already use EducationAim to study smarter, not harder.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/exams"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium"
          >
            Take a Free Test
          </Link>
          <Link
            href="/tools"
            className="px-6 py-3 rounded-xl border font-medium"
          >
            Explore Tools
          </Link>
        </div>
      </section>
    </div>
  );
}
