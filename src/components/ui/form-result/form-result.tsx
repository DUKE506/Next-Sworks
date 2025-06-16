import LottiePlayer from "@/app/(user)/user/workplace/building/add/_components/lottie-player";
import React from "react";
import { Button } from "../button";
import { useRouter } from "next/navigation";

interface FormResultProps {
  result: boolean;
  successTitle: string;
  failTitle: string;
  successDescription: string;
  failDescription: string;
  url: string;
}

const FormResult = ({
  result,
  successTitle,
  failTitle,
  successDescription,
  failDescription,
  url,
}: FormResultProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col  justify-center items-center flex-1 h-full ">
      <div className="flex flex-col gap-4 justify-center items-center flex-1">
        <LottiePlayer />
        <span className="text-xl font-bold text-green-500">
          {result ? successTitle : failTitle}
        </span>
        <span>{result ? successDescription : failDescription}</span>
      </div>
      <div className="w-full flex justify-end">
        <Button
          className={
            "text-xs rounded-sm bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"
          }
          onClick={() => router.push(url)}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default FormResult;
