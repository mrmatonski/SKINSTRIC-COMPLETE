"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function labelForPath(pathname: string): string {
  if (pathname.startsWith("/demographics")) return "DEMOGRAPHICS";
  if (pathname.startsWith("/results")) return "ANALYSIS";
  if (pathname.startsWith("/camera")) return "ANALYSIS";
  if (pathname.startsWith("/analysis")) return "ANALYSIS";
  if (pathname.startsWith("/intro")) return "INTRO";
  return "INTRO";
}

export default function Header() {
  const pathname = usePathname() || "/";
  const label = labelForPath(pathname);
  const onCamera = pathname.startsWith("/camera/capture");

  return (
    <div className="relative z-[1000] mb-3 flex h-[64px] w-full flex-row justify-between py-3">
      <div className="flex scale-75 flex-row items-center justify-center pt-1">
        <Link
          href="/"
          className={`z-1000 mr-2 inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm leading-[16px] font-semibold whitespace-nowrap transition-colors line-clamp-4 ${
            onCamera ? "text-[#FCFCFC]" : "text-[#1A1B1C]"
          }`}
        >
          SKINSTRIC
        </Link>
        <Image
          src="/images/left-bracket.png"
          alt="left-bracket"
          width={5}
          height={19}
          className="h-[17px] w-[4px]"
        />
        <p
          className={`ml-1.5 mr-1.5 text-sm font-semibold text-opacity-70 ${
            onCamera ? "text-[#fcfcfc83]" : "text-[#1a1b1c83]"
          }`}
        >
          {label}
        </p>
        <Image
          src="/images/right-bracket.png"
          alt="right-bracket"
          width={5}
          height={19}
          className="h-[17px] w-[4px]"
        />
      </div>
      <button
        type="button"
        className="mx-4 inline-flex h-9 scale-[0.8] items-center justify-center gap-2 bg-[#1A1B1C] px-4 py-2 text-[10px] leading-[16px] font-semibold whitespace-nowrap text-[#FCFCFC] shadow transition-colors hover:bg-[#1A1B1C]/90"
      >
        ENTER CODE
      </button>
    </div>
  );
}
