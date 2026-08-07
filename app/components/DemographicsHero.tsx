"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BackButton, ProceedButton } from "@/app/components/NavButtons";
import {
  processDemographicData,
  type DemographicData,
  type DemographicOption,
  type RawDemographicPayload,
} from "@/lib/demographics";
import { getLocalItem, setLocalItem, STORAGE_KEYS } from "@/lib/storage";

type TabKey = "race" | "age" | "sex";
type Corrections = Partial<Record<TabKey, string>>;

const AGE_ORDER = [
  "0-2",
  "3-9",
  "10-19",
  "20-29",
  "30-39",
  "40-49",
  "50-59",
  "60-69",
  "70+",
];

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("skinstric-demographics", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("skinstric-demographics", handler);
  };
}

function getSnapshot() {
  return JSON.stringify({
    data: getLocalItem(STORAGE_KEYS.demographicData),
    corrections: getLocalItem(STORAGE_KEYS.demographicCorrections),
  });
}

function getServerSnapshot() {
  return JSON.stringify({ data: null, corrections: null });
}

function parseStored(raw: string | null): DemographicData | null {
  if (!raw) return null;
  try {
    return processDemographicData(JSON.parse(raw) as RawDemographicPayload);
  } catch {
    return null;
  }
}

function parseCorrections(raw: string | null): Corrections {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Corrections;
  } catch {
    return {};
  }
}

function applyCorrections(
  base: DemographicData,
  corrections: Corrections,
): DemographicData {
  const next: DemographicData = {
    race: { ...base.race },
    age: { ...base.age },
    sex: { ...base.sex },
  };
  (["race", "age", "sex"] as TabKey[]).forEach((key) => {
    const name = corrections[key];
    if (!name) return;
    const option = base[key].options.find((o) => o.name === name);
    if (!option) return;
    next[key] = {
      ...base[key],
      prediction: option.name,
      confidence: option.confidence,
    };
  });
  return next;
}

function sortedOptions(tab: TabKey, options: DemographicOption[]) {
  if (tab !== "age") return options;
  return [...options].sort(
    (a, b) => AGE_ORDER.indexOf(a.name) - AGE_ORDER.indexOf(b.name),
  );
}

/** Demographics summary from Phase Two data (wandag /summary) */
export default function DemographicsHero() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const parsed = useMemo(() => {
    const { data, corrections } = JSON.parse(snapshot) as {
      data: string | null;
      corrections: string | null;
    };
    return {
      base: parseStored(data),
      corrections: parseCorrections(corrections),
    };
  }, [snapshot]);

  const [localCorrections, setLocalCorrections] = useState<Corrections | null>(
    null,
  );
  const [active, setActive] = useState<TabKey>("race");

  const corrections = localCorrections ?? parsed.corrections;
  const data = parsed.base ? applyCorrections(parsed.base, corrections) : null;
  const current = data?.[active];
  const options = current ? sortedOptions(active, current.options) : [];

  function selectOption(tab: TabKey, option: DemographicOption) {
    setLocalCorrections((prev) => {
      const next = { ...(prev ?? parsed.corrections), [tab]: option.name };
      setLocalItem(STORAGE_KEYS.demographicCorrections, JSON.stringify(next));
      window.dispatchEvent(new Event("skinstric-demographics"));
      return next;
    });
  }

  return (
    <div className="flex h-screen flex-col md:mt-5 md:h-[90vh]">
      <main className="w-full flex-1 overflow-auto bg-white md:overflow-hidden">
        <div className="mx-5 flex max-w-full flex-col px-4 md:h-full md:px-auto">
          <div className="mb-4 ml-4 text-start md:mb-10 md:ml-0">
            <h2 className="mb-1 text-base leading-[24px] font-semibold md:text-base">
              A.I. ANALYSIS
            </h2>
            <h3 className="text-4xl leading-[64px] font-normal tracking-tighter md:text-[72px]">
              DEMOGRAPHICS
            </h3>
            <h4 className="mt-2 text-sm leading-[24px]">
              PREDICTED RACE &amp; AGE
            </h4>
          </div>

          {!data && (
            <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
              <p className="mb-4 text-xl">
                No analysis data found. Please upload an image first.
              </p>
              <Link
                href="/analysis"
                className="rounded bg-black px-6 py-2 text-white hover:bg-gray-800"
              >
                Go to Upload Page or take a Picture with your device
              </Link>
            </div>
          )}

          {data && current && (
            <div className="mb-40 mt-10 grid gap-4 pb-0 md:mb-0 md:grid-cols-[1.5fr_8.5fr_3.15fr] md:gap-4 md:pb-0">
              <div className="h-[62%] space-y-3 bg-white md:flex md:flex-col">
                {(["race", "age", "sex"] as TabKey[]).map((key) => {
                  const selected = active === key;
                  return (
                    <div
                      key={key}
                      role="button"
                      tabIndex={0}
                      onClick={() => setActive(key)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setActive(key);
                      }}
                      className={`cursor-pointer border-t p-3 ${
                        selected
                          ? "bg-[#1A1B1C] text-white hover:bg-black"
                          : "bg-[#F3F3F4]"
                      } flex flex-1 flex-col justify-between hover:bg-[#E1E1E2]`}
                    >
                      <p className="text-base font-semibold">
                        {data[key].prediction}
                      </p>
                      <h4 className="mb-1 text-base font-semibold">
                        {key.toUpperCase()}
                      </h4>
                    </div>
                  );
                })}
              </div>

              <div className="relative flex flex-col items-center justify-center bg-gray-100 p-4 md:h-[57vh] md:border-t">
                {active === "race" && (
                  <p className="top-2 left-5 mb-2 hidden text-[40px] md:absolute md:block">
                    {data.race.prediction}
                  </p>
                )}
                {active === "age" && (
                  <p className="top-4 left-7 mb-2 hidden text-[40px] md:absolute md:block">
                    {data.age.prediction} y.o.
                  </p>
                )}
                {active === "sex" && (
                  <p className="top-4 left-7 mb-2 hidden text-[40px] md:absolute md:block">
                    {data.sex.prediction}
                  </p>
                )}

                <div className="relative mb-4 aspect-square w-full max-w-[384px] md:absolute md:right-5 md:bottom-2">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "384px",
                      position: "relative",
                      transform: "scale(1)",
                      transformOrigin: "center",
                    }}
                  >
                    <CircularProgressbar
                      value={current.confidence}
                      strokeWidth={1.7}
                      className="text-[#1A1B1C]"
                      styles={buildStyles({
                        pathColor: "#1A1B1C",
                        textColor: "#1A1B1C",
                        pathTransitionDuration: 0.8,
                        strokeLinecap: "butt",
                        textSize: "14px",
                      })}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-3xl font-normal md:text-[40px]">
                        {current.confidence}
                        <span className="absolute text-xl md:text-3xl">%</span>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mb-1 text-xs leading-[24px] font-normal text-[#A0A4AB] md:absolute md:bottom-[-15%] md:left-[22%] md:text-sm lg:left-[30%] lg:text-base xl:left-[40%] 2xl:left-[45%]">
                  If A.I. estimate is wrong, select the correct one.
                </p>
              </div>

              <div className="bg-gray-100 pt-4 pb-4 md:border-t">
                <div className="space-y-0">
                  <div className="flex justify-between px-4">
                    <h4 className="mb-2 text-base leading-[24px] font-medium tracking-tight">
                      {active.toUpperCase()}
                    </h4>
                    <h4 className="mb-2 text-base leading-[24px] font-medium tracking-tight">
                      A.I. CONFIDENCE
                    </h4>
                  </div>
                  {options.map((option) => {
                    const isActive = option.name === current.prediction;
                    return (
                      <div
                        key={option.name}
                        role="button"
                        tabIndex={0}
                        onClick={() => selectOption(active, option)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            selectOption(active, option);
                          }
                        }}
                        className={`flex h-[48px] cursor-pointer items-center justify-between px-4 hover:bg-[#E1E1E2] ${
                          isActive
                            ? "bg-[#1A1B1C] text-white hover:bg-black"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Image
                            src={
                              isActive
                                ? "/images/radio-active.png"
                                : "/images/radio.png"
                            }
                            alt="radio button"
                            width={12}
                            height={12}
                            className="mr-2 h-[12px] w-[12px]"
                          />
                          <span className="text-base leading-6 font-normal tracking-tight">
                            {option.name}
                          </span>
                        </div>
                        <span className="text-base leading-6 font-normal tracking-tight">
                          {option.confidence}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="sticky bottom-40 mb-8 bg-white pt-4 pb-6 md:static md:bottom-0 md:mb-16 md:pt-[37px]">
            <div className="mx-auto flex max-w-full justify-between px-4 md:px-0">
              <BackButton href="/results" />
              <ProceedButton href="/" label="HOME" mobileLabel="HOME" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
