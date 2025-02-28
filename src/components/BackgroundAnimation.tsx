
import { useEffect, useRef } from "react";

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Anpassa canvas till hela viewporten
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    
    // Konfigurera snöflingor
    const flakeCount = 150;
    const flakes: Snowflake[] = [];
    
    class Snowflake {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;
      type: string;
      
      constructor() {
        this.reset();
      }
      
      reset() {
        // Slumpmässig startposition (x-koordinat)
        this.x = Math.random() * canvas.width;
        // Starta ovanför viewport för jämn fördelning
        this.y = Math.random() * -100;
        // Mindre storlek (50% mindre än tidigare)
        this.size = Math.random() * 2 + 0.5;
        // Varierande fallhastighet
        this.speed = Math.random() * 0.5 + 0.1;
        // Varierande genomskinlighet, men aldrig helt genomskinlig
        this.opacity = Math.random() * 0.4 + 0.2;
        // Välj färg från paletten
        this.color = this.getRandomColor();
        // Typ av partikel (för form-variation)
        this.type = this.getRandomType();
      }
      
      getRandomColor() {
        const colors = [
          "#9b87f5", // Lila
          "#D946EF", // Magenta
          "#8B5CF6", // Mörklila
          "#7E69AB", // Purlpe
          "#A78BFA", // Ljuslila
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      getRandomType() {
        const types = ["circle", "square", "triangle", "star"];
        return types[Math.floor(Math.random() * types.length)];
      }
      
      update() {
        // Uppdatera position
        this.y += this.speed;
        
        // Lägg till lite horisontell rörelse (svajande)
        this.x += Math.sin(this.y * 0.01) * 0.5;
        
        // Om flinga når botten, återställ den till toppen
        if (this.y > canvas.height) {
          this.reset();
        }
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        switch (this.type) {
          case "circle":
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case "square":
            ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
            break;
            
          case "triangle":
            ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.size);
            ctx.lineTo(this.x - this.size, this.y + this.size/2);
            ctx.lineTo(this.x + this.size, this.y + this.size/2);
            ctx.closePath();
            ctx.fill();
            break;
            
          case "star":
            const spikes = 5;
            const outerRadius = this.size;
            const innerRadius = this.size / 2;
            
            ctx.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
              const radius = i % 2 === 0 ? outerRadius : innerRadius;
              const angle = (Math.PI * i) / spikes;
              
              if (i === 0) {
                ctx.moveTo(this.x + radius * Math.cos(angle), this.y + radius * Math.sin(angle));
              } else {
                ctx.lineTo(this.x + radius * Math.cos(angle), this.y + radius * Math.sin(angle));
              }
            }
            ctx.closePath();
            ctx.fill();
            break;
        }
        
        ctx.restore();
      }
    }
    
    // Skapa snöflingor
    for (let i = 0; i < flakeCount; i++) {
      // Fördela dem jämnt över hela skärmen för initial visning
      const flake = new Snowflake();
      flake.y = Math.random() * canvas.height; // Fördela vertikalt från början
      flakes.push(flake);
    }
    
    // Animationsloop
    const animate = () => {
      // Rensa canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Uppdatera och rita varje flinga
      flakes.forEach(flake => {
        flake.update();
        flake.draw();
      });
      
      // Fortsätt animationsloopen
      requestAnimationFrame(animate);
    };
    
    // Starta animationen
    const animationId = requestAnimationFrame(animate);
    
    // Städa upp vid nedmontering
    return () => {
      window.removeEventListener("resize", setCanvasSize);
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
