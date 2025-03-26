import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create a mailto link with pre-filled information
    const mailtoLink = `mailto:elin.an@hotmail.com?subject=Message from ${email}&body=${encodeURIComponent(message)}`;
    
    // Open the user's email client
    window.open(mailtoLink, "_blank");
    
    // Show confirmation and reset the form
    toast({
      title: "Message ready to send!",
      description: "Your email client has been opened with your message.",
    });
    
    // Reset the form after a short delay
    setTimeout(() => {
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <footer className="w-full flex items-center justify-center" aria-labelledby="contact-heading">
      <div className="container mx-auto max-w-md px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-2 sm:space-y-4 bg-secondary/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg mx-auto"
        >
          <h2 id="contact-heading" className="text-xl font-bold text-white text-center">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3" aria-label="Contact form">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-1.5 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your@email.com"
                disabled={isSubmitting}
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={2}
                className="w-full px-3 py-1.5 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your message..."
                disabled={isSubmitting}
                aria-required="true"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Opening email client..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
