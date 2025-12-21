import { motion } from "framer-motion";
// import styled, { keyframes } from "styled-components";

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
      <motion.div
        className="w-20 h-20 rounded-full border-4 border-orange-500 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{ borderTopColor: "transparent" }}
      />
    </div>
  );
};