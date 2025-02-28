
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
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Konfigurera partiklar
    const particleCount = 100;
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
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1; // Små partiklar
        this.speed = Math.random() * 0.5 + 0.1; // Långsamt fall
        this.color = this.getRandomColor();
        this.type = this.getRandomType();
        this.opacity = Math.random() * 0.5 + 0.1; // Subtil opacity
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
        
        // Återställ när de når botten
        if (this.y > canvas.height) {
          this.y = -this.size * 2;
          this.x = Math.random() * canvas.width;
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
    
    // Skapa partiklar
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animationsloop
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
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
      className="fixed inset-0 w-full h-full pointer-events-none" 
      style={{ zIndex: -1 }}
    />
  );
};

export default BackgroundAnimation;
