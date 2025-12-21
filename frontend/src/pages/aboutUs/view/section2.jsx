import { motion } from "framer-motion";
import { Quote, ArrowUpRight } from "lucide-react";
import MotionSection from "../../../components/view/motionComponents";

export const SectionTwo = () => {
    return (
        <MotionSection className="w-full py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
            <div className="max-w-8xl mx-auto relative">
                
                {/* Image Side - Using a High-Quality Lifestyle/Community Image */}
                <div className="w-full lg:w-9/12 rounded-[3rem] overflow-hidden shadow-2xl">
                    <motion.img 
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                        className="w-full h-[500px] md:h-[600px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000" 
                        alt="Our Community Story" 
                    />
                </div>

                {/* Floating Content Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative lg:absolute lg:bottom-[-40px] lg:right-0 w-full lg:w-1/2 bg-white/90 backdrop-blur-xl p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-slate-100 mt-[-60px] lg:mt-0 z-10"
                >
                    <div className="mb-6">
                        <div className="size-12 bg-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-200">
                            <Quote className="text-white size-6 fill-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                            Our Story, <br />
                            <span className="text-orange-500 italic">Your Trusted Stay.</span>
                        </h2>
                    </div>

                    <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                        We started with a simple goal: to eliminate the friction in PG living. 
                        By connecting owners and guests on a unified, transparent platform, 
                         we’ve built more than just a management tool—we’ve built a community 
                        rooted in trust and simplicity.
                    </p>

                    <div className="mt-8 flex items-center gap-6">
                        <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all group active:scale-95 shadow-xl shadow-slate-200">
                            Read Our Journey
                            <ArrowUpRight className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                        
                        <div className="hidden sm:flex flex-col">
                            <span className="text-xl font-bold text-slate-900 leading-none">10k+</span>
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Stays Simplified</span>
                        </div>
                    </div>
                </motion.div>

                {/* Decorative Element */}
                <div className="absolute top-10 right-10 hidden lg:block">
                     <div className="w-24 h-24 border-t-2 border-r-2 border-orange-200 rounded-tr-[2rem]" />
                </div>
            </div>
        </MotionSection>
    );
};