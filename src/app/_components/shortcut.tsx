"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEventHandler } from "react";
import { useLinkOpenPreference } from "../_utils/contexts/link-open-preference-context";

type ShortcutProps = {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  isFavorite?: boolean;
  isEditable?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const QUALITIES = [30, 50, 70, 90, 100];

export default function Shortcut({
  id,
  name,
  description,
  icon,
  url,
  isFavorite = false,
  isEditable = false,
  onClick,
  className
}: ShortcutProps) {
  const { isNewTab } = useLinkOpenPreference();

  const containerClassName = ["flex items-center", !isEditable && !isFavorite ? `flex-col gap-2` : `gap-3`, className]
    .filter(Boolean)
    .join(" ");

  const imageQuality: number = Number(process.env.NEXT_PUBLIC_IMAGE_QUALITY || 30);

  if (!QUALITIES.includes(imageQuality)) {
    throw new Error(`Invalid image quality allowed values are ${QUALITIES.join(", ")}`);
  }

  const content = (
    <>
      <div className="relative">
        <Image
          className="border border-gray-400 rounded-xl"
          src={icon}
          alt={name}
          width={50}
          height={50}
          quality={imageQuality}
        />

        {isFavorite && (
          <>
            <span
              aria-hidden="true"
              className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-semibold text-white shadow-sm">
              ★
            </span>
          </>
        )}
      </div>

      {isEditable && (
        <div className="flex flex-1 flex-col overflow-hidden text-left">
          <h2 className="truncate text-sm font-bold">{name}</h2>
          <p className="truncate text-xs text-gray-500">{description}</p>
        </div>
      )}

      {!isEditable && !isFavorite && <label className="truncate text-sm text-gray-500 font-bold">{name}</label>}
    </>
  );

  if (isEditable) {
    return (
      <button id={id} type="button" onClick={onClick} className={containerClassName}>
        {content}
      </button>
    );
  }

  return (
    <Link
      id={id}
      href={url}
      className={containerClassName}
      prefetch
      target={isNewTab ? "_blank" : undefined}
      rel={isNewTab ? "noopener noreferrer" : undefined}>
      {content}
    </Link>
  );
}
