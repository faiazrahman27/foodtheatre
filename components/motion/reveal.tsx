"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  style,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -6% 0px" }}
      transition={{
        duration: 0.48,
        ease: [0.16, 1, 0.3, 1],
        delay
      }}
      className={className}
      style={{
        backfaceVisibility: "hidden",
        willChange: "transform, opacity",
        ...style
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
