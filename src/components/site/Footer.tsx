import Link from "next/link";
import { Facebook, Twitter, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">EducationAim</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Learn • Practice • Succeed — blogs, smart tools, and online exams for every student.
          </p>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <Mail size={16} />
            <a className="hover:text-yellow-400" href="mailto:onlineeducationaim@gmail.com">
              onlineeducationaim@gmail.com
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold text-white">Explore</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link href="/blog" className="hover:text-yellow-400">Blog</Link></li>
            <li><Link href="/tools" className="hover:text-yellow-400">Tools</Link></li>
            <li><Link href="/exams" className="hover:text-yellow-400">Online Exams</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-white">Legal</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400">Contact Us</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-yellow-400">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-yellow-400">Terms & Conditions</Link></li>
            <li><Link href="/disclaimer" className="hover:text-yellow-400">Disclaimer</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-white">Follow</h3>
          <div className="mt-3 flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-yellow-400"><Facebook /></a>
            <a href="#" aria-label="Twitter" className="hover:text-yellow-400"><Twitter /></a>
            <a href="#" aria-label="YouTube" className="hover:text-yellow-400"><Youtube /></a>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            We use Google AdSense. Ads may be personalized based on cookies. See{" "}
            <Link href="/privacy-policy" className="underline hover:text-yellow-400">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EducationAim • All rights reserved
      </div>
    </footer>
  );
}
