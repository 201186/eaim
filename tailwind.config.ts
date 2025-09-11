import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],

  // 👇 Prevent Tailwind from emitting modern color functions (oklch)
  future: {
    disableColorFunction: true,
  },

  theme: {
    extend: {
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    // ✅ Legacy color palette (hex) to avoid oklch()
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      red: {
        500: "#ef4444",
        600: "#dc2626",
      },
      green: {
        500: "#22c55e",
        600: "#16a34a",
      },
      yellow: {
        500: "#eab308",
        600: "#ca8a04",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
