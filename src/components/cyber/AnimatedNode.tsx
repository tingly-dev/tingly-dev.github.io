import { motion } from "framer-motion";

export default function AnimatedNode({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ boxShadow: ["0 0 0px rgba(56,189,248,0.3)", "0 0 24px rgba(56,189,248,0.8)", "0 0 0px rgba(56,189,248,0.3)"] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      className="rounded-full"
    >
      {children}
    </motion.div>
  );
}
