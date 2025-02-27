
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
      canvas.height = window.innerHeight * 4; // Gör canvasen mycket högre för att täcka hela sidan
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Skapa partiklar
    const particlesArray: Particle[] = [];
    const particleCount = 80; // Fler partiklar för bättre täckning
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speed = Math.random() * 1 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = this.getRandomColor();
      }
      
      getRandomColor() {
        const colors = ["#9b87f5", "#7E69AB", "#D946EF", "#33C3F0"];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = 0 - this.size;
          this.x = Math.random() * canvas.width;
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    
    // Skapa partiklar
    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    init();
    
    // Animationsloop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Följ med scrollningen
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
