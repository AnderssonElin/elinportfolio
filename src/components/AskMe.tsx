
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot } from "lucide-react";

const funResponses = [
  "Enligt min BI-kristallkula är svaret 42! 🔮",
  "Låt mig kolla i min magiska dashboard... *bleep bloop* 📊",
  "Ett ögonblick medan jag konsulterar med mina data-älvor! 🧚‍♂️",
  "Hmm, mina algoritmer dansar just nu salsa, men de säger ja! 💃",
  "Enligt min avancerade AI (Actually Improvising) är svaret självklart! 🤖",
];

const Firework = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    initial={{ scale: 0, opacity: 1 }}
    animate={{
      scale: [0, 1.5],
      opacity: [1, 0],
    }}
    transition={{
      duration: 0.5,
      ease: "easeOut",
    }}
    className="absolute w-4 h-4"
    style={{
      background: "radial-gradient(circle, var(--tw-colors-accent) 0%, transparent 70%)",
      ...style,
    }}
  />
);

const AskMe = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsAnimating(true);
    setShowFireworks(true);
    
    setTimeout(() => {
      const randomResponse = funResponses[Math.floor(Math.random() * funResponses.length)];
      setResponse(randomResponse);
      setIsAnimating(false);
      
      setTimeout(() => {
        setShowFireworks(false);
      }, 1000);
    }, 1000);
  };

  return (
    <section className="py-20 bg-secondary px-4" id="ask-me">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-white mb-16">Fråga BI-Oraklet</h2>
        
        <div className="bg-primary/50 p-8 rounded-2xl backdrop-blur-sm relative overflow-hidden">
          <AnimatePresence>
            {showFireworks && (
              <>
                {[...Array(12)].map((_, i) => (
                  <Firework
                    key={i}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 0.5}s`,
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="flex gap-4">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ställ din fråga om BI..."
                className="flex-1 bg-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-accent text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Skicka
              </motion.button>
            </div>
          </form>

          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white/5 p-6 rounded-xl"
            >
              <div className="flex items-start gap-4">
                <div className="bg-accent/20 p-2 rounded-lg">
                  <Bot className="w-6 h-6 text-accent" />
                </div>
                <p className="text-white">{response}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AskMe;
