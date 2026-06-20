import { projects } from "@/data";
import { PinContainer } from "./ui/3d-pin";
import Image from "next/image";

const Projects = () => {
    return (
        <section className="py-20">
            <h1 id="projects" className="heading">
                Some of the <span className="text-purple">projects</span> I&apos;ve done
            </h1>
            <div className="mt-10 grid grid-cols-1 justify-items-center gap-x-12 gap-y-16 p-4 lg:grid-cols-2">
                {projects.map((item) => (
                    <div
                        className="flex h-[34rem] w-full max-w-96 items-center justify-center"
                        key={item.id}
                    >
                        <PinContainer title="View repo" href={item.link}>
                            <article className="flex h-[30rem] w-[80vw] max-w-96 flex-col">
                                <div className="group/image relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/5 bg-[#13162D] transition-all duration-500 group-hover/pin:border-purple/30 group-hover/pin:shadow-[0_0_20px_rgba(203,172,249,0.15)]">
                                    <Image
                                        src="/bg.png"
                                        alt=""
                                        aria-hidden="true"
                                        fill
                                        sizes="(min-width: 1024px) 384px, 80vw"
                                        className="object-cover opacity-20 transition-all duration-500 group-hover/pin:opacity-40"
                                    />
                                    <Image
                                        src={item.img}
                                        alt={`${item.title} project preview`}
                                        fill
                                        sizes="(min-width: 1024px) 384px, 80vw"
                                        className="z-10 object-cover transition-transform duration-700 ease-out group-hover/pin:scale-105"
                                    />
                                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover/pin:opacity-30" />
                                </div>

                                <h1 className="h-[3.5rem] overflow-hidden text-base font-bold leading-snug tracking-tight text-white line-clamp-2 md:text-xl lg:text-2xl transition-colors duration-300 group-hover/pin:text-purple">
                                    {item.title}
                                </h1>

                                <p
                                    className="mt-2 h-[4.5rem] overflow-hidden line-clamp-3 text-xs font-normal leading-relaxed lg:text-sm"
                                    style={{ color: "#BEC1DD" }}
                                >
                                    {item.des}
                                </p>

                                <div className="mt-auto flex items-center justify-between gap-4 pb-3">
                                    <div className="flex -space-x-2">
                                        {item.iconLists.map((icon) => (
                                            <div
                                                key={icon}
                                                className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/[.2] bg-black lg:h-10 lg:w-10"
                                            >
                                                <Image src={icon} alt="" aria-hidden="true" fill sizes="32px" className="p-2 object-contain" />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#161a31] px-3.5 py-2 transition-all duration-300 group-hover/pin:border-purple/50 group-hover/pin:bg-purple/10">
                                        <span className="flex whitespace-nowrap text-xs font-semibold text-purple lg:text-sm">
                                            View repo
                                        </span>
                                        <Image src="/git.svg" width={16} height={16} alt="" aria-hidden="true" className="opacity-80 transition-opacity duration-300 group-hover/pin:opacity-100" />
                                    </div>
                                </div>
                            </article>
                        </PinContainer>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;