"use client";
import React from "react";
import Lottie from "react-lottie-player";

import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("react-lottie-player"), {
  ssr: false,
});

interface LottiePlayerProps {
  lottie: object;
}

const LottiePlayer = ({ lottie }: LottiePlayerProps) => {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <DynamicLottie className="w-50" loop={false} animationData={lottie} play />
  );
};

export default LottiePlayer;
