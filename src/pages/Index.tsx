
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

  return (
    <AskMeProvider>
      <main className="bg-secondary">
        <DownloadCV />
        <Hero />
        <Timeline />
        <Dashboard />
        <Projects />
        <CoinCounter />
        <AskMe />
        <Footer />
        <Copyright />
      </main>
    </AskMeProvider>
  );
};

export default Index;
