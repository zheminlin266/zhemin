"use client";

import { useEffect, useRef, useState } from "react";
import { copyEmailAddress } from "../email-copy.mjs";

function copyWithSelection(text) {
  const previousFocus = document.activeElement;
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);

  try {
    field.select();
    // Compatibility fallback for browsers or contexts without Clipboard API access.
    return document.execCommand("copy");
  } finally {
    field.remove();
    previousFocus?.focus();
  }
}

export default function EmailCopyButton({ labels }) {
  const [notice, setNotice] = useState({ status: "idle", x: 0, y: 0 });
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  async function handleCopy(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const point = event.detail === 0
      ? { x: rect.right, y: rect.bottom }
      : { x: event.clientX, y: event.clientY };

    window.clearTimeout(timerRef.current);
    try {
      await copyEmailAddress({ clipboard: navigator.clipboard, fallback: copyWithSelection });
      setNotice({ status: "copied", ...point });
    } catch {
      setNotice({ status: "failed", ...point });
    }
    timerRef.current = window.setTimeout(() => setNotice((current) => ({ ...current, status: "idle" })), 2000);
  }

  const message = notice.status === "copied"
    ? labels.emailCopied
    : notice.status === "failed"
      ? labels.emailCopyFailed
      : "";

  return (
    <>
      <button className="footer-copy-button" type="button" onClick={handleCopy} aria-label={labels.copyEmail}>
        Email
      </button>
      <span
        className={`copy-toast ${notice.status !== "idle" ? "is-visible" : ""}`}
        style={{ "--copy-x": `${notice.x}px`, "--copy-y": `${notice.y}px` }}
        role="status"
        aria-live="polite"
      >
        {message}
      </span>
    </>
  );
}
