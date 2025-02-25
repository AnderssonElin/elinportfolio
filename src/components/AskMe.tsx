
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Robot } from "lucide-react";

const funResponses = [
  "Enligt min BI-kristallkula är svaret 42! 🔮",
  "Låt mig kolla i min magiska dashboard... *bleep bloop* 📊",
  "Ett ögonblick medan jag konsulterar med mina data-älvor! 🧚‍♂️",
  "Hmm, mina algoritmer dansar just nu salsa, men de säger ja! 💃",
  "Enligt min avancerade AI (Actually Improvising) är svaret självklart! 🤖",
];

const AskMe = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsAnimating(true);
    setTimeout(() => {
      const randomResponse = funResponses[Math.floor(Math.random() * funResponses.length)];
      setResponse(randomResponse);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-secondary px-4" id="ask-me">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-white mb-16">Fråga BI-Oraklet</h2>
        
        <div className="bg-primary/50 p-8 rounded-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Robot className="w-6 h-6 text-accent" />
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
