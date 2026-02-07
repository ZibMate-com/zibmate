"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Loader } from "../../../components/view/loader";
import PropertyDetailsForm from "./view/property-detail-form";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import PersonalDetailsForm from "./view/personal-detail-form";
import { ReviewandSubmit } from "./view/review-submit-form";
import { useOwnerOnboardingForm } from "./viewmodels/use-owner-onboarding";
import Mycontext from "@/context/mycontext";
import Link from "next/link"; // Added Next.js Link

const PgForm = () => {
  const { loading, activeStep } = useContext(Mycontext);
  const {
    formData,
    handleChange,
    next,
    back,
    submitAll,
    errors,
    toggleOccupancy,
    toggleFacility,
    handleFileChange,
    removeImage,
    imagePreviews,
    handleCloudinaryImages
  } = useOwnerOnboardingForm();

  return (
    <section className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-500 transition-colors group"
        >
          <MoveLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        {loading && <Loader />}

        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
        >
          <div className="md:p-2">
            {activeStep == 1 && (
              <PersonalDetailsForm formData={formData} handleChange={handleChange} errors={errors} next={next} />
            )}

            {activeStep == 2 && (
              <PropertyDetailsForm
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                next={next}
                back={back}
                toggleFacility={toggleFacility}
                toggleOccupancy={toggleOccupancy}
                handleFileChange={handleFileChange}
                removeImage={removeImage}
                imagePreviews={imagePreviews}
                handleCloudinaryImages={handleCloudinaryImages}
              />
            )}

            {activeStep == 3 && <ReviewandSubmit formData={formData} submitAll={submitAll} />}
          </div>

          <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              ZibMate Verified Property Listing
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PgForm;
