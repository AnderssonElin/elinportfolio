
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
    const particleCount = 120; // Öka antal för bättre täckning
    const particles: Particle[] = [];
    
    // Olika typer av partiklar
    class Particle {
      x: number;
      y: number;
      size: number;
      initialSize: number;
      speed: number;
      color: string;
      type: 'circle' | 'square' | 'triangle';
      opacity: number;
      initialOpacity: number;
      lifetime: number;
      maxLifetime: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.initialSize = Math.random() * 2 + 0.5; // 50% mindre än tidigare
        this.size = this.initialSize;
        this.speed = Math.random() * 0.3 + 0.1; // Långsamt fall
        this.color = this.getRandomColor();
        this.type = this.getRandomType();
        this.initialOpacity = Math.random() * 0.4 + 0.1;
        this.opacity = this.initialOpacity;
        this.lifetime = 0;
        this.maxLifetime = Math.random() * 500 + 300; // Livslängd i frames
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
        this.lifetime++;
        
        // Minska opacity och storlek baserat på livstid
        const lifeProgress = this.lifetime / this.maxLifetime;
        
        // Gradvis uttoning
        if (lifeProgress < 0.3) {
          // Första 30% - fade in
          this.opacity = this.initialOpacity * (lifeProgress / 0.3);
          this.size = this.initialSize * (lifeProgress / 0.3 + 0.5);
        } else if (lifeProgress > 0.7) {
          // Sista 30% - fade out
          this.opacity = this.initialOpacity * (1 - ((lifeProgress - 0.7) / 0.3));
          this.size = this.initialSize * (1 - ((lifeProgress - 0.7) / 0.3) * 0.5);
        } else {
          // Mellersta 40% - full opacity
          this.opacity = this.initialOpacity;
          this.size = this.initialSize;
        }
        
        // Återställ när de når botten eller livstiden är slut
        if (this.y > canvas.height || this.lifetime >= this.maxLifetime) {
          this.reset();
        }
      }
      
      reset() {
        this.lifetime = 0;
        this.y = -10;
        this.x = Math.random() * canvas.width;
        this.initialOpacity = Math.random() * 0.4 + 0.1;
        this.opacity = 0; // Börja med full transparens
        this.initialSize = Math.random() * 2 + 0.5;
        this.size = 0; // Börja med minimal storlek
        this.maxLifetime = Math.random() * 500 + 300;
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
      const particle = new Particle();
      // Sprid ut partiklar över hela skärmen för initial visning
      particle.lifetime = Math.floor(Math.random() * particle.maxLifetime);
      particles.push(particle);
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
