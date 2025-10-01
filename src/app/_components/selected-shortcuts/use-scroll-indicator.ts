"use client";

import { useCallback, useEffect, useState, type UIEvent } from "react";
import { THUMB_MIN_WIDTH, TRACK_WIDTH } from "./constants";

export type ScrollIndicatorResult = {
  hasScroll: boolean;
  scrollRatio: number;
  thumbWidth: number;
  handleScroll: (event: UIEvent<HTMLDivElement>) => void;
};

export function useScrollIndicator(
  scrollContainerRef: React.RefObject<HTMLDivElement | null>,
  dependencyKey: string
): ScrollIndicatorResult {
  const [hasScroll, setHasScroll] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(TRACK_WIDTH);

  const updateScrollbarState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const { scrollWidth, clientWidth } = container;
    const overflow = scrollWidth > clientWidth;
    setHasScroll(overflow);

    if (overflow) {
      const ratio = clientWidth / scrollWidth;
      setThumbWidth(Math.max(THUMB_MIN_WIDTH, Math.round(ratio * TRACK_WIDTH)));
    } else {
      setThumbWidth(TRACK_WIDTH);
      setScrollRatio(0);
    }
  }, [scrollContainerRef]);

  useEffect(() => {
    updateScrollbarState();
  }, [updateScrollbarState, dependencyKey]);

  useEffect(() => {
    const handleResize = () => updateScrollbarState();
    window.addEventListener("resize", handleResize);
    const timer = window.setTimeout(updateScrollbarState, 120);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(timer);
    };
  }, [updateScrollbarState]);

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const { scrollWidth, clientWidth, scrollLeft } = target;

    if (scrollWidth > clientWidth) {
      const maxScroll = scrollWidth - clientWidth;
      const ratio = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollRatio(Math.min(Math.max(ratio, 0), 1));
    } else {
      setScrollRatio(0);
    }
  }, []);

  return { hasScroll, scrollRatio, thumbWidth, handleScroll };
}
