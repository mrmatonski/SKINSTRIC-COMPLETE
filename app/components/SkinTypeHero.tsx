"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const skinTypeData = [
  { label: "Combination", value: 78 },
  { label: "Oily", value: 12 },
  { label: "Normal", value: 7 },
  { label: "Dry", value: 3 },
];

export default function SkinTypeHero() {
  const score = 78;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <main className="min-h-screen bg-white px-6 pb-12 pt-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mb-4 text-xs tracking-[0.35em] text-gray-500">
            A.I. ANALYSIS / SKIN TYPE
          </p>

          <h1 className="text-5xl font-light tracking-tight md:text-7xl">
            Skin Type
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">
            Review your predicted skin type and the confidence levels associated
            with each skin characteristic.
          </p>
        </motion.div>

        {/* Dashboard */}
        <div className="grid grid-cols-1 border-l border-t border-gray-200 lg:grid-cols-[1fr_1fr]">
          {/* Circular Visualization */}
          <div className="relative flex min-h-[540px] items-center justify-center overflow-hidden border-b border-r border-gray-200 p-8">
            {/* Decorative Diamond */}
            <motion.div
              className="absolute h-[360px] w-[360px] rotate-45 border border-gray-100"
              animate={{
                rotate: [45, 48, 45],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 flex h-[330px] w-[330px] items-center justify-center"
            >
              <svg
                className="h-full w-full -rotate-90"
                viewBox="0 0 220 220"
              >
                {/* Background Circle */}
                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />

                {/* Animated Circle */}
                <motion.circle
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="none"
                  stroke="black"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{
                    strokeDashoffset: circumference,
                  }}
                  animate={{
                    strokeDashoffset: offset,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                />
              </svg>

              {/* Center Text */}
              <div className="absolute text-center">
                <p className="text-6xl font-light md:text-7xl">
                  {score}%
                </p>

                <p className="mt-3 text-xs tracking-[0.25em] text-gray-500">
                  CONFIDENCE
                </p>

                <p className="mt-5 text-xl font-light">
                  Combination
                </p>
              </div>
            </motion.div>
          </div>

          {/* Detail Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="border-b border-r border-gray-200 p-8 md:p-10"
          >
            <p className="text-xs tracking-[0.25em] text-gray-400">
              PRIMARY SKIN TYPE
            </p>

            <h2 className="mt-4 text-4xl font-light md:text-5xl">
              Combination
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
              Your analysis indicates a combination skin profile, meaning
              different areas of the face may show both oily and dry
              characteristics.
            </p>

            {/* Confidence Breakdown */}
            <div className="mt-12 space-y-8">
              {skinTypeData.map((item, index) => (
                <div key={item.label}>
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>

                  <div className="h-px w-full bg-gray-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{
                        duration: 0.9,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      className="h-px bg-black"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Insight */}
            <div className="mt-12 border-t border-gray-200 pt-8">
              <p className="mb-3 text-xs tracking-[0.25em] text-gray-400">
                SKIN INSIGHT
              </p>

              <p className="max-w-lg text-sm leading-7 text-gray-600">
                Combination skin often benefits from balancing hydration while
                avoiding products that are overly heavy or stripping.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <Link href="/demographics">
            <motion.button
              whileHover={{ x: -4 }}
              className="text-xs tracking-[0.25em] text-gray-600 transition hover:text-black"
            >
              ← DEMOGRAPHICS
            </motion.button>
          </Link>

          <Link href="/weather">
            <motion.button
              whileHover={{ x: 4 }}
              className="text-xs tracking-[0.25em] text-gray-600 transition hover:text-black"
            >
              NEXT: WEATHER →
            </motion.button>
          </Link>
        </div>
      </div>
    </main>
  );
}