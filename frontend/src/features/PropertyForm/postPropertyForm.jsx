import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import Mycontext from "../context/mycontext";
import { Loader } from "../../components/view/loader";
import PersonalDetailsForm from "./view/personal-detail-form";
import PropertyDetailsForm from "./view/property-detail-form";
import { ReviewandSubmit } from "./view/review-submit-form";
import { MoveLeft, Check, User, Home, FileCheck } from "lucide-react";

const PgForm = () => {
  const { activeStep, loading } = useContext(Mycontext);

  const steps = [
    { id: 0, label: "Personal Info", icon: <User className="size-5" /> },
    { id: 1, label: "Property Info", icon: <Home className="size-5" /> },
    { id: 2, label: "Review", icon: <FileCheck className="size-5" /> },
  ];

  return (
    <section className="min-h-screen bg-slate-50 pb-20">
     
      <div className="max-w-7xl mx-auto p-6">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-500 transition-colors group"
        >
          <MoveLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </a>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        {loading && <Loader />}

        <div className="relative flex justify-between items-center mb-12 px-2">
        
          <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 -z-10" />
          
          <div 
            className="absolute top-5 left-0 h-1 bg-orange-500 transition-all duration-500 z-0" 
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={`
                  w-11 h-11 flex items-center justify-center rounded-full border-2 transition-all duration-500 z-10
                  ${activeStep > step.id ? "bg-orange-500 border-orange-500 text-white" : 
                    activeStep === step.id ? "bg-white border-orange-500 text-orange-500 ring-4 ring-orange-100" : 
                    "bg-white border-slate-300 text-slate-400"}
                `}
              >
                {activeStep > step.id ? <Check className="size-6" /> : step.icon}
              </div>
              
              <span 
                className={`mt-3 text-xs md:text-sm font-semibold transition-colors duration-300
                  ${activeStep >= step.id ? "text-slate-800" : "text-slate-400"}
                `}
              >
                {step.label}
              </span>
            
            </div>
          ))}
        </div>

        <motion.div 
          layout
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
        >
          <div className=" md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeStep === 0 && (
                  <div className="space-y-6">
                    <PersonalDetailsForm />
                  </div>
                )}
                
                {activeStep === 1 && (
                  <div className="space-y-6">
                    <PropertyDetailsForm />
                  </div>
                )}
                
                {activeStep === 2 && (
                  <div className="space-y-6">

                    <ReviewandSubmit />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Optional: Simple Footer inside the card for Branding */}
          <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
             <p className="text-xs text-slate-400">Step {activeStep + 1} of 3 • Secure Listing</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PgForm;