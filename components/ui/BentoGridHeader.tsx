import React from "react";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./BackgroundGradientAnimation";

interface BentoGridHeaderProps {
  img?: string;
  imgClassName?: string;
  spareImg?: string;
  spareImgClassName?: string;
  showGradient?: boolean;
}

export const BentoGridHeader = ({
  img,
  imgClassName,
  spareImg,
  spareImgClassName,
  showGradient,
}: BentoGridHeaderProps) => {
  return (
    <>
      <div className="w-full h-full absolute">
        {img && (
          <img
            src={img}
            alt={img}
            className={cn(imgClassName, "object-cover object-center")}
          />
        )}
      </div>
      <div className={cn("absolute right-0 -bottom-5", spareImgClassName)}>
        {spareImg && (
          <img
            src={spareImg}
            alt={spareImg}
            className="object-cover object-center w-full h-full"
          />
        )}
      </div>
      {showGradient && (
        <BackgroundGradientAnimation>
          <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
        </BackgroundGradientAnimation>
      )}
    </>
  );
};
