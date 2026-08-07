"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import LoadingDots from "@/app/components/LoadingDots";
import { BackButton, FooterNav, ProceedButton } from "@/app/components/NavButtons";
import { useToast } from "@/app/components/Toast";
import { submitPhaseTwo, toRawBase64 } from "@/lib/api";
import { setLocalItem, STORAGE_KEYS } from "@/lib/storage";

async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const max = 1200;
        let { width, height } = img;
        if (width > max || height > max) {
          if (width > height) {
            height = Math.round((height * max) / width);
            width = max;
          } else {
            width = Math.round((width * max) / height);
            height = max;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = reject;
      img.src = String(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Photo options — camera permission modal + gallery upload (wandag /result) */
export default function AnalysisHero() {
  const router = useRouter();
  const { showToast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [ready, setReady] = useState(false);

  async function analyzeImage(dataUrl: string) {
    setAnalyzing(true);
    try {
      const raw = toRawBase64(dataUrl);
      setLocalItem(STORAGE_KEYS.uploadedImage, dataUrl);
      const result = await submitPhaseTwo(raw);
      if (result.success && result.data) {
        setLocalItem(
          STORAGE_KEYS.demographicData,
          JSON.stringify(result.data),
        );
        setReady(true);
        showToast("Image analyzed successfully.", "success");
        router.push("/results");
      } else {
        throw new Error(result.message || "API returned unsuccessful response");
      }
    } catch {
      showToast("Failed to analyze image. Please try again.", "error");
      setReady(false);
    } finally {
      setAnalyzing(false);
    }
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImage(file);
      setPreview(dataUrl);
      await analyzeImage(dataUrl);
    } catch {
      showToast("Failed to process the image. Please try again.", "error");
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-white">
      <div className="absolute top-16 left-9 z-20 text-left">
        <p className="text-xs font-semibold tracking-wide">TO START ANALYSIS</p>
      </div>

      <div
        className={`relative mx-auto flex min-h-[78vh] w-full max-w-6xl flex-col items-center justify-center px-4 pt-6 md:block md:h-[72vh] md:pt-0 ${
          showModal ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <div className="relative -translate-y-[1%] flex flex-col items-center justify-center md:absolute md:left-[55%] md:-translate-x-full md:-translate-y-[0%] lg:left-[50%] xl:left-[40%]">
          <div className="relative h-[270px] w-[270px] md:h-[482px] md:w-[482px]">
            <Image
              src="/images/res-diamond-large.png"
              alt=""
              width={482}
              height={482}
              priority
              className="absolute top-1/2 left-1/2 h-[270px] w-[270px] -translate-x-[50%] -translate-y-1/2 rotate-200 animate-spin-slow object-contain md:h-[482px] md:w-[482px]"
            />
            <Image
              src="/images/res-diamond-medium.png"
              alt=""
              width={444}
              height={444}
              className="absolute top-1/2 left-1/2 h-[230px] w-[230px] -translate-x-[50%] -translate-y-1/2 rotate-190 animate-spin-slower object-contain md:h-[444.34px] md:w-[444.34px]"
            />
            <Image
              src="/images/res-diamond-small.png"
              alt=""
              width={405}
              height={405}
              className="absolute top-1/2 left-1/2 h-[190px] w-[190px] -translate-x-[50%] -translate-y-1/2 animate-spin-slowest object-contain md:h-[405.18px] md:w-[405.18px]"
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="absolute h-[100px] w-[100px] cursor-pointer duration-700 ease-in-out hover:scale-108 md:h-[136px] md:w-[136px]"
                aria-label="Allow A.I. to scan your face"
              >
                <Image
                  src="/images/camera-icon.png"
                  alt=""
                  width={136}
                  height={136}
                  className="h-full w-full"
                />
              </button>
            </div>
          </div>

          <div className="absolute right-[90px] bottom-[1%] translate-y-[-20px] md:top-[30.9%] md:right-[-12px]">
            <div className="flex items-center gap-2">
              <div className="text-left text-sm leading-tight font-semibold uppercase">
                <p>ALLOW A.I.</p>
                <p>TO SCAN YOUR FACE</p>
              </div>
            </div>
          </div>
          <Image
            src="/images/scan-line.png"
            alt=""
            width={66}
            height={12}
            className="absolute hidden md:top-[20px] md:right-[143px] md:block"
          />
        </div>

        <div
          className={`relative mt-12 flex -translate-y-[10%] flex-col items-center justify-center transition-opacity duration-300 md:absolute md:left-[45%] md:mt-0 md:-translate-y-[0%] lg:left-[50%] xl:left-[55%] ${
            analyzing ? "opacity-40" : ""
          }`}
        >
          <div className="absolute top-[-75px] right-7 transition-opacity duration-300 md:top-[-50px] md:right-8">
            <p className="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Preview
            </p>
            <div className="h-24 w-24 overflow-hidden border border-gray-300 md:h-32 md:w-32">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Upload preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-50 text-[10px] text-gray-400">
                  No image
                </div>
              )}
            </div>
          </div>

          <div className="relative h-[270px] w-[270px] md:h-[482px] md:w-[482px]">
            <Image
              src="/images/res-diamond-large.png"
              alt=""
              width={482}
              height={482}
              className={`absolute top-1/2 left-1/2 h-[270px] w-[270px] -translate-x-[50%] -translate-y-1/2 rotate-205 object-contain md:h-[482px] md:w-[482px] ${
                analyzing ? "animate-spin-load" : "animate-spin-slow"
              }`}
            />
            <Image
              src="/images/res-diamond-medium.png"
              alt=""
              width={444}
              height={444}
              className={`absolute top-1/2 left-1/2 h-[230px] w-[230px] -translate-x-[50%] -translate-y-1/2 rotate-195 object-contain md:h-[444.34px] md:w-[444.34px] ${
                analyzing ? "animate-spin-loader" : "animate-spin-slower"
              }`}
            />
            <Image
              src="/images/res-diamond-small.png"
              alt=""
              width={405}
              height={405}
              className={`absolute top-1/2 left-1/2 h-[190px] w-[190px] -translate-x-[50%] -translate-y-1/2 object-contain md:h-[405.18px] md:w-[405.18px] ${
                analyzing ? "animate-spin-loadest" : "animate-spin-slowest"
              }`}
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={analyzing}
                className="absolute h-[100px] w-[100px] cursor-pointer duration-700 ease-in-out hover:scale-108 disabled:cursor-not-allowed md:h-[136px] md:w-[136px]"
                aria-label="Allow A.I. access gallery"
              >
                <Image
                  src="/images/gallery-icon.png"
                  alt=""
                  width={136}
                  height={136}
                  className="h-full w-full"
                />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />
            </div>
          </div>

          <div className="absolute top-[75%] translate-y-[-10px] md:top-[70%] md:left-[17px]">
            <div className="text-right text-sm leading-tight font-semibold uppercase md:text-left">
              <p>ALLOW A.I.</p>
              <p>ACCESS GALLERY</p>
            </div>
          </div>
          <Image
            src="/images/gallery-line.png"
            alt=""
            width={66}
            height={12}
            className="absolute hidden md:bottom-[39px] md:left-[120px] md:block"
          />
        </div>
      </div>

      <FooterNav>
        <BackButton href="/intro" />
        {ready && <ProceedButton href="/results" />}
      </FooterNav>

      {showModal && (
        <div className="absolute top-1/2 left-1/2 z-50 w-[352px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 md:top-[43%] md:left-[360px] md:translate-x-0 md:translate-y-0">
          <div className="bg-[#1A1B1C] pt-4 pb-2">
            <h2 className="mb-12 pl-4 text-base leading-[24px] font-semibold text-[#FCFCFC]">
              ALLOW A.I. TO ACCESS YOUR CAMERA
            </h2>
            <div className="mt-4 flex border-t border-[#FCFCFC] pt-2">
              <button
                type="button"
                className="cursor-pointer px-7 text-sm leading-4 font-normal tracking-tight text-[#fcfcfca1] hover:text-gray-500 md:translate-x-45"
                onClick={() => setShowModal(false)}
              >
                DENY
              </button>
              <button
                type="button"
                className="cursor-pointer px-5 text-sm leading-4 font-semibold tracking-tight text-[#FCFCFC] hover:text-gray-300 md:translate-x-45"
                onClick={() => {
                  setShowModal(false);
                  router.push("/camera");
                }}
              >
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}

      {analyzing && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/80">
          <div className="bg-white p-6">
            <LoadingDots label="PREPARING YOUR ANALYSIS..." />
          </div>
        </div>
      )}
    </div>
  );
}
