"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6">
      {/* Left Decorative Diamond */}
      <motion.div
        className="absolute left-[-180px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rotate-45 border border-gray-200"
        animate={{
          rotate: [45, 48, 45],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Right Decorative Diamond */}
      <motion.div
        className="absolute right-[-180px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rotate-45 border border-gray-200"
        animate={{
          rotate: [45, 42, 45],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <p className="mb-6 text-xs tracking-[0.35em] text-gray-500">
          A.I. POWERED SKIN ANALYSIS
        </p>

        <h1 className="text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl md:text-8xl lg:text-9xl">
          Sophisticated
          <br />
          skincare
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
          Discover a personalized skin analysis experience designed to help
          you better understand your skin and its unique characteristics.
        </p>

        <div className="mt-12 flex justify-center">
          <Link href="/intro">
            <motion.button
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="border border-black px-8 py-4 text-xs tracking-[0.25em] transition hover:bg-black hover:text-white"
            >
              ENTER EXPERIENCE
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Bottom Left Label */}
      <div className="absolute bottom-8 left-8 hidden text-xs tracking-[0.2em] text-gray-400 md:block">
        INTELLIGENT SKINCARE
      </div>

      {/* Bottom Right Label */}
      <div className="absolute bottom-8 right-8 hidden text-xs tracking-[0.2em] text-gray-400 md:block">
        AI ANALYSIS
      </div>
    </main>
  );
}