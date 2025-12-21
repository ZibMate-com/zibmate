import { CheckCircle2, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import MotionSection from "../../../components/view/motionComponents";

export const SectionOne = () => {
    return (
        <MotionSection className="w-full py-20 px-6 md:px-12 lg:px-24">
            <div className="max-w-8xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                
                {/* Left Side: Creative Image Composition */}
                <div className="w-full lg:w-1/2 relative group">
                    {/* Decorative Background Element */}
                    <div className="absolute -top-6 -left-6 w-full h-full border-2 border-orange-100 rounded-[2.5rem] -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                    
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-orange-500/10">
                        <img 
                            src="assets/brandon-griggs-wR11KBaB86U-unsplash.jpg" 
                            className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" 
                            alt="Modern Living Space" 
                        />
                    </div>

                    {/* Floating Info Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-10 -right-8 bg-white p-6 rounded-2xl shadow-xl hidden md:flex items-center gap-4 border border-slate-50"
                    >
                        <div className="size-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Zap className="size-6 text-orange-500 fill-orange-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">100% Automated</p>
                            <p className="text-xs text-slate-500">Payment reminders & receipts</p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Content */}
                <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 w-fit mb-6">
                        <ShieldCheck className="size-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Trusted by 500+ Owners</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                        Manage guests. <br />
                        <span className="text-orange-500">Simplify payments.</span>
                    </h1>
                    
                    <p className="text-lg text-slate-600 mt-8 leading-relaxed">
                        A modern ecosystem designed to remove the friction between owners and residents. 
                        No more chasing rent or manual entries—everything you need is one click away.
                    </p>

                    {/* Bullet Points for Professionalism */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                        {["Verified Tenants", "Unified Dashboard", "Automated Billing", "Digital KYCs"].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="size-5 text-emerald-500" />
                                <span className="text-sm font-medium text-slate-700">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-5 mt-12">
                        <button className="group px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-orange-200">
                            Get Started
                            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <a href="/features">
                            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95">
                                View Demo
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </MotionSection>
    );
};