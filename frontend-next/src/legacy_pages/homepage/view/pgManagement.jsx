"use client";
import { motion } from "framer-motion";
import MotionSection from "../../../components/view/motionComponents";

export const PgManagement = () => {
  
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1], 
      },
    }),
  };

  const cardStyles = "relative overflow-hidden group rounded-[2.5rem] border border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 p-8 md:p-10 flex flex-col justify-between min-h-[450px]";

  return (
    <MotionSection className="w-full mt-24 px-6 max-w-7xl mx-auto" id="management">
      <div className="w-full mb-16 text-center flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            Streamline your 
            <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 italic text-3xl md:text-5xl">PG management</span>
          </div>
          <p className="text-lg md:text-xl text-gray-500 mt-6 leading-relaxed max-w-2xl">
            Effortlessly manage your properties with our all-in-one platform, 
            designed for seamless tenant coordination, payment tracking, and building management.
          </p>
        </motion.div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Card 1: Large (Tenant Organization) */}
        <motion.div 
          custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`${cardStyles} md:col-span-7`}
        >
          <div className="max-w-xs">
            <h3 className="text-3xl font-bold text-gray-800 tracking-tight">Organize Tenants with ease</h3>
            <p className="text-gray-500 mt-3 font-medium">Digital onboarding and room allocation in seconds.</p>
          </div>
          <div className="mt-10 -mr-10 -mb-10 rounded-tl-3xl overflow-hidden border-t border-l border-gray-200 shadow-2xl transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2 duration-700">
            <img 
              src="https://cdn.prod.website-files.com/68c6fea85160c01eac0c934f/68c6fffbf8eeadead66fba6f_aeeaae13-b328-49be-8619-d3f0381a56d4.avif" 
              className="w-full h-full object-cover" 
              alt="Tenant Organization Interface" 
            />
          </div>
        </motion.div>

        {/* Card 2: Small (Rent Collection) */}
        <motion.div 
          custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`${cardStyles} md:col-span-5 bg-orange-50/50`}
        >
          <div>
            <h3 className="text-3xl font-bold text-gray-800 tracking-tight">Collect Rent</h3>
            <p className="text-gray-500 mt-3 font-medium">Automatic reminders and instant digital receipts.</p>
          </div>
          <div className="mt-10 rounded-2xl overflow-hidden border border-gray-200 shadow-xl transition-transform group-hover:scale-[1.05] duration-700">
            <img 
              src="https://cdn.prod.website-files.com/68c6fea85160c01eac0c934f/68c6fffb3cfa78298bffd113_aa26e5cb-4d1a-4724-b7c3-971aab8f8a80.avif" 
              className="w-full h-full object-cover" 
              alt="Payment Dashboard" 
            />
          </div>
        </motion.div>

        {/* Card 3: Small (Communication) */}
        <motion.div 
          custom={3} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`${cardStyles} md:col-span-5`}
        >
          <div>
            <h3 className="text-3xl font-bold text-gray-800 tracking-tight">Direct Contact</h3>
            <p className="text-gray-500 mt-3 font-medium">Bridge the gap between owners and residents instantly.</p>
          </div>
          <div className="mt-10 rounded-2xl overflow-hidden border border-gray-200 shadow-xl transition-transform group-hover:rotate-2 duration-700">
            <img 
              src="https://cdn.prod.website-files.com/68c6fea85160c01eac0c934f/68c6fffb4ac3836441634496_9eb03614-6030-4410-afb6-34e4fa26d078.avif" 
              className="w-full h-full object-cover" 
              alt="Messaging Feature" 
            />
          </div>
        </motion.div>

        {/* Card 4: Large (Instant Updates) */}
        <motion.div 
          custom={4} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`${cardStyles} md:col-span-7 bg-slate-900 text-white border-none`}
        >
          <div className="max-w-xs">
            <h3 className="text-3xl font-bold tracking-tight">Stay Updated Instantly</h3>
            <p className="text-slate-400 mt-3 font-medium">Never miss a maintenance request or a payment alert.</p>
          </div>
          <div className="mt-10 -mb-10 -ml-10 rounded-tr-3xl overflow-hidden border-t border-r border-slate-700 shadow-2xl transition-transform group-hover:scale-[1.02] duration-700">
            <img 
              src="https://cdn.prod.website-files.com/68c6fea85160c01eac0c934f/68c6fffbf483a0310041f17e_abcfccfb-28a0-48eb-a7d0-ea234ad51b11.avif" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
              alt="Notifications Interface" 
            />
          </div>
        </motion.div>

      </div>
    </MotionSection>
  );
};