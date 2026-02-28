"use client";
import React, { useEffect, useState } from "react";
import { FilteredPg } from "../../../properties/list/view/filterdpg";
import { Loader } from "../../../../components/view/loader";
import { Bookmark, Search } from "lucide-react";
import { motion } from "framer-motion";

export const SavedPgSection = () => {
  const [savedPgs, setSavedPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedPgs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/pg/save", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSavedPgs(data);
      }
    } catch (error) {
      console.error("Error fetching saved PGs:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSavedPg = async (pgId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("/api/pg/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pgId }),
      });

      if (response.ok) {
        // Since we are in the "Saved" section, if we unsave, we should remove it from the list
        setSavedPgs((prev) => prev.filter((pg) => pg.id !== pgId));
      }
    } catch (error) {
      console.error("Error toggling save PG:", error);
    }
  };

  useEffect(() => {
    fetchSavedPgs();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex-1 overflow-auto p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <Bookmark className="w-8 h-8 text-orange-500" />
              Saved PGs
            </h1>
            <p className="text-slate-500 mt-1">Manage your bookmarked properties</p>
          </div>
        </div>

        {savedPgs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-12 text-center border-2 border-dashed border-slate-100"
          >
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No saved PGs yet</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Start exploring and save your favorite PGs to see them here later!
            </p>
            <a
              href="/findpg"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
            >
              <Search className="w-5 h-5" />
              Find Properties
            </a>
          </motion.div>
        ) : (
          <FilteredPg filteredPg={savedPgs} savedPgIds={savedPgs.map((pg) => pg.id)} toggleSavedPg={toggleSavedPg} />
        )}
      </div>
    </div>
  );
};
