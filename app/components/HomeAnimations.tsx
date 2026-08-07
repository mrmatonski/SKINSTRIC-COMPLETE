"use client";

import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";

/**
 * Homepage matching skinstric-wandag: DISCOVER A.I. / TAKE TEST + GSAP hover.
 * Uses absolute positioning inside a full-viewport shell so layout still works
 * when a parent (e.g. app/template motion wrapper) creates a containing block.
 */
export default function HomeAnimations() {
  useEffect(() => {
    const main = document.getElementById("main-heading");
    const discover = document.getElementById("discover-button");
    const takeTest = document.getElementById("take-test-button");
    const left = document.getElementById("left-section");
    const right = document.getElementById("right-section");
    if (!main || !discover || !takeTest || !left || !right) return;

    const h1 = main.querySelector("h1");
    if (!h1) return;
    const span = h1.querySelector("span");

    const intro = gsap.timeline();
    intro.fromTo(
      h1,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.inOut" },
    );

    const onTakeEnter = () => {
      gsap.to(left, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
      gsap.to(h1, {
        x: "-20rem",
        duration: 0.7,
        ease: "power2.inOut",
        delay: 0.1,
      });
      if (span) {
        gsap.to(span, {
          x: "-6rem",
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.1,
        });
      }
    };
    const onTakeLeave = () => {
      gsap.to(left, { opacity: 1, duration: 0.4, ease: "power2.inOut" });
      gsap.to(h1, {
        x: 0,
        duration: 0.7,
        ease: "power2.inOut",
        delay: 0.1,
      });
      if (span) {
        gsap.to(span, {
          x: 0,
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.01,
        });
      }
    };
    const onDiscoverEnter = () => {
      gsap.to(right, { opacity: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(h1, {
        x: "20rem",
        duration: 0.7,
        ease: "power2.inOut",
        delay: 0.1,
      });
      if (span) {
        gsap.to(span, {
          x: "6rem",
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.01,
        });
      }
    };
    const onDiscoverLeave = () => {
      gsap.to(right, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
      gsap.to(h1, {
        x: 0,
        duration: 0.7,
        ease: "power2.inOut",
        delay: 0.01,
      });
      if (span) {
        gsap.to(span, {
          x: 0,
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.01,
        });
      }
    };

    takeTest.addEventListener("mouseenter", onTakeEnter);
    takeTest.addEventListener("mouseleave", onTakeLeave);
    discover.addEventListener("mouseenter", onDiscoverEnter);
    discover.addEventListener("mouseleave", onDiscoverLeave);

    return () => {
      intro.kill();
      takeTest.removeEventListener("mouseenter", onTakeEnter);
      takeTest.removeEventListener("mouseleave", onTakeLeave);
      discover.removeEventListener("mouseenter", onDiscoverEnter);
      discover.removeEventListener("mouseleave", onDiscoverLeave);
      gsap.killTweensOf([h1, span, left, right]);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[100vw] items-center justify-center max-sm:origin-center max-sm:scale-[0.75] max-sm:p-6">
        {/* Mobile diamonds */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-[52%] -translate-y-1/2 rotate-45 border border-dotted border-[#A0A4AB]" />
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-[52%] -translate-y-1/2 rotate-45 border border-dotted border-[#A0A4AB]" />
        </div>

        <div id="main-heading" className="relative z-10 text-center">
          <h1 className="font-inter text-[60px] leading-none font-normal tracking-tighter text-[#1A1B1C] lg:text-[100px]">
            Sophisticated
            <br />
            <span className="block text-[#1A1B1C]">skincare</span>
          </h1>
        </div>

        <p className="absolute top-[calc(50%+7rem)] z-10 mt-4 block w-[30ch] text-center text-[16px] font-semibold text-[#1a1b1c83] lg:hidden">
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>

        <div className="absolute top-[calc(50%+14rem)] z-10 mt-4 lg:hidden">
          <Link href="/intro">
            <button
              type="button"
              className="relative flex items-center gap-4 duration-300 hover:scale-105"
            >
              <span className="cursor-pointer text-[12px] font-bold">
                ENTER EXPERIENCE
              </span>
              <div className="h-[24px] w-[24px] rotate-45 cursor-pointer border border-solid border-black" />
              <span className="absolute left-[129px] scale-[0.5] duration-300 hover:scale-60">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-current text-black"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          </Link>
        </div>

        <div className="absolute bottom-8 left-8 hidden max-w-[28ch] space-y-3 text-sm font-normal text-[#1A1B1C] uppercase lg:block xl:left-12">
          <p>
            Skinstric developed an A.I. that creates a
            <br />
            highly-personalized routine tailored to
            <br />
            what your skin needs.
          </p>
        </div>

        {/* Left — DISCOVER A.I. */}
        <div
          id="left-section"
          className="absolute top-1/2 left-0 z-20 hidden h-[500px] w-[500px] -translate-x-[55%] -translate-y-1/2 opacity-100 transition-opacity duration-500 ease-in-out xl:-translate-x-[50%] lg:block"
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 h-full w-full rotate-45 border border-dotted border-[#A0A4AB]" />
            <button
              id="discover-button"
              type="button"
              className="group absolute top-1/2 right-0 z-30 inline-flex h-9 translate-x-1/5 -translate-y-1/2 cursor-pointer items-center justify-center gap-4 rounded-md px-3 py-1 text-sm font-normal whitespace-nowrap text-[#1A1B1C] transition-colors xl:translate-x-1/6 [@media(width>=1920px)]:translate-x-1/20"
            >
              <div className="h-[30px] w-[30px] rotate-45 cursor-pointer border border-solid border-black duration-300 group-hover:scale-110" />
              <span className="absolute top-[8px] left-[18px] scale-[0.9] rotate-180 duration-300 group-hover:scale-105">
                ▶
              </span>
              <span>DISCOVER A.I.</span>
            </button>
          </div>
        </div>

        {/* Right — TAKE TEST */}
        <div
          id="right-section"
          className="absolute top-1/2 right-0 z-20 hidden h-[500px] w-[500px] translate-x-[55%] -translate-y-1/2 opacity-100 transition-opacity duration-500 ease-in-out xl:translate-x-[50%] lg:block"
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 h-full w-full rotate-45 border border-dotted border-[#A0A4AB]" />
            <Link href="/intro">
              <button
                id="take-test-button"
                type="button"
                className="group absolute top-1/2 left-0 z-30 inline-flex h-9 -translate-x-1/5 -translate-y-1/2 cursor-pointer items-center justify-center gap-4 rounded-md px-3 py-1 text-sm font-normal whitespace-nowrap text-[#1A1B1C] transition-colors xl:-translate-x-1/6 [@media(width>=1920px)]:-translate-x-1/20"
              >
                TAKE TEST
                <div className="h-[30px] w-[30px] rotate-45 border border-solid border-black duration-300 group-hover:scale-110" />
                <span className="absolute top-[9px] left-[107px] scale-[0.9] cursor-pointer duration-300 group-hover:scale-105">
                  ▶
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
