// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Noto_Sans, Noto_Sans_Gujarati } from "next/font/google";
import Analytics from "@/components/Analytics";

// English/General font
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});

// Gujarati font
const notoGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "600", "700"],
  variable: "--font-gujarati",
  display: "swap",
});

// Global metadata
export const metadata: Metadata = {
  title: {
    default: "EducationAim – Learn • Practice • Succeed",
    template: "%s • EducationAim",
  },
  description: "Blogs, study tools, and online exams for students.",
  metadataBase: new URL("https://educationaim.in"),
  applicationName: "EducationAim",
  authors: [{ name: "EducationAim" }],
  keywords: [
    "NMMS",
    "Gyan Sadhana",
    "GK",
    "Online Exams",
    "Practice Tests",
    "Education",
    "Gujarati",
  ],
  openGraph: {
    type: "website",
    url: "https://educationaim.in",
    title: "EducationAim – Learn • Practice • Succeed",
    siteName: "EducationAim",
    description: "Blogs, study tools, and online exams for students.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EducationAim – Learn • Practice • Succeed",
    description: "Blogs, study tools, and online exams for students.",
    creator: "@educationaim",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: {
    canonical: "https://educationaim.in",
  },
};

// Viewport (mobile-friendly & theme color)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${notoSans.variable} ${notoGujarati.variable}`}
    >
      <head>
        {/* Extra link tags that metadata may not automatically add in all environments */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Analytics + Search Console verification (component) */}
        <Analytics />
      </head>

      <body className="min-h-screen bg-gray-50 text-gray-900 font-[var(--font-noto)] antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 rounded bg-black/90 px-3 py-2 text-white"
        >
          Skip to content
        </a>

        <Header />

        <main id="main" className="container mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
