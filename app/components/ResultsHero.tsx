"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BackButton, FooterNav, ProceedButton } from "@/app/components/NavButtons";

type HoverKey = "demographics" | "cosmetic" | "skin" | "weather" | null;

/** Analysis select diamonds (wandag /select) */
export default function ResultsHero() {
  const [hover, setHover] = useState<HoverKey>(null);

  return (
    <div className="relative min-h-[90vh] bg-white">
      <div className="absolute top-16 left-9 z-10 text-left">
        <p className="text-xs font-semibold tracking-wide">A.I. ANALYSIS</p>
        <p className="mt-2 text-sm leading-snug text-gray-500">
          A.I. has estimated the following.
          <br />
          Fix estimated information if needed.
        </p>
      </div>

      <div className="relative flex min-h-[78vh] items-center justify-center pt-8 md:pt-0">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className={`absolute transition-all duration-400 ${
              hover === "demographics" || hover === null
                ? "h-[602px] w-[602px] opacity-100"
                : "h-[400px] w-[400px] opacity-0"
            }`}
          >
            <Image
              src="/images/diamond-small.png"
              alt="Diamond Small"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className={`absolute transition-all duration-400 ${
              hover === "cosmetic" || hover === "skin"
                ? "h-[682px] w-[682px] opacity-100"
                : "h-[400px] w-[400px] opacity-0"
            }`}
          >
            <Image
              src="/images/diamond-medium.png"
              alt="Diamond Medium"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className={`absolute transition-all duration-400 ${
              hover === "weather"
                ? "h-[762px] w-[762px] opacity-100"
                : "h-[400px] w-[400px] opacity-0"
            }`}
          >
            <Image
              src="/images/diamond-large.png"
              alt="Diamond Large"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0">
          <div className="col-start-2 flex items-center justify-center">
            <Link href="/demographics">
              <button
                type="button"
                className="-m-5 flex h-[153.88px] w-[153.88px] rotate-45 transform cursor-pointer items-center justify-center bg-gray-200 font-semibold leading-[24px] tracking-tight uppercase transition-transform duration-300 hover:scale-[1.05] hover:bg-gray-300"
                onMouseEnter={() => setHover("demographics")}
                onMouseLeave={() => setHover(null)}
              >
                <span className="-rotate-45 transform">Demographics</span>
              </button>
            </Link>
          </div>
          <div className="col-start-1 row-start-2 flex items-center justify-center">
            <button
              type="button"
              className="-m-5 flex h-[153.88px] w-[153.88px] rotate-45 transform cursor-not-allowed items-center justify-center bg-gray-100 font-semibold leading-[24px] tracking-tight uppercase hover:bg-gray-300"
              onMouseEnter={() => setHover("cosmetic")}
              onMouseLeave={() => setHover(null)}
            >
              <span className="-rotate-45 transform text-center text-xs sm:text-sm">
                Cosmetic Concerns
              </span>
            </button>
          </div>
          <div className="col-start-3 row-start-2 flex items-center justify-center">
            <button
              type="button"
              className="-m-5 flex h-[153.88px] w-[153.88px] rotate-45 transform cursor-not-allowed items-center justify-center bg-gray-100 font-semibold leading-[24px] tracking-tight uppercase hover:bg-gray-300"
              onMouseEnter={() => setHover("skin")}
              onMouseLeave={() => setHover(null)}
            >
              <span className="-rotate-45 transform text-center text-xs sm:text-sm">
                Skin Type Details
              </span>
            </button>
          </div>
          <div className="col-start-2 row-start-3 flex items-center justify-center">
            <button
              type="button"
              className="-m-5 flex h-[153.88px] w-[153.88px] rotate-45 transform cursor-not-allowed items-center justify-center bg-gray-100 font-semibold leading-[24px] tracking-tight uppercase hover:bg-gray-300"
              onMouseEnter={() => setHover("weather")}
              onMouseLeave={() => setHover(null)}
            >
              <span className="-rotate-45 transform">Weather</span>
            </button>
          </div>
        </div>
      </div>

      <FooterNav>
        <BackButton href="/analysis" />
        <ProceedButton
          href="/demographics"
          label="GET SUMMARY"
          mobileLabel="SUM"
        />
      </FooterNav>
    </div>
  );
}
