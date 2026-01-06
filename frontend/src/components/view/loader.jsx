import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md z-[100]">
      <div className="relative flex items-center justify-center">
       
        <motion.div
          className="w-24 h-24 rounded-full border-[1px] border-orange-500/20"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 4, ease: "linear" },
            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
        />

       
        <motion.div
          className="absolute w-16 h-16 rounded-full border-t-2 border-l-2 border-orange-500"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "anticipate" }}
        />

        
        <motion.div
          className="absolute w-2 h-2 bg-orange-600 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        />

        
        <div className="absolute -bottom-16 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold text-stone-900 uppercase tracking-[0.5em] ml-[0.5em]"
          >
            Securing Residency
          </motion.span>
          <motion.div 
            className="h-[1px] bg-orange-500 mt-2"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    </div>
  );
};