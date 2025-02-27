
import { useEffect, useRef } from "react";

const BackgroundRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Anpassa canvas till fönsterstorlek och gör den mycket högre för att täcka hela sidan
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 5; 
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Skapa olika typer av partiklar
    const particles: Particle[] = [];
    const particleCount = 60;
    
    // Baspartikelklass
    class Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speed = Math.random() * 1 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = this.getRandomColor();
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }
      
      getRandomColor() {
        const colors = ["#9b87f5", "#7E69AB", "#D946EF", "#33C3F0"];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvas.height) {
          this.y = -this.size * 10;
          this.x = Math.random() * canvas.width;
        }
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        this.drawShape();
        ctx.globalAlpha = 1;
        ctx.restore();
      }
      
      drawShape() {
        // Överskrivs av subklasser
      }
    }
    
    // Cirkeldiagram
    class PieChart extends Particle {
      segments: number;
      
      constructor() {
        super();
        this.segments = Math.floor(Math.random() * 4) + 2;
        this.size = Math.random() * 15 + 8;
      }
      
      drawShape() {
        const segmentAngle = (Math.PI * 2) / this.segments;
        
        for (let i = 0; i < this.segments; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, this.size, i * segmentAngle, (i + 1) * segmentAngle);
          ctx.closePath();
          
          // Olika färger för varje segment
          const segColor = this.getRandomColor();
          ctx.fillStyle = segColor;
          ctx.fill();
          
          // Tunn kant runt segmentet
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    
    // Stapeldiagram
    class BarChart extends Particle {
      bars: number[];
      
      constructor() {
        super();
        this.bars = Array.from({length: 3 + Math.floor(Math.random() * 3)}, 
          () => Math.random() * 0.8 + 0.2);
        this.size = Math.random() * 12 + 8;
      }
      
      drawShape() {
        const barWidth = this.size / (this.bars.length * 1.5);
        
        for (let i = 0; i < this.bars.length; i++) {
          const x = (i * barWidth * 1.5) - (this.size / 2);
          const height = this.bars[i] * this.size;
          
          ctx.fillStyle = this.getRandomColor();
          ctx.fillRect(x, -height / 2, barWidth, height);
        }
      }
    }
    
    // Donutdiagram
    class DonutChart extends Particle {
      segments: number;
      innerRadius: number;
      
      constructor() {
        super();
        this.segments = Math.floor(Math.random() * 4) + 2;
        this.size = Math.random() * 15 + 10;
        this.innerRadius = this.size * 0.4;
      }
      
      drawShape() {
        const segmentAngle = (Math.PI * 2) / this.segments;
        
        for (let i = 0; i < this.segments; i++) {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, i * segmentAngle, (i + 1) * segmentAngle);
          ctx.arc(0, 0, this.innerRadius, (i + 1) * segmentAngle, i * segmentAngle, true);
          ctx.closePath();
          
          ctx.fillStyle = this.getRandomColor();
          ctx.fill();
          
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    
    // Skapa olika typer av partiklar
    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        const type = Math.random();
        
        if (type < 0.33) {
          particles.push(new PieChart());
        } else if (type < 0.66) {
          particles.push(new BarChart());
        } else {
          particles.push(new DonutChart());
        }
      }
    };
    
    init();
    
    // Animationsloop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Följ med scrollningen med parallaxeffekt
    const handleScroll = () => {
      if (!canvas) return;
      canvas.style.transform = `translateY(${window.scrollY * 0.5}px)`;
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
      style={{ opacity: 0.6 }}
    />
  );
};

export default BackgroundRain;
