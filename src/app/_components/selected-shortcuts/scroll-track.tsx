"use client";

import type { CSSProperties } from "react";
import { TRACK_WIDTH } from "../../_utils/_constants/shortcut-constants";

type ScrollTrackProps = {
  hasScroll: boolean;
  thumbWidth: number;
  scrollRatio: number;
};

export default function ScrollTrack({ hasScroll, thumbWidth, scrollRatio }: ScrollTrackProps) {
  if (!hasScroll) {
    return null;
  }

  return (
    <div className="selected-shortcuts__track">
      <div
        className="selected-shortcuts__track-inner"
        style={{
          ["--selected-shortcuts-track-width" as keyof CSSProperties]: `${TRACK_WIDTH}px`,
          ["--selected-shortcuts-thumb-width" as keyof CSSProperties]: `${thumbWidth}px`,
          ["--selected-shortcuts-thumb-offset" as keyof CSSProperties]: `${(TRACK_WIDTH - thumbWidth) * scrollRatio}px`
        }}>
        <div className="selected-shortcuts__track-thumb" />
      </div>
    </div>
  );
}
