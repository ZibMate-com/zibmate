"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SurveySectionOne from "./view/user-details";
import SurveySectionTwo from "./view/pg-details";
import SurveySectionThree from "./view/problem-facing";
import SurveySectionFour from "./view/final-submit";
import { useSurveyForm } from "./viewmodel/use-survey-form";
export const SurveyForm = () => {
  const sectionKeys = ["basic_details", "pg_details", "problems", "reviews"];
  const [activeTab, setActiveTab] = useState(1);
  const totalSteps = 4;

  const { 
    formData, 
    errors, 
    handleChange, 
    handleCheckbox, 
    handleSubmit, 
    validateSection, 
    otp,
    setOtp,
    otpSent,
    otpVerified,
    otpLoading,
    sendOtp,
    verifyOtp, } = useSurveyForm();

  const nextStep = () => {
    const currentSection = sectionKeys[activeTab - 1];
    const isValid = validateSection(currentSection);
    if (!isValid) return;
    setActiveTab((prev) => prev + 1);
  };

  const prevStep = () => setActiveTab((prev) => Math.max(prev - 1, 1));
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const renderSection = () => {
    switch (activeTab) {
      case 1:
        return <SurveySectionOne
          onNext={nextStep}
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          otp={otp}
          setOtp={setOtp}
          otpSent={otpSent}
          otpVerified={otpVerified}
          otpLoading={otpLoading}
          sendOtp={sendOtp}
          verifyOtp={verifyOtp}
        />;
      case 2:
        return (
          <SurveySectionTwo
            onNext={nextStep}
            onBack={prevStep}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
        );
      case 3:
        return (
          <SurveySectionThree
            onNext={nextStep}
            onBack={prevStep}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleCheckbox={handleCheckbox}
          />
        );
      case 4:
        return (
          <SurveySectionFour
            onNext={nextStep}
            onBack={prevStep}
            formData={formData}
            errors={errors}
            handleCheckbox={handleCheckbox}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return <SurveySectionOne onNext={nextStep} formData={formData} errors={errors} handleChange={handleChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] py-12 selection:bg-orange-100">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header / Stepper Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative">
            {/* Background Line */}
            <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-100 -z-10" />

            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: activeTab >= step ? "#f97316" : "#ffffff",
                    borderColor: activeTab >= step ? "#f97316" : "#e5e7eb",
                    color: activeTab >= step ? "#ffffff" : "#9ca3af",
                    scale: activeTab === step ? 1.1 : 1,
                  }}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm z-10 shadow-sm"
                >
                  {activeTab > step ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step
                  )}
                </motion.div>
                <motion.span
                  animate={{ opacity: activeTab >= step ? 1 : 0.5 }}
                  className="text-[10px] uppercase tracking-widest mt-3 font-bold text-gray-500"
                >
                  {step === 1 ? "Profile" : step === 2 ? "PG Info" : step === 3 ? "Challenges" : "Final"}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Animated Progress Bar */}
          <div className="mt-8 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="bg-orange-500 h-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeTab - 1) / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </div>
        </div>

        {/* Section Container with Slide/Fade Transition */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={activeTab}>
            <motion.div
              key={activeTab}
              custom={activeTab}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
