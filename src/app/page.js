import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Tracks from "@/components/sections/Tracks";
import Timeline from "@/components/sections/Timeline";
import Prizes from "@/components/sections/Prizes";
import Sponsors from "@/components/sections/Sponsors";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Tracks />
        <Timeline />
        <Prizes />
        <Sponsors />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
