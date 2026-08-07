"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoadingDots from "@/app/components/LoadingDots";
import { BackButton } from "@/app/components/NavButtons";
import { useToast } from "@/app/components/Toast";
import { submitPhaseTwo, toRawBase64 } from "@/lib/api";
import { setLocalItem, STORAGE_KEYS } from "@/lib/storage";

export default function CameraCapturePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [ready, setReady] = useState(false);
  const [captured, setCaptured] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let active = true;
    async function start() {
      try {
        const media = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (!active) {
          media.getTracks().forEach((t) => t.stop());
          return;
        }
        setStream(media);
      } catch {
        setError("Camera access was denied or unavailable.");
        showToast("Camera access failed. Redirecting…", "error");
        window.setTimeout(() => router.push("/analysis"), 3000);
      }
    }
    void start();
    return () => {
      active = false;
    };
  }, [router, showToast]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !stream) return;
    video.srcObject = stream;
    const onLoaded = async () => {
      try {
        await video.play();
        setReady(true);
      } catch {
        setError("Unable to start the camera preview.");
      }
    };
    video.addEventListener("loadedmetadata", onLoaded);
    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      stream.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  function capture() {
    setError(null);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !ready || !video.videoWidth || !video.videoHeight) {
      setError("Camera is not ready yet. Please wait a moment.");
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Could not capture frame.");
      return;
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setCaptured(canvas.toDataURL("image/jpeg", 0.85));
  }

  async function usePhoto() {
    if (!captured) {
      setError("No image captured");
      return;
    }
    setUploading(true);
    try {
      setLocalItem(STORAGE_KEYS.uploadedImage, captured);
      const result = await submitPhaseTwo(toRawBase64(captured));
      if (result.success && result.data) {
        setLocalItem(
          STORAGE_KEYS.demographicData,
          JSON.stringify(result.data),
        );
        showToast("Image analyzed successfully.", "success");
        router.push("/results");
      } else {
        throw new Error(result.message || "API returned unsuccessful response");
      }
    } catch {
      setError("Failed to analyze image. Please try again.");
      showToast("Failed to analyze image. Please try again.", "error");
    } finally {
      setUploading(false);
    }
  }

  async function retake() {
    setCaptured(null);
    setError(null);
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(media);
      setReady(false);
    } catch {
      setError("Could not restart the camera.");
    }
  }

  return (
    <div className="relative h-[92vh] w-screen overflow-hidden bg-gray-900">
      {!stream && !captured && !error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <p className="max-w-md text-center text-[#FCFCFC]">
            Initializing camera, please wait...
          </p>
        </div>
      )}

      {stream && !captured && (
        <div className="absolute inset-0 z-10">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute right-8 bottom-24 z-20 flex items-center gap-3">
            <span className="hidden text-sm leading-[14px] font-normal text-[#FCFCFC] sm:block">
              TAKE PICTURE
            </span>
            <button
              type="button"
              onClick={capture}
              className="transform duration-300 ease-in-out hover:scale-105"
              aria-label="Take picture"
            >
              <Image
                src="/images/take-picture.png"
                alt=""
                width={60}
                height={60}
                className="h-16 w-16 cursor-pointer"
              />
            </button>
          </div>
          <div className="absolute bottom-40 left-1/2 z-20 w-full max-w-lg -translate-x-1/2 px-4 text-center">
            <p className="mb-2 text-sm leading-6 font-normal text-[#FCFCFC]">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-[#FCFCFC] uppercase">
              <span>◇ NEUTRAL EXPRESSION</span>
              <span>◇ FRONTAL POSE</span>
              <span>◇ ADEQUATE LIGHTING</span>
            </div>
          </div>
        </div>
      )}

      {captured && (
        <div className="absolute inset-0 z-10 flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={captured}
            alt="Captured selfie"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <p className="absolute top-40 text-sm leading-6 text-[#FCFCFC] uppercase">
            GREAT SHOT!
          </p>
          <div className="absolute bottom-32 z-20 flex justify-center space-x-6">
            <button
              type="button"
              onClick={retake}
              className="cursor-pointer bg-white px-6 py-2 text-sm shadow-md hover:bg-gray-300"
            >
              Retake
            </button>
            <button
              type="button"
              onClick={usePhoto}
              disabled={uploading}
              className="cursor-pointer bg-[#1A1B1C] px-6 py-2 text-sm text-[#FCFCFC] hover:bg-gray-800 disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Use This Photo"}
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className="absolute bottom-8 left-8 z-20 md:bottom-8">
        <BackButton href="/analysis" light />
      </div>

      {error && (
        <div className="absolute top-20 left-1/2 z-30 max-w-md -translate-x-1/2 bg-red-600/90 px-4 py-2 text-sm text-white">
          {error}
        </div>
      )}

      {uploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white p-6">
            <LoadingDots label="ANALYZING IMAGE..." />
          </div>
        </div>
      )}
    </div>
  );
}
