
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
    
    // Skapa bubblor
    const bubbles: Bubble[] = [];
    const bubbleCount = 60;
    
    class Bubble {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      color: string;
      opacity: number;
      wobble: number;
      wobbleSpeed: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 5;
        this.speedY = Math.random() * 0.8 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.color = this.getRandomColor();
        this.opacity = Math.random() * 0.4 + 0.1;
        this.wobble = 0;
        this.wobbleSpeed = Math.random() * 0.03 + 0.01;
      }
      
      getRandomColor() {
        const colors = [
          "#9b87f5", // Primary purple
          "#D946EF", // Magenta pink
          "#33C3F0", // Ocean blue
          "#8B5CF6", // Vivid purple
          "#7E69AB", // Secondary purple
          "#F1F0FB"  // Soft gray with purple tint
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.y -= this.speedY; // Bubblor stiger uppåt
        this.x += Math.sin(this.wobble) * 0.5;
        this.wobble += this.wobbleSpeed;
        
        if (this.y < -this.size * 2) {
          this.y = canvas.height + this.size;
          this.x = Math.random() * canvas.width;
        }
      }
      
      draw() {
        ctx.save();
        
        // Huvudbubblan
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        
        // Glanseffekt
        const gradientX = this.x - this.size * 0.3;
        const gradientY = this.y - this.size * 0.3;
        const highlight = ctx.createRadialGradient(
          gradientX, gradientY, this.size * 0.1,
          gradientX, gradientY, this.size * 0.7
        );
        highlight.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = highlight;
        ctx.globalAlpha = this.opacity * 0.8;
        ctx.fill();
        
        // Kantskugga för att skapa djup
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Liten glansreflektion
        ctx.beginPath();
        ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.globalAlpha = this.opacity * 0.9;
        ctx.fill();
        
        ctx.restore();
      }
    }
    
    // Skapa bubblor
    const init = () => {
      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push(new Bubble());
      }
    };
    
    init();
    
    // Animationsloop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].draw();
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
