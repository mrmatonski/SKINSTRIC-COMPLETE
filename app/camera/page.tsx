"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingDots from "@/app/components/LoadingDots";

export default function CameraSetupPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/camera/capture");
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex min-h-[90vh] flex-col items-center justify-center bg-white">
      <div className="relative flex h-[320px] w-[320px] items-center justify-center md:h-[420px] md:w-[420px]">
        <Image
          src="/images/res-diamond-large.png"
          alt=""
          width={482}
          height={482}
          className="absolute top-1/2 left-1/2 h-full w-full -translate-x-[50%] -translate-y-1/2 animate-spin-slowest object-contain"
        />
        <Image
          src="/images/res-diamond-medium.png"
          alt=""
          width={444}
          height={444}
          className="absolute top-1/2 left-1/2 h-[90%] w-[90%] -translate-x-[50%] -translate-y-1/2 animate-spin-loader object-contain"
        />
        <Image
          src="/images/res-diamond-small.png"
          alt=""
          width={405}
          height={405}
          className="absolute top-1/2 left-1/2 h-[80%] w-[80%] -translate-x-[50%] -translate-y-1/2 animate-spin-loadest object-contain"
        />
        <Image
          src="/images/camera-icon.png"
          alt=""
          width={136}
          height={136}
          className="relative z-10"
        />
      </div>

      <div className="mt-8">
        <LoadingDots label="SETTING UP CAMERA ..." />
      </div>

      <div className="absolute bottom-16 text-center">
        <p className="mb-3 text-xs font-semibold tracking-wide text-gray-500 uppercase">
          TO GET BETTER RESULTS MAKE SURE TO HAVE
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase">
          <span>◇ NEUTRAL EXPRESSION</span>
          <span>◇ FRONTAL POSE</span>
          <span>◇ ADEQUATE LIGHTING</span>
        </div>
      </div>
    </div>
  );
}
