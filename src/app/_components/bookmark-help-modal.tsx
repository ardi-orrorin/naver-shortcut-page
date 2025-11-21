"use client";

import { useState } from "react";
import { StringOrNull } from "../_utils/types/common-type";

export default function BookmarkHelpModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState<StringOrNull>(null);
  const version = process.env.NEXT_PUBLIC_VERSION;
  const currentYear = new Date().getFullYear();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const shareLink = async () => {
    if (typeof window === "undefined") {
      return;
    }

    const url = window.location.href;

    const showMessage = (message: string) => {
      setShareMessage(message);
      window.setTimeout(() => setShareMessage(null), 2500);
    };

    const fallbackCopyToClipboard = () => {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.top = "-1000px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        return successful;
      } catch (error) {
        console.error("Failed to copy via fallback", error);
        return false;
      }
    };

    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
        showMessage("공유 메뉴를 열었습니다.");
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        showMessage("링크가 복사되었습니다.");
        return;
      }

      if (fallbackCopyToClipboard()) {
        showMessage("링크가 복사되었습니다.");
        return;
      }

      showMessage("링크 복사에 실패했습니다. 직접 복사해 주세요.");
    } catch (error) {
      console.error("Failed to share link", error);

      if (fallbackCopyToClipboard()) {
        showMessage("링크가 복사되었습니다.");
        return;
      }

      showMessage("링크 복사에 실패했습니다. 직접 복사해 주세요.");
    }
  };

  return (
    <div className="absolute right-4 top-4 text-right">
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={shareLink}
          className="rounded-full border border-[#03c75a] px-4 py-2 text-sm font-semibold text-[#03c75a] transition-colors hover:bg-[#03c75a] hover:text-white">
          링크 공유
        </button>
        <button
          type="button"
          onClick={openModal}
          className="rounded-full border border-[#03c75a] px-4 py-2 text-sm font-semibold text-[#03c75a] transition-colors hover:bg-[#03c75a] hover:text-white">
          북마크 안내
        </button>
      </div>
      <p aria-live="polite" className="mt-2 text-xs text-gray-500">
        {shareMessage ?? " "}
      </p>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bookmark-guide-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
              <div className="text-start">
                <h2 id="bookmark-guide-title" className="text-lg font-semibold text-gray-900">
                  링크를 북마크에 추가하는 방법
                </h2>
                <p className="mt-1 text-sm text-gray-500">자주 사용하는 조합을 빠르게 다시 열 수 있어요.</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500 transition hover:bg-gray-200 hover:text-gray-700">
                닫기
              </button>
            </div>

            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-start leading-6 text-gray-700">
              <li>
                더보기에서 원하는 서비스를 선택해 나만의 북마크 목록을 만듭니다. 선택한 항목은 URL 파라미터로
                저장됩니다.
              </li>
              <li>
                선택된 바로가기는 마우스로 끌어서(드래그 앤 드롭) 순서를 바꿀 수 있어요. 원하는 위치로 드래그해 정리하면
                더 편하게 사용할 수 있습니다.
              </li>
              <li>
                주소창의 URL 끝에 표시된 `?shutcuts=...` 링크를 그대로 사용해 주세요. 현재 페이지 주소가 곧 북마크
                링크입니다.
              </li>
              <li>
                검색 모드는 <span className="font-semibold">Ctrl(⌘) + 숫자</span> 단축키로 바로 전환할 수 있어요. 버튼
                오른쪽의 표시(예: <span className="font-semibold">C+1</span>)를 참고해 보세요.
              </li>
              <li>
                좌측 상단의 <span className="font-semibold">검색 기록 클릭 시 검색</span> 토글을 켜면, 히스토리 버튼을 누를
                때 곧바로 검색이 실행돼요. 끄면 입력창에만 채워지니 상황에 맞게 조절해 보세요.
              </li>
              <li>
                PC 브라우저에서는 <span className="font-semibold">Ctrl + D</span>(Windows) 또는{" "}
                <span className="font-semibold">⌘ + D</span>(Mac) 를 눌러 즐겨찾기에 추가합니다. 모바일 브라우저에서는
                공유 메뉴에서 &quot;북마크에 추가&quot;를 선택하세요.
              </li>
              <li>북마크 이름을 정해 저장하면 다음에도 같은 조합의 바로가기를 즉시 불러올 수 있습니다.</li>
            </ol>

            <div className="my-5 rounded-2xl bg-gray-50 px-4 py-3 text-xs text-gray-500 text-center">
              북마크 링크를 다른 사람과 공유하려면 주소창의 URL을 복사해 전달하면 됩니다. URL에 포함된 shortcuts
              매개변수를 그대로 두면 저장한 조합을 정확히 불러올 수 있어요.
            </div>
            <div className="mt- border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
              <p>© {currentYear} Naver Shortcut Page. All rights reserved.</p>
              <p>Version: {version}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
