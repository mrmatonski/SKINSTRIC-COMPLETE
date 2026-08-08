"use client";

import Image from "next/image";
import { useCallback, useState, useTransition, type FormEvent } from "react";
import LoadingDots from "@/app/components/LoadingDots";
import { BackButton, FooterNav, ProceedButton } from "@/app/components/NavButtons";
import { useToast } from "@/app/components/Toast";
import { submitPhaseOne } from "@/lib/api";
import { setLocalItem, STORAGE_KEYS } from "@/lib/storage";

type FormState = {
  step: 1 | 2 | 3;
  name: string;
  location: string;
  errors: { name?: string[]; location?: string[] };
  phase: "idle" | "preparing" | "processing";
};

const INVALID = /[0-9!@#$%^&*(),.?":{}|<>]/;

/** Phase One — name / city (wandag /testing) */
export default function IntroHero() {
  const { showToast } = useToast();
  const [state, setState] = useState<FormState>({
    step: 1,
    name: "",
    location: "",
    errors: {},
    phase: "idle",
  });
  const [isPending, startTransition] = useTransition();

  const runApi = useCallback(
    async (name: string, location: string) => {
      setState((prev) => ({ ...prev, phase: "processing" }));
      try {
        const result = await submitPhaseOne(name, location);
        if (result.success) {
          setLocalItem(STORAGE_KEYS.userName, name);
          setLocalItem(STORAGE_KEYS.userLocation, location);
          setState((prev) => ({
            ...prev,
            step: 3,
            phase: "idle",
          }));
        } else {
          setState((prev) => ({
            ...prev,
            step: 2,
            location: "",
            phase: "idle",
            errors: {
              location: [
                "There was a problem with your submission. Please try again.",
              ],
            },
          }));
          showToast("Submission failed. Please try again.", "error");
        }
      } catch {
        setState((prev) => ({
          ...prev,
          step: 2,
          location: "",
          phase: "idle",
          errors: {
            location: [
              "There was a problem with your submission. Please try again.",
            ],
          },
        }));
        showToast("Network error. Please try again.", "error");
      }
    },
    [showToast],
  );

  function onNameSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    if (!name) {
      setState((prev) => ({
        ...prev,
        errors: { name: ["Please enter your name"] },
      }));
      return;
    }
    if (INVALID.test(name)) {
      setState((prev) => ({
        ...prev,
        errors: {
          name: [
            "Please enter a valid name without numbers or special characters",
          ],
        },
      }));
      return;
    }
    setState({
      step: 2,
      name,
      location: "",
      errors: {},
      phase: "idle",
    });
  }

  function onLocationSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const location = String(form.get("location") ?? "").trim();
    if (!location) {
      setState((prev) => ({
        ...prev,
        errors: { location: ["Please enter your city"] },
      }));
      return;
    }
    if (INVALID.test(location)) {
      setState((prev) => ({
        ...prev,
        errors: {
          location: [
            "Please enter a valid city without numbers or special characters",
          ],
        },
      }));
      return;
    }

    const name = state.name;
    setState((prev) => ({
      ...prev,
      step: 2,
      location,
      errors: {},
      phase: "preparing",
    }));

    window.setTimeout(() => {
      startTransition(() => {
        void runApi(name, location);
      });
    }, 1500);
  }

  const busy = state.phase !== "idle" || isPending;

  return (
    <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-white text-center">
      <div className="absolute top-16 left-9 text-left">
        <p className="text-xs font-semibold">TO START ANALYSIS</p>
      </div>

      <div className="relative mb-40 flex h-full w-full flex-col items-center justify-center">
        {state.step !== 3 && !busy && (
          <p className="mb-1 text-sm tracking-wider text-gray-400 uppercase">
            CLICK TO TYPE
          </p>
        )}

        {busy && (
          <div className="relative z-10">
            <p className="mb-2 text-lg text-gray-500">Processing submission</p>
            <LoadingDots label="" />
          </div>
        )}

        {state.step === 1 && !busy && (
          <form onSubmit={onNameSubmit} className="relative z-10">
            <div className="flex flex-col items-center">
              {state.errors.name?.map((err) => (
                <p key={err} className="mb-2 text-sm text-red-500" role="alert">
                  {err}
                </p>
              ))}
            </div>
            <input
              name="name"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Introduce Yourself"
              aria-label="Your name"
              className="z-10 w-full max-w-[min(372px,calc(100vw-2.5rem))] appearance-none border-b border-black bg-transparent pt-1 text-center text-4xl leading-[48px] font-normal tracking-[-0.07em] text-[#1A1B1C] focus:outline-none sm:max-w-none sm:w-[432px] sm:text-6xl sm:leading-[64px]"
            />
            <button type="submit" className="sr-only">
              Submit
            </button>
          </form>
        )}

        {state.step === 2 && state.phase === "idle" && !state.location && (
          <form onSubmit={onLocationSubmit} className="relative z-10">
            <div className="flex flex-col items-center">
              {state.errors.location?.map((err) => (
                <p key={err} className="mb-2 text-sm text-red-500" role="alert">
                  {err}
                </p>
              ))}
            </div>
            <input
              name="location"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="your city name"
              defaultValue=""
              aria-label="Your city"
              className="z-10 w-full max-w-[min(372px,calc(100vw-2.5rem))] appearance-none border-b border-black bg-transparent pt-1 text-center text-4xl leading-[48px] font-normal tracking-[-0.07em] text-[#1A1B1C] focus:outline-none sm:max-w-none sm:w-[432px] sm:text-6xl sm:leading-[64px]"
            />
            <button type="submit" className="sr-only">
              Submit
            </button>
          </form>
        )}

        {state.step === 3 && (
          <div className="relative z-10 flex flex-col items-center gap-4">
            <p className="text-2xl font-normal tracking-wide text-[#1A1B1C]">
              Thank you!
            </p>
            <p className="text-lg text-gray-600">Proceed for the next step</p>
          </div>
        )}

        <Image
          src="/images/diamond-large.png"
          alt="Diamond Large"
          width={762}
          height={762}
          priority
          className="absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-[50%] -translate-y-1/2 rotate-190 animate-spin-slow sm:h-[480px] sm:w-[480px] md:h-[762px] md:w-[762px]"
        />
        <Image
          src="/images/diamond-medium.png"
          alt="Diamond Medium"
          width={682}
          height={682}
          priority
          className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-[50%] -translate-y-1/2 rotate-185 animate-spin-slower sm:h-[400px] sm:w-[400px] md:h-[682px] md:w-[682px]"
        />
        <Image
          src="/images/diamond-small.png"
          alt="Diamond Small"
          width={602}
          height={602}
          priority
          className="absolute top-1/2 left-1/2 h-[240px] w-[240px] -translate-x-[50%] -translate-y-1/2 animate-spin-slowest sm:h-[320px] sm:w-[320px] md:h-[602px] md:w-[602px]"
        />
      </div>

      <FooterNav>
        <BackButton href="/" />
        {state.step === 3 && <ProceedButton href="/analysis" show />}
      </FooterNav>
    </div>
  );
}
