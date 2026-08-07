"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const weatherData = [
  { label: "Humidity", value: 68 },
  { label: "UV Exposure", value: 54 },
  { label: "Dryness Risk", value: 31 },
  { label: "Pollution Exposure", value: 42 },
];

export default function WeatherHero() {
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
            A.I. ANALYSIS / WEATHER
          </p>

          <h1 className="text-5xl font-light tracking-tight md:text-7xl">
            Weather
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">
            Review the environmental conditions that may influence your skin
            and how it responds throughout the day.
          </p>
        </motion.div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 border-l border-t border-gray-200 lg:grid-cols-2">
          {/* Environment Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="border-b border-r border-gray-200 p-8 md:p-10"
          >
            <p className="text-xs tracking-[0.25em] text-gray-400">
              CURRENT ENVIRONMENT
            </p>

            <h2 className="mt-4 text-4xl font-light md:text-5xl">
              Moderate
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
              Your environmental profile suggests moderate skin stress, with
              humidity and UV exposure having the strongest influence.
            </p>

            <div className="mt-12 space-y-8">
              {weatherData.map((item, index) => (
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
          </motion.div>

          {/* Recommendation Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden border-b border-r border-gray-200 p-8 md:p-10"
          >
            {/* Decorative Diamond */}
            <motion.div
              className="absolute right-[-140px] top-1/2 h-[320px] w-[320px] -translate-y-1/2 rotate-45 border border-gray-100"
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

            <div className="relative z-10">
              <p className="text-xs tracking-[0.25em] text-gray-400">
                RECOMMENDED FOCUS
              </p>

              <h2 className="mt-4 text-4xl font-light md:text-5xl">
                Protect & Hydrate
              </h2>

              <div className="mt-10 space-y-10">
                <Recommendation
                  number="01"
                  title="Daily SPF"
                  text="Use broad-spectrum sunscreen daily to help reduce the impact of UV exposure."
                />

                <Recommendation
                  number="02"
                  title="Hydration Support"
                  text="Use lightweight hydration to help maintain the skin barrier without feeling heavy."
                />

                <Recommendation
                  number="03"
                  title="Gentle Cleansing"
                  text="Remove environmental buildup while preserving your skin's natural moisture balance."
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <Link href="/skin-type">
            <motion.button
              whileHover={{ x: -4 }}
              className="text-xs tracking-[0.25em] text-gray-600 transition hover:text-black"
            >
              ← SKIN TYPE
            </motion.button>
          </Link>

          <Link href="/cosmetic-concerns">
            <motion.button
              whileHover={{ x: 4 }}
              className="text-xs tracking-[0.25em] text-gray-600 transition hover:text-black"
            >
              NEXT: COSMETIC CONCERNS →
            </motion.button>
          </Link>
        </div>
      </div>
    </main>
  );
}

function Recommendation({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="border-t border-gray-200 pt-6">
      <p className="text-xs tracking-[0.25em] text-gray-400">
        {number}
      </p>

      <h3 className="mt-3 text-2xl font-light">
        {title}
      </h3>

      <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
        {text}
      </p>
    </div>
  );
}