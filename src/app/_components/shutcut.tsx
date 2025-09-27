"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEventHandler } from "react";

type ShutcutProps = {
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

export default function Shutcut({
  id,
  name,
  description,
  icon,
  url,
  isFavorite = false,
  isEditable = false,
  onClick,
  className
}: ShutcutProps) {
  const containerClassName = ["flex items-center gap-3", className].filter(Boolean).join(" ");

  const content = (
    <>
      <div className="relative">
        <Image className="border border-gray-400 rounded-xl" src={icon} alt={name} width={50} height={50} />
        {isFavorite && (
          <span
            aria-hidden="true"
            className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-semibold text-white shadow-sm">
            ★
          </span>
        )}
      </div>
      {isEditable && (
        <div className="flex flex-1 flex-col overflow-hidden text-left">
          <h2 className="truncate text-sm font-bold">{name}</h2>
          <p className="truncate text-xs text-gray-500">{description}</p>
        </div>
      )}
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
    <Link id={id} href={url} className={containerClassName}>
      {content}
    </Link>
  );
}
