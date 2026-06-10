import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface LottieProps {
  options: {
    loop: boolean;
    autoplay: boolean;
    animationData: unknown;
    rendererSettings?: {
      preserveAspectRatio?: string;
    };
  };
  height?: number | string;
  width?: number | string;
}

export default function LottieSafe({ options, height = "100%", width = "100%" }: LottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: options.loop,
      autoplay: options.autoplay,
      animationData: options.animationData as unknown as object, // Cast required by lottie-web API
      rendererSettings: options.rendererSettings,
    });

    return () => {
      anim.destroy();
    };
  }, [options]);

  return (
    <div
      ref={containerRef}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}
