"use client";

import { createPortal } from "react-dom";

type CenterToastProps = {
  message: string | null;
};

export default function CenterToast({ message }: CenterToastProps) {
  if (!message || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center pt-12">
      <div
        role="status"
        aria-live="polite"
        className="rounded-full bg-black/75 px-4 py-2 text-xs font-medium text-white shadow-lg">
        {message}
      </div>
    </div>,
    document.body
  );
}
