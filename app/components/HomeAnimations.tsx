"use client";

import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";

/**
 * Homepage matching skinstric-ruddy: DISCOVER A.I. / TAKE TEST + GSAP hover.
 * Desktop lower-left copy uses fixed + negative offsets that ONLY position
 * correctly inside the md:fixed + translate centering parent (transform
 * containing block). Do not remove that parent or the copy goes off-screen.
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
    <div className="max-sm:origin-center max-sm:scale-[0.75] max-sm:p-6">
      <div className="flex h-[71dvh] flex-col items-center justify-center md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        {/* Mobile diamonds */}
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-[52%] -translate-y-1/2 rotate-45 border border-dotted border-[#A0A4AB]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-[52%] -translate-y-1/2 rotate-45 border border-dotted border-[#A0A4AB]" />
        </div>

        <div id="main-heading" className="relative z-10 text-center">
          <h1 className="font-inter text-[60px] leading-none font-normal tracking-tighter text-[#1A1B1C] lg:text-[100px]">
            Sophisticated
            <br />
            <span className="block text-[#1A1B1C]">skincare</span>
          </h1>
        </div>

        <p className="text-muted-foreground z-10 mt-4 block w-[30ch] text-center text-[16px] font-semibold text-[#1a1b1c83] lg:hidden">
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>

        <div className="z-10 mt-4 lg:hidden">
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

        {/*
          Desktop lower-left copy. Visible only at lg+.
          Positioned relative to the transform containing block above
          (md:fixed + -translate-*), not the viewport — same as ruddy.
        */}
        <div className="fixed bottom-[calc(-7vh)] left-[calc(-20vw)] hidden space-y-3 text-sm font-normal text-[#1A1B1C] uppercase xl:left-[calc(-27vw)] 2xl:left-[calc(-31vw)] [@media(width>=1920px)]:left-[calc(-33vw)] lg:block">
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
          className="fixed top-1/2 left-[calc(-53vw)] hidden h-[500px] w-[500px] -translate-y-1/2 opacity-100 transition-opacity duration-500 ease-in-out xl:left-[calc(-50vw)] lg:block"
        >
          <div className="relative h-full w-full">
            <div className="fixed inset-0 h-full w-full rotate-45 border border-dotted border-[#A0A4AB]" />
            <button
              id="discover-button"
              type="button"
              className="group absolute top-1/2 right-0 inline-flex h-9 translate-x-1/5 -translate-y-1/2 cursor-pointer items-center justify-center gap-4 rounded-md px-3 py-1 text-sm font-normal whitespace-nowrap text-[#1A1B1C] transition-colors xl:translate-x-1/6 [@media(width>=1920px)]:translate-x-1/20"
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
          className="fixed top-1/2 right-[calc(-53vw)] hidden h-[500px] w-[500px] -translate-y-1/2 opacity-100 transition-opacity duration-500 ease-in-out xl:right-[calc(-50vw)] lg:block"
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 h-full w-full rotate-45 border border-dotted border-[#A0A4AB]" />
            <Link href="/intro">
              <button
                id="take-test-button"
                type="button"
                className="group absolute top-1/2 left-0 inline-flex h-9 -translate-x-1/5 -translate-y-1/2 cursor-pointer items-center justify-center gap-4 rounded-md px-3 py-1 text-sm font-normal whitespace-nowrap text-[#1A1B1C] transition-colors xl:-translate-x-1/6 [@media(width>=1920px)]:-translate-x-1/20"
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
