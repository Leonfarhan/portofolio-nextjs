import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div className="pb-20 pt-10">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      
      <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.05] bg-grid-black/[0.02] absolute flex items-center justify-center top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"/> 
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-2-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
            <TextGenerateEffect
                className="text-center text-[40px] md:text-5xl lg:text-6xl"
                words="Hi, I'm Farhan Alwahid"
            />

          <p className="text-center">
            A Computer Science graduate from Pertamina University seeking <span className="text-purple"> Software Engineer </span> roles,
              particularly in Front-End development. I&apos;m passionate about building user-friendly applications using React,
              Next.js, and Tailwind CSS.  My experience includes full-stack development with technologies like FastAPI, MongoDB, and Python,
              including integrating machine learning.  I honed my skills at PT Pupuk Indonesia, tackling complex software challenges.
              Explore my portfolio to see how I can contribute to your team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
