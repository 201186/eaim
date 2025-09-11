// src/components/MDXRenderer.tsx
"use client";

import React from "react";

type Props = {
  html: string;
};

export default function MDXRenderer({ html }: Props) {
  return (
    // Keep the inner container plain; outer wrapper in page.tsx also exists
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
