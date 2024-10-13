"use client"
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/CanvasRevealEffect";

const Sdlc = () => {
    return (
        <section className="w-full py-20">
            <h1 className="heading">
                My <span className="text-purple"> Software Development Life Cycle </span>
            </h1>
            <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4">
                {/* add des prop */}
                <Card
                    title="Agile"
                    icon={<AceternityIcon order="Agile" />}
                    des={`As team lead for "Learning Skill," a software project enabling free skill and knowledge exchange within a community, we used an Agile SDLC.  Working in short sprints, we prioritized flexibility and user feedback, adapting to evolving needs.  Daily stand-ups and continuous testing ensured a collaborative environment and high-quality product.  This iterative approach facilitated the successful delivery of a platform promoting skill-sharing and community building.`}
                >
                    <CanvasRevealEffect
                        animationSpeed={5.1}
                        containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
                    />
                </Card>
                <Card
                    title="Waterfall"
                    icon={<AceternityIcon order="Waterfall" />}
                    des={`For my thesis, "Implementation of a Waterfall SDLC Model in Developing a Web-Based Graduation Time Prediction System for Computer Science Students," I used the Waterfall methodology. After initial modeling, I gathered requirements through questionnaires and interviews. The system was then designed, implemented, and rigorously tested. While Waterfall's structure aided project management, its rigidity posed challenges to incorporating late-stage changes. Despite this, the project successfully delivered a functional graduation time prediction system.`}
                >
                    <CanvasRevealEffect
                        animationSpeed={3}
                        containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
                        colors={[[125, 211, 252]]}
                    />
                </Card>
            </div>
        </section>
    );
};

export default Sdlc;

const Card = ({
                  title,
                  icon,
                  children,
                  // add this one for the desc
                  des,
              }: {
    title: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    des: string;
}) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="border border-black/[0.2] group/canvas-card flex items-center justify-center
       dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative lg:h-[35rem] rounded-3xl "
            style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                    "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
        >
            <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-30" />
            <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30" />
            <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-30" />
            <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30" />

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full absolute inset-0"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-20 px-10">
                <div
                    // add this for making it center
                    // absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                    className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
        group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 mx-auto flex items-center justify-center"
                >
                    {icon}
                </div>
                <h2
                    // change text-3xl, add text-center
                    className="dark:text-white text-center text-3xl opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white
         group-hover/canvas-card:-translate-y-2 transition duration-200"
                >
                    {title}
                </h2>
                <p
                    className="text-sm opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 mt-4 group-hover/canvas-card:text-white text-center
         group-hover/canvas-card:-translate-y-2 transition duration-200"
                    style={{ color: "#E4ECFF" }}
                >
                    {des}
                </p>
            </div>
        </div>
    );
};

// add order prop for the Phase number change
const AceternityIcon = ({ order }: { order: string }) => {
    return (
        <div>
            <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                {order}
            </button>
        </div>
    );
};

export const Icon = ({ className, ...rest }: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );
};