import { FloatingNav } from '@/components/ui/FloatingNavbar'
import { navItems } from "@/data";
import Grid from '@/components/Grid'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Experience from "@/components/Experience";
import Sdlc from "@/components/Sdlc";
import Footer from "@/components/Footer";

export default function Home() {
  return(
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-clip mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={ navItems }/>
        <Hero />
        <Grid />
        <Projects />
          <Experience/>
          <Sdlc/>
        <Footer/>
      </div>
    </main>
  )
}