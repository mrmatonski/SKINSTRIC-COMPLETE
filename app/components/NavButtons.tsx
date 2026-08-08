"use client";

import Link from "next/link";
import { Children, type ReactNode } from "react";

type DiamondNavProps = {
  label: string;
  mobileLabel?: string;
  direction: "left" | "right";
  light?: boolean;
};

function DiamondNavContent({
  label,
  mobileLabel,
  direction,
  light = false,
}: DiamondNavProps) {
  const border = light ? "border-[#FCFCFC]" : "border-[#1A1B1C]";
  const text = light ? "text-[#FCFCFC]" : "text-[#1A1B1C]";
  const short = mobileLabel ?? label;

  if (direction === "left") {
    return (
      <div>
        <div
          className={`relative flex h-12 w-12 min-h-12 min-w-12 scale-[1] items-center justify-center rotate-45 border sm:hidden ${border}`}
        >
          <span
            className={`rotate-[-45deg] text-xs font-semibold sm:hidden ${text}`}
          >
            {short}
          </span>
        </div>
        <div className="group relative hidden flex-row items-center justify-center sm:flex">
          <div
            className={`hidden h-12 w-12 scale-[0.85] justify-center rotate-45 border duration-300 ease group-hover:scale-[0.92] sm:flex ${border}`}
          />
          <span
            className={`absolute bottom-[13px] left-[15px] hidden scale-[0.9] rotate-180 duration-300 ease group-hover:scale-[0.92] sm:block ${text}`}
          >
            ▶
          </span>
          <span
            className={`ml-6 hidden text-sm font-semibold sm:block ${text}`}
          >
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`relative flex h-12 w-12 min-h-12 min-w-12 scale-[1] items-center justify-center rotate-45 border sm:hidden ${border}`}
      >
        <span
          className={`rotate-[-45deg] text-xs font-semibold sm:hidden ${text}`}
        >
          {short}
        </span>
      </div>
      <div className="group relative hidden flex-row items-center justify-center sm:flex">
        <span className={`mr-5 hidden text-sm font-semibold sm:block ${text}`}>
          {label}
        </span>
        <div
          className={`hidden h-12 w-12 scale-[0.85] justify-center rotate-45 border duration-300 ease group-hover:scale-[0.92] sm:flex ${border}`}
        />
        <span
          className={`absolute right-[15px] bottom-[13px] hidden scale-[0.9] duration-300 ease group-hover:scale-[0.92] sm:block ${text}`}
        >
          ▶
        </span>
      </div>
    </div>
  );
}

type BackButtonProps = {
  href: string;
  light?: boolean;
};

export function BackButton({ href, light = false }: BackButtonProps) {
  return (
    <Link href={href} aria-label="Back" className="relative inset-0">
      <DiamondNavContent label="BACK" direction="left" light={light} />
    </Link>
  );
}

type ProceedButtonProps = {
  href?: string;
  onClick?: () => void;
  label?: string;
  mobileLabel?: string;
  show?: boolean;
  light?: boolean;
};

export function ProceedButton({
  href,
  onClick,
  label = "PROCEED",
  mobileLabel,
  show = true,
  light = false,
}: ProceedButtonProps) {
  if (!show) return null;

  const content = (
    <DiamondNavContent
      label={label}
      mobileLabel={mobileLabel}
      direction="right"
      light={light}
    />
  );

  if (href) {
    return (
      <Link href={href} className="relative">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="relative">
      {content}
    </button>
  );
}

export function FooterNav({ children }: { children: ReactNode }) {
  const items = Children.toArray(children).filter(Boolean);

  return (
    <div className="absolute bottom-8 left-0 right-0 z-30 flex w-full justify-between px-6 sm:bottom-38.5 sm:px-13 md:bottom-8 md:px-9">
      <div>{items[0] ?? null}</div>
      {items.length === 2 ? <div>{items[1]}</div> : null}
      {items.length >= 3 ? (
        <>
          <div className="flex flex-1 items-center justify-center px-4">
            {items[1]}
          </div>
          <div>{items[2]}</div>
        </>
      ) : null}
    </div>
  );
}
