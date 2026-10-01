import Hero from "@/components/sections/Hero.jsx";
import About from "@/components/sections/About.jsx";
import Process from "@/components/sections/Process.jsx";
import Projects from "@/components/sections/Projects.jsx";
import Skills from "@/components/sections/Skills.jsx";
import Experience from "@/components/sections/Experience.jsx";
import Contact from "@/components/sections/Contact.jsx";
import useHashScroll from "@/hooks/useHashScroll.js";

export default function Home() {
  useHashScroll();

  return (
    <>
      <Hero />
      <About />
      <Process />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}