"use client";
import Link from "next/link";
import { NotebookPen, Hammer, ClipboardList, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-extrabold text-2xl tracking-tight hover:opacity-90">
          Education<span className="text-yellow-300">Aim</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/blog" className="flex items-center gap-1 hover:text-yellow-200 transition-colors">
            <NotebookPen size={18}/> Blog
          </Link>
          <Link href="/tools" className="flex items-center gap-1 hover:text-yellow-200 transition-colors">
            <Hammer size={18}/> Tools
          </Link>
          <Link href="/exams" className="flex items-center gap-1 hover:text-yellow-200 transition-colors">
            <ClipboardList size={18}/> Online Exams
          </Link>
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/exams"
          className="hidden md:inline-block ml-4 rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-yellow-300 transition-colors"
        >
          Start Practice
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded hover:bg-white/20"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-indigo-700 text-white px-4 py-4 space-y-4">
          <Link href="/blog" className="block hover:text-yellow-300" onClick={()=>setOpen(false)}>📖 Blog</Link>
          <Link href="/tools" className="block hover:text-yellow-300" onClick={()=>setOpen(false)}>🛠 Tools</Link>
          <Link href="/exams" className="block hover:text-yellow-300" onClick={()=>setOpen(false)}>📝 Online Exams</Link>
          <Link
            href="/exams"
            className="block rounded bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-yellow-300 transition-colors"
            onClick={()=>setOpen(false)}
          >
            Start Practice
          </Link>
        </div>
      )}
    </header>
  );
}
