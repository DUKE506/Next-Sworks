"use client";
import React from "react";
import Lottie from "react-lottie-player";
import CheckLottieJson from "../../../../../../../../public/CheckLottie.json";
import dynamic from "next/dynamic";

const LottiePlayer = () => {
  return <Lottie loop animationData={CheckLottieJson} play />;
};

export default LottiePlayer;
