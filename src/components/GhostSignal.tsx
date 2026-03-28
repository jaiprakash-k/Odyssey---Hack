import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Ghost {
  id: string;
  x: number;
  y: number;
  clan: string;
}

export default function GhostSignal() {
  const [ghosts, setGhosts] = useState<Ghost[]>([]);

  useEffect(() => {
    const generateGhost = () => {
      const newGhost: Ghost = {
        id: Math.random().toString(36).substring(7),
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: Math.random() * (window.innerHeight - 100) + 50,
        clan: `Clan Valles-${Math.floor(Math.random() * 99)}`
      };

      setGhosts(prev => [...prev, newGhost]);

      // Remove ghost after 10 seconds
      setTimeout(() => {
        setGhosts(prev => prev.filter(g => g.id !== newGhost.id));
      }, 10000);
    };

    // Generate a ghost every 60 seconds (using 15s for demo purposes)
    const interval = setInterval(generateGhost, 15000);
    
    // Initial ghost
    setTimeout(generateGhost, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {ghosts.map(ghost => (
          <motion.div
            key={ghost.id}
            initial={{ opacity: 0, scale: 0.5, x: ghost.x, y: ghost.y }}
            animate={{ 
              opacity: [0, 0.8, 0.8, 0], 
              scale: [0.5, 1.2, 1, 0.8],
              x: ghost.x + (Math.random() * 200 - 100),
              y: ghost.y + (Math.random() * 200 - 100)
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 10, ease: "easeInOut" }}
            className="absolute flex flex-col items-center gap-2"
          >
            <div className="w-4 h-4 rounded-full bg-[#00D4FF] blur-[2px] glow-blue relative">
              <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50" />
            </div>
            <span className="text-[10px] font-mono text-[#00D4FF] bg-[#0A0E27]/50 px-2 py-1 rounded whitespace-nowrap">
              Spirit from {ghost.clan} passes by
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
