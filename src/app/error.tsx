"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Unexpected application error", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-10 text-center text-gray-700">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white px-8 py-10 shadow-lg">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#03c75a]/10 text-[#03c75a]">
          <span className="text-3xl font-semibold">!</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">문제가 발생했습니다</h1>
        <p className="mt-3 text-sm leading-6 text-gray-500">
          예기치 못한 오류가 발생했어요. 잠시 후 다시 시도하거나 홈으로 돌아가 주세요.
        </p>
        <p className="mt-4 break-all text-sm font-bold text-red-400 ">{error?.message}</p>
        {error?.digest && <p className="mt-4 break-all text-xs text-gray-400">오류 코드: {error.digest}</p>}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="w-full rounded-full bg-[#03c75a] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#02b856] focus:outline-none focus:ring-2 focus:ring-[#03c75a] focus:ring-offset-2 sm:w-auto">
            다시 시도
          </button>
          <a
            href="/"
            className="w-full rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-600 transition hover:border-[#03c75a] hover:text-[#03c75a] sm:w-auto">
            홈으로 이동
          </a>
        </div>
      </div>
    </div>
  );
}
