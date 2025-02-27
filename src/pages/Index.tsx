
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Dashboard from "@/components/Dashboard";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import AskMe, { AskMeProvider } from "@/components/AskMe";
import CoinCounter from "@/components/CoinCounter";
import DownloadCV from "@/components/DownloadCV";
import Copyright from "@/components/Copyright";
import WaveSection from "@/components/WaveSection";
import BackgroundRain from "@/components/BackgroundRain";

const Index = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = target.getAttribute("href")?.slice(1);
        const element = document.getElementById(id || "");
        element?.scrollIntoView({ behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // Gemensam bakgrundsfärg för hela sidan
  const backgroundColor = "#151823";

  return (
    <AskMeProvider>
      <main className="relative">
        {/* Bakgrundsanimering som täcker hela sidan */}
        <div className="fixed inset-0 z-0 bg-secondary">
          <BackgroundRain />
        </div>
        
        <DownloadCV />
        
        {/* Hero-sektionen */}
        <section className="relative bg-transparent">
          <Hero />
        </section>
        
        {/* Timeline-sektionen */}
        <section className="relative bg-transparent pt-16">
          <WaveSection position="top" backgroundColor={backgroundColor} />
          <Timeline />
        </section>
        
        {/* Dashboard-sektionen */}
        <section className="relative bg-transparent pt-16">
          <WaveSection position="top" backgroundColor={backgroundColor} />
          <Dashboard />
        </section>
        
        {/* Projects-sektionen */}
        <section className="relative bg-transparent pt-16">
          <WaveSection position="top" backgroundColor={backgroundColor} />
          <Projects />
        </section>
        
        {/* Slutsektionen */}
        <section className="relative bg-transparent pt-16">
          <WaveSection position="top" backgroundColor={backgroundColor} />
          <CoinCounter />
          <AskMe />
          <Footer />
          <Copyright />
        </section>
      </main>
    </AskMeProvider>
  );
};

export default Index;
