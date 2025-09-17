"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type Props = {
  text?: string | null;
  className?: string;
  allowHtml?: boolean;
  imgMaxWidth?: number | string;
};

export default function QuestionRenderer({
  text,
  className = "",
  allowHtml = false,
  imgMaxWidth = "520px",
}: Props) {
  if (!text) return null;

  const trimmed = text.trim();

  // image URL detection
  if (/^(\/|https?:\/\/)/.test(trimmed)) {
    return (
      <div className={className}>
        <img
          src={trimmed}
          alt="question-asset"
          style={{ maxWidth: imgMaxWidth, width: "100%", height: "auto" }}
          loading="lazy"
        />
      </div>
    );
  }

  // Use [\s\S] instead of dotAll /s to support older TS targets
  const onlyMathBlock = /^\$\$([\s\S]+)\$\$$/.test(trimmed);
  const onlyInlineMath = /^\$([\s\S]+)\$$/.test(trimmed);

  if (onlyMathBlock || onlyInlineMath) {
    return (
      <div className={className}>
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {trimmed}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div className={(className + " prose max-w-none").trim()}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {trimmed}
      </ReactMarkdown>
    </div>
  );
}
