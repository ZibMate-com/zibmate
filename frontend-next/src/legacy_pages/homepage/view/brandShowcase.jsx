"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, Building2, CreditCard, Headset } from "lucide-react";

// Counter Component for that "realistic" animated feel
const Counter = ({ value, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export const Brandshowcase = () => {
  const stats = [
    {
      label: "Active Users",
      value: 5000,
      suffix: "+",
      sub: "Owners and Tenants trust us",
      icon: <Users className="size-6 text-orange-500" />,
      color: "from-orange-500/20 to-transparent",
    },
    {
      label: "Buildings Listed",
      value: 1200,
      suffix: "+",
      sub: "Managed through our system",
      icon: <Building2 className="size-6 text-blue-500" />,
      color: "from-blue-500/20 to-transparent",
    },
    {
      label: "Payments processed",
      value: 8000,
      suffix: "+",
      sub: "Secure monthly transactions",
      icon: <CreditCard className="size-6 text-emerald-500" />,
      color: "from-emerald-500/20 to-transparent",
    },
    {
      label: "System Uptime",
      value: 99,
      suffix: "%",
      sub: "Reliable 24/7 Support",
      icon: <Headset className="size-6 text-purple-500" />,
      color: "from-purple-500/20 to-transparent",
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 p-3 w-fit rounded-2xl bg-gray-50 group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                  {stat.icon}
                </div>

                <div className="mt-auto">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </h1>

                  <h2 className="text-lg font-bold text-slate-800 mt-1 group-hover:text-orange-600 transition-colors">
                    {stat.label}
                  </h2>

                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{stat.sub}</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 text-slate-50 group-hover:text-slate-100 transition-colors duration-500">
                <div className="scale-[4] opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
