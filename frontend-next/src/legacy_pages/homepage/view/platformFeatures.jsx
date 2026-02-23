"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  // Owner icons
  LayoutDashboard,
  Wallet,
  DoorOpen,
  FileText,
  Wrench,
  TrendingUp,
  Megaphone,
  CreditCard,
  MapPin,
  Bell,
  ShieldCheck,
  BadgeCheck,
  MessageSquare,
  StickyNote,
  Sparkle,
  Sparkles,
  Heart,
  ToolCaseIcon,
} from "lucide-react";
import MotionSection from "@/components/view/motionComponents";

const IconMap = {
  LayoutDashboard,
  Wallet,
  DoorOpen,
  FileText,
  Wrench,
  TrendingUp,
  Megaphone,
  CreditCard,
  ToolCaseIcon,
  MapPin,
  Bell,
  ShieldCheck,
  BadgeCheck,
  MessageSquare,
  StickyNote,
  Sparkle,
  Sparkles,
  Heart,
};

export const PlatformFeatures = () => {
  const [features, setFeatures] = useState([]);
  const [userRole, setUserRole] = useState("tenant"); // Default to tenant
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSubtitle, setSectionSubtitle] = useState("");

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("zibmate_user-role") || "tenant";
    setUserRole(role);

    const fetchFeatures = async () => {
      try {
        const baseUrl = "";

        // Determine which features to fetch based on role
        const endpoint = role === "owner" ? "features_owners" : "features_tenants";

        const response = await fetch(`${baseUrl}/api/content/${endpoint}`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch features");
        const data = await response.json();

        // Map features with icon components
        setFeatures(
          data.map((f) => ({
            ...f,
            component: IconMap[f.icon] || StickyNote,
            heading: f.title,
            para: f.content,
          })),
        );

        // Fetch section header
        const headerResponse = await fetch(`${baseUrl}/api/content/section_headers`, {
          headers: { "Content-Type": "application/json" },
        });

        if (headerResponse.ok) {
          const headers = await headerResponse.json();
          const relevantHeader = headers.find((h) =>
            role === "owner" ? h.title.includes("Owners") : h.title.includes("Tenants"),
          );

          if (relevantHeader) {
            setSectionTitle(relevantHeader.title);
            setSectionSubtitle(relevantHeader.content);
          }
        }
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  // Animation Variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation Variants for individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Dynamic color scheme based on role
  const colorScheme =
    userRole === "owner"
      ? {
          badge: "bg-orange-50 text-orange-600 border-orange-100",
          gradient: "from-orange-500 to-rose-500",
          iconBg: "bg-orange-50 text-orange-500",
          iconHover: "group-hover:bg-orange-500",
          accent: "bg-orange-500",
          blob1: "bg-orange-200",
          blob2: "bg-purple-200",
        }
      : {
          badge: "bg-orange-50 text-orange-600 border-orange-100",
          gradient: "from-orange-500 to-rose-500",
          iconBg: "bg-orange-50 text-orange-500",
          iconHover: "group-hover:bg-orange-500",
          accent: "bg-orange-500",
          blob1: "bg-orange-200",
          blob2: "bg-rose-200",
        };

  return (
    <MotionSection
      className="relative mt-20 p-6 w-full overflow-hidden"
      id="features"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-72 h-72 ${colorScheme.blob1} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob`}
        ></div>
        <div
          className={`absolute top-40 right-10 w-72 h-72 ${colorScheme.blob2} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000`}
        ></div>
      </div>

      <div className="text-center w-full mb-16">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${colorScheme.badge}`}
        >
          {sectionTitle || "Platform Features"}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mt-6 tracking-tight text-gray-900"
        >
          {sectionSubtitle || (
            <>
              Effortless Management for <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${colorScheme.gradient}`}>
                {userRole === "tenant" ? "Tenent" : userRole}
              </span>
            </>
          )}
        </motion.h1>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col items-center w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {features.map((ele, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative h-72 p-8 bg-white border border-gray-100 rounded-3xl flex flex-col justify-center items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              {/* Decorative Icon Background */}
              <div className="absolute top-6 right-6 opacity-[0.03] group-hover:scale-125 transition-transform duration-500">
                <ele.component size={80} />
              </div>

              <div
                className={`p-4 rounded-2xl ${colorScheme.iconBg} ${colorScheme.iconHover} group-hover:text-white transition-colors duration-300`}
              >
                <ele.component className="size-8" />
              </div>

              <div className="text-center z-10">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{ele.heading}</h3>
                <p className="text-gray-500 leading-relaxed text-sm px-4">{ele.para}</p>
              </div>

              {/* Bottom Accent Line */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 ${colorScheme.accent} rounded-full group-hover:w-1/3 transition-all duration-300`}
              ></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MotionSection>
  );
};
