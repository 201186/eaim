// src/components/Analytics.tsx
import Script from "next/script";

export default function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

  // If either env var is missing, don't render analytics/verification (safe)
  if (!GA_MEASUREMENT_ID || !GSC_VERIFICATION) return null;

  return (
    <>
      {/* Google Search Console verification meta tag */}
      <meta name="google-site-verification" content={GSC_VERIFICATION} />

      {/* Google Analytics (GA4) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
