import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div id="home" className="pb-20 pt-10">
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

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            I am a <span className="text-purple">Full Stack Engineer</span> specializing in React, Next.js, and TypeScript on the frontend, and Go (Fiber, Chi) on the backend. I build products end to end — from responsive UIs and scoring systems to REST APIs and deployments on DigitalOcean with Nginx and PostgreSQL. Open to discussing React and Go architecture, performance, or ed-tech and health-tech collaborations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
