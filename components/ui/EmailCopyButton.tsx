"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { IoCopyOutline } from "react-icons/io5";
import animationData from "@/data/confetti.json";
import BorderMagicButton from "./BorderMagicButton";

const Lottie = dynamic(() => import("./LottieSafe"), { ssr: false });

export const EmailCopyButton = () => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "farhanalwahid10@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div className="mt-5 relative">
      <div className="absolute -bottom-5 right-0 block">
        {mounted && (
          <Lottie
            options={defaultOptions}
            height={200}
            width={400}
          />
        )}
      </div>

      <BorderMagicButton
        title={copied ? "Email is Copied!" : "Copy my email address"}
        icon={<IoCopyOutline />}
        position="left"
        handleClick={handleCopy}
        otherClasses="!bg-[#161A31]"
      />
    </div>
  );
};
