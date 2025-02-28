
import { useEffect, useRef } from "react";

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Anpassa canvas till fönsterstorlek
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2; // Fördubbla canvas höjd för att täcka hela sidan
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Konfigurera partiklar
    const particleCount = 150;
    const particles: Particle[] = [];
    
    // Olika typer av partiklar
    class Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      type: 'circle' | 'square' | 'triangle';
      opacity: number;
      maxOpacity: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // 50% mindre än tidigare
        this.speed = Math.random() * 0.3 + 0.1; // Långsamt fall
        this.color = this.getRandomColor();
        this.type = this.getRandomType();
        this.maxOpacity = Math.random() * 0.3 + 0.2; // Bas-opacitet, minst 0.2
        this.opacity = this.maxOpacity;
      }
      
      getRandomColor() {
        const colors = [
          "#9b87f5", // Primary purple
          "#D946EF", // Magenta pink
          "#33C3F0", // Ocean blue
          "#8B5CF6", // Vivid purple
          "#7E69AB", // Secondary purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      getRandomType() {
        const types: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
        return types[Math.floor(Math.random() * types.length)];
      }
      
      update() {
        this.y += this.speed;
        
        // Beräkna opacity baserat på position (tonas ut ju längre ner de kommer)
        const fadeStart = canvas.height * 0.7; // Starta uttoning vid 70% av skärmhöjden
        
        if (this.y > fadeStart) {
          const fadeProgress = (this.y - fadeStart) / (canvas.height - fadeStart);
          // Minimum opacitet på 0.2
          this.opacity = Math.max(0.2, this.maxOpacity * (1 - fadeProgress * 0.7));
        } else {
          this.opacity = this.maxOpacity;
        }
        
        // Återställ när de når botten
        if (this.y > canvas.height) {
          this.y = -this.size * 2;
          this.x = Math.random() * canvas.width;
          this.maxOpacity = Math.random() * 0.3 + 0.2;
          this.opacity = this.maxOpacity;
        }
      }
      
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        if (this.type === 'circle') {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 'square') {
          ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        } else if (this.type === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y - this.size);
          ctx.lineTo(this.x - this.size, this.y + this.size);
          ctx.lineTo(this.x + this.size, this.y + this.size);
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.restore();
      }
    }
    
    // Skapa partiklar med jämn fördelning över hela canvas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animationsloop
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Uppdatera canvas position baserat på scrollning
      canvas.style.top = `${-window.scrollY}px`;
      
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-[200vh] pointer-events-none" 
      style={{ zIndex: -1 }}
    />
  );
};

export default BackgroundAnimation;
