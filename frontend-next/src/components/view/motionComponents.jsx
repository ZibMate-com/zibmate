"use client";
import { motion } from "framer-motion";

const MotionSection = ({
  children,
  initial = { opacity: 0, translateY: 500 },
  whileInView = { opacity: 1, translateY: 0 },
  transition = { duration: 1, delay: 0 },
  viewport = { once: true, amount: "some" },
  className = "",
  ...rest
}) => (
  <motion.section
    initial={initial}
    whileInView={whileInView}
    transition={transition}
    viewport={viewport}
    className={className}
    {...rest}
  >
    {children}
  </motion.section>
);

export default MotionSection;
