import { motion } from "motion/react";

export default function AtmosphericBackground() {
  return (
    <>
      {/* Radial glow behind content */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(0, 217, 255, 0.04) 0%, transparent 60%)",
        }}
      />

      {/* Animated subtle gradient drift */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(14, 165, 233, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.03) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Minimal floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: "#00D9FF",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  );
}
