import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SurveySectionFour = ({ formData, handleChange, handleCheckbox, handleSubmit, onBack, errors }) => {
  const priorityOptions = [
    "Rent",
    "Location",
    "Food quality",
    "Cleanliness",
    "Safety",
    "Owner behavior",
    "Reviews",
    "Amenities",
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600 w-full" />

      <div className="px-3 py-8 md:p-10">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Expectations for PG</h2>
            <p className="text-gray-500 mt-2">Final step: What makes a PG perfect for you?</p>
          </div>
          <span className="text-orange-600 font-bold bg-orange-50 px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
            Step 4 / 4
          </span>
        </header>

        <div className="space-y-12">
          <section>
            <div className="flex justify-between items-center mb-6">
              <label className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                Select Your Must-Haves <span className="text-red-600">*</span>
              </label>
              <AnimatePresence mode="wait">
                <motion.span
                  key={formData.reviews.topPriorities.length}
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`text-xs font-black px-3 py-1 rounded-full ${
                    formData.reviews.topPriorities.length > 0
                      ? "bg-green-500 text-white"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {formData.reviews.topPriorities.length} selected
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {priorityOptions.map((option) => {
                const isSelected = formData.reviews.topPriorities.includes(option);

                return (
                  <motion.div
                    key={option}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCheckbox("reviews", "topPriorities", option)}
                    className={`relative px-2 py-3 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-orange-500 bg-orange-50/50 shadow-md shadow-orange-100"
                        : errors?.reviews?.topPriorities
                          ? "border-red-300 bg-red-50/20"
                          : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                          isSelected ? "bg-orange-500 border-orange-500" : "border-gray-200"
                        }`}
                      >
                        {isSelected && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                          </motion.svg>
                        )}
                      </div>
                      <span className={`text-sm font-semibold ${isSelected ? "text-orange-700" : "text-gray-600"}`}>
                        {option}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {errors?.reviews?.topPriorities && (
              <p className="mt-3 text-xs font-semibold text-red-500 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.reviews.topPriorities}
              </p>
            )}
          </section>

          {/* Final Comments */}
          <section>
            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
              Anything else?
            </label>
            <textarea
              name="finalComments"
              value={formData.reviews.finalComments}
              onChange={(e) => handleChange("reviews", e)}
              rows="3"
              placeholder="Tell us more..."
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all resize-none"
            />
            {/* finalComments is optional so no error shown */}
          </section>

          {/* Footer */}
          <footer className="pt-6 border-t border-gray-100 space-y-4">
            <button
              onClick={handleSubmit}
              className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-xl shadow-orange-200 transition-all active:scale-95"
            >
              Finish &amp; Submit
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full py-2 text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition-colors"
            >
              Go Back to Step 3
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SurveySectionFour;
