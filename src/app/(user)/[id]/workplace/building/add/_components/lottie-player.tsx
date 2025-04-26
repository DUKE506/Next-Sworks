"use client";
import React from "react";
import Lottie from "react-lottie-player";
import CheckLottieJson from "../../../../../../../../public/CheckLottie.json";

const LottiePlayer = () => {
  return <Lottie className="w-50" loop={false} animationData={CheckLottieJson} play />;
};

export default LottiePlayer;
