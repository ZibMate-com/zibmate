import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SurveySectionThree = ({ formData, handleChange, handleCheckbox, errors, onBack, onNext }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600 w-full" />

      <div className="p-8 md:p-10">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Challenges</h2>
            <p className="text-gray-500 mt-2">The honest truth helps us build a better experience.</p>
          </div>
          <span className="text-orange-600 font-bold bg-orange-50 px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
            Step 3 / 4
          </span>
        </header>

        <form className="space-y-12">
          {/* Finding Problems */}
          <section>
            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-6">
              Biggest hurdles while searching? <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Fake / misleading information",
                "High broker fees",
                "No clarity on rent / rules",
                "Poor photos",
                "Had to visit many places",
                "Owner not responsive",
                "Safety concerns",
                "High Security Deposit",
                "Other",
              ].map((problem) => (
                <label
                  key={problem}
                  className={`flex items-center p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                    formData.problems.findingProblems.includes(problem)
                      ? "border-orange-500 bg-orange-50/50 shadow-sm"
                      : errors?.problems?.findingProblems
                        ? "border-red-200 bg-red-50/20 hover:bg-white"
                        : "border-gray-50 bg-gray-50/30 hover:border-gray-200 hover:bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={problem}
                    checked={formData.problems.findingProblems.includes(problem)}
                    className="w-5 h-5 text-orange-500 border-gray-300 rounded-lg focus:ring-orange-500 transition-all"
                    onChange={() => handleCheckbox("problems", "findingProblems", problem)}
                  />
                  <span
                    className={`ml-4 text-sm font-semibold ${
                      formData.problems.findingProblems.includes(problem) ? "text-orange-700" : "text-gray-600"
                    }`}
                  >
                    {problem}
                  </span>
                </label>
              ))}
            </div>
            {errors.problems.findingProblems && (
              <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.problems.findingProblems}</p>
            )}

            <AnimatePresence>
              {formData.problems.findingProblems.includes("Other") && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4"
                >
                  <input
                    type="text"
                    name="otherFindingProblem"
                    placeholder="Briefly describe the issue..."
                    className="w-full px-5 py-3 border-b-2 border-orange-500 bg-transparent focus:outline-none text-sm font-medium transition-all"
                    onChange={(e) => handleChange("problems", e)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section>
            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-6">
              Current Pain Points <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Food quality",
                "Cleanliness",
                "Strict rules",
                "Owner behavior",
                "Hidden charges",
                "Maintenance issues",
                "Roommate issues",
                "Non-Refundable Security Deposits",
                "No privacy",
                "None",
              ].map((issue) => {
                const isSelected = formData.problems.currentProblems.includes(issue);
                return (
                  <label
                    key={issue}
                    className={`px-5 py-3 rounded-full border-2 cursor-pointer transition-all text-xs font-bold ${
                      isSelected
                        ? "bg-gray-900 border-gray-900 text-white"
                        : errors?.problems?.currentProblems
                          ? "bg-white border-red-200 text-gray-500 hover:border-red-300"
                          : "bg-white border-gray-100 text-gray-500 hover:border-orange-200 hover:text-orange-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={issue}
                      className="hidden"
                      checked={isSelected}
                      onChange={() => handleCheckbox("problems", "currentProblems", issue)}
                    />
                    {issue}
                  </label>
                );
              })}
            </div>
            {errors.problems.currentProblems && (
              <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.problems.currentProblems}</p>
            )}
          </section>

          <section>
            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
              The "Wish I Knew" Factor
            </label>
            <textarea
              name="wishIKnew"
              rows="3"
              placeholder="What would have been a dealbreaker if you knew it earlier?"
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all resize-none placeholder:text-gray-400"
              onChange={(e) => handleChange("problems", e)}
            />
          </section>

          <footer className="pt-8 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={onBack}
              type="button"
              className="text-gray-400 hover:text-gray-600 text-sm font-bold uppercase tracking-widest transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <button
              onClick={onNext}
              type="button"
              className="px-12 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-xl shadow-orange-200 transition-all active:scale-95"
            >
              Continue
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default SurveySectionThree;
