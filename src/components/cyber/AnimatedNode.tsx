import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedNode({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        reduceMotion
          ? undefined
          : { boxShadow: ["0 0 0px rgba(56,189,248,0.3)", "0 0 24px rgba(56,189,248,0.8)", "0 0 0px rgba(56,189,248,0.3)"] }
      }
      transition={reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      className="rounded-full"
    >
      {children}
    </motion.div>
  );
}
