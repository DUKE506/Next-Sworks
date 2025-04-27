"use client";
import React from "react";
import Lottie from "react-lottie-player";
import CheckLottieJson from "../../../../../../../../public/CheckLottie.json";
import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("react-lottie-player"), {
  ssr: false,
});

const LottiePlayer = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <DynamicLottie
      className="w-50"
      loop={false}
      animationData={CheckLottieJson}
      play
    />
  );
};

export default LottiePlayer;
