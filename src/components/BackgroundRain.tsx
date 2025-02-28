
import { useEffect, useRef } from "react";

const BackgroundRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Anpassa canvas till fönsterstorlek
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 5; // Gör canvasen mycket högre för att täcka hela sidan
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Skapa cirkeldiagram
    const charts: CircleChart[] = [];
    const chartCount = 50; // Antal cirkeldiagram
    
    class CircleChart {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      segments: number;
      colors: string[];
      rotation: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height; // Starta ovanför synligt område
        this.size = Math.random() * 14 + 6; // Skapa olika storlekar
        this.speed = Math.random() * 0.5 + 0.1; // Långsamt fall
        this.opacity = Math.random() * 0.2 + 0.1; // Subtil opacity
        this.segments = Math.floor(Math.random() * 5) + 2; // 2-6 segment
        this.rotation = Math.random() * Math.PI * 2; // Slumpmässig startrotation
        
        // Skapa färgpalett som matchar hemsidan
        this.colors = [];
        const baseColors = [
          "#9b87f5", // Primary purple
          "#D946EF", // Magenta pink
          "#33C3F0", // Ocean blue
          "#8B5CF6", // Vivid purple
          "#7E69AB", // Secondary purple
        ];
        
        // Tilldela färger till segmenten
        for (let i = 0; i < this.segments; i++) {
          this.colors.push(baseColors[Math.floor(Math.random() * baseColors.length)]);
        }
      }
      
      update() {
        this.y += this.speed;
        
        // Beräkna opacity baserat på position - tonas ut ju längre ner de kommer
        const maxHeight = canvas.height / 2;
        if (this.y > maxHeight) {
          this.opacity = Math.max(0, 0.3 - ((this.y - maxHeight) / maxHeight) * 0.3);
        }
        
        // Återställ när de når botten eller blir osynliga
        if (this.y > canvas.height || this.opacity <= 0.01) {
          this.reset();
        }
      }
      
      reset() {
        this.y = -this.size * 5; // Starta ovanför skärmen
        this.x = Math.random() * canvas.width;
        this.opacity = Math.random() * 0.2 + 0.1;
      }
      
      draw() {
        if (this.opacity <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Rita cirkeldiagram
        const segmentAngle = (Math.PI * 2) / this.segments;
        
        for (let i = 0; i < this.segments; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, this.size, i * segmentAngle, (i + 1) * segmentAngle);
          ctx.closePath();
          
          ctx.fillStyle = this.colors[i];
          ctx.fill();
          
          // Lägg till en subtil kant för att separera segmenten
          ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        
        ctx.restore();
      }
    }
    
    // Skapa cirkeldiagram
    const init = () => {
      for (let i = 0; i < chartCount; i++) {
        const chart = new CircleChart();
        // Sprid ut startpositioner över hela canvasen
        chart.y = Math.random() * canvas.height;
        charts.push(chart);
      }
    };
    
    init();
    
    // Animationsloop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < charts.length; i++) {
        charts[i].update();
        charts[i].draw();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Följ med scrollningen med parallaxeffekt
    const handleScroll = () => {
      if (!canvas) return;
      const scrollY = window.scrollY;
      canvas.style.transform = `translateY(${scrollY * 0.5}px)`;
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none" 
      style={{ opacity: 1 }} // Full opacitet på canvas-element
    />
  );
};

export default BackgroundRain;
