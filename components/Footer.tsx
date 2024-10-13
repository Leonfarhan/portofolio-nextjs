import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import BorderMagicButton from "@/components/ui/BorderMagicButton";

const Footer = () => {
    return (
        <footer className="w-full pt-20 mb-[100px] md:mb-5" id="contact">
            {/* background grid */}
            <div className="w-full absolute left-0 -bottom-72 min-h-96">
                <img
                    src="/footer-grid.svg"
                    alt="grid"
                    className="w-full h-full opacity-50 "
                />
            </div>

            <div className="flex flex-col items-center">
                <h1 className="heading lg:max-w-[45vw]">
                    Interested in working <span className="text-purple"> together? </span> Contact me
                </h1>
                {/*<p className="text-white-200 md:mt-10 my-5 text-center">*/}
                {/*    Let's elevate your digital presence. Contact me today!*/}
                {/*</p>*/}
                <a href="mailto:farhanalwahid10@gmail.com">
                    <BorderMagicButton
                        title= "Email me"
                        icon={<FaLocationArrow />}
                        position="right"/>
                </a>
            </div>
            <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
                <p className="md:text-base text-sm md:font-normal font-light">
                    Farhan Alwahid&apos;s Portofolio
                </p>

                <div className="flex items-center md:gap-3 gap-6">
                    {socialMedia.map((info) => (
                        <a href={info.link}>
                            <div
                                key={info.id}
                                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-full border border-black-300"
                            >
                                <img src={info.img} alt="icons" width={20} height={20}/>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;