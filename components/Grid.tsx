import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { gridItems, techIcons } from "@/data";
import { BentoGridHeader } from "./ui/BentoGridHeader";
import { GlobeDemo } from "./ui/GridGlobe";
import { EmailCopyButton } from "./ui/EmailCopyButton";

const Grid = () => {
  const leftLists = ["Golang (Fiber)", "NestJS", "React.js"];
  const rightLists = ["Next.js", "PostgreSQL", "Docker"];

  return (
    <section id="about">
      <BentoGrid>
        {gridItems.map(
          ({
            id,
            title,
            description,
            className,
            img,
            imgClassName,
            titleClassName,
            spareImg,
          }) => {
            // Customize header slot
            const header = (
              <BentoGridHeader
                img={id !== 5 ? img : undefined}
                imgClassName={imgClassName}
                spareImg={spareImg}
                spareImgClassName={id === 5 ? "w-full opacity-100" : undefined}
                showGradient={id === 6}
              />
            );

            // Customize children slot based on ID
            let children = null;
            if (id === 2) {
              children = <GlobeDemo />;
            } else if (id === 3) {
              children = (
                <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
                  <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                    {leftLists.map((item) => (
                      <span
                        key={item}
                        className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                      >
                        {item}
                      </span>
                    ))}
                    <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]"></span>
                  </div>
                  <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                    <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]"></span>
                    {rightLists.map((item) => (
                      <span
                        key={item}
                        className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            } else if (id === 5) {
              children = (
                <div className="flex flex-wrap justify-center mt-4">
                  {techIcons.map((iconPath, index) => (
                    <img
                      key={index}
                      src={iconPath}
                      alt={`Tech Icon ${index}`}
                      className="w-12 md:w-16 lg:w-20 h-auto p-2 rounded-full mx-1 my-1 bg-white"
                    />
                  ))}
                </div>
              );
            } else if (id === 6) {
              children = (
                <div className="flex justify-center w-full">
                  <EmailCopyButton />
                </div>
              );
            }

            return (
              <BentoGridItem
                key={id}
                title={title}
                description={description}
                className={className}
                titleClassName={titleClassName}
                header={header}
              >
                {children}
              </BentoGridItem>
            );
          }
        )}
      </BentoGrid>
    </section>
  );
};

export default Grid;
