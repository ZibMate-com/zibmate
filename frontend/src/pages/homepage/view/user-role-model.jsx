import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building2, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export const UserRoleModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('user-role');
    const token = localStorage.getItem('token');
    if ( !token && !savedRole) {
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const selectRole = (role) => {
    localStorage.setItem('user-role', role);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
       
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

        
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-[3rem] p-2 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] overflow-hidden "
          >
          
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl -z-10 -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -z-10 -ml-32 -mb-32" />

            <div className="p-8">
            
              <div className="flex flex-col items-center text-center mb-12">
                <motion.div 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 mb-6"
                >
                  <Sparkles className="size-3.5 text-orange-500 fill-orange-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">Personalize Your Experience</span>
                </motion.div>
                
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                  Tell us about <span className="text-orange-500">you.</span>
                </h2>
                <p className="text-slate-500 max-w-sm text-lg leading-snug">
                  Choose your journey to help us show you the right tools.
                </p>
              </div>

           
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
               <a href="/claimyourpg">
                <RoleCard 
                  title="Property Owner"
                  description="Automate rent, manage tenants, and grow your PG business."
                  icon={<Building2 className="size-8 text-orange-600" />}
                  color="orange"
                  onClick={() => selectRole('owner')}
                  delay={0.3}
                />
              </a>
              <a href="/findpg">
                <RoleCard 
                  title="I'm a Tenant"
                  description="Find comfortable stays, pay rent easily, and request service."
                  icon={<User className="size-8 text-blue-600" />}
                  color="blue"
                  onClick={() => selectRole('tenant')}
                  delay={0.4}
                />
                </a>
              </div>

              <p className="text-center text-slate-400 text-xs mt-10 font-medium">
                Don't worry, you can always change this in your profile settings later.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Sub-component for the Cards to keep code clean
const RoleCard = ({ title, description, icon, color, onClick, delay }) => {
  const colorClasses = {
    orange: "hover:border-orange-500/50 hover:bg-orange-50/30 group-hover:bg-orange-100 text-orange-600",
    blue: "hover:border-blue-500/50 hover:bg-blue-50/30 group-hover:bg-blue-100 text-blue-600"
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: delay > 0.3 ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className={`group relative flex flex-col items-start text-left p-8 rounded-[2rem] border-2 border-slate-50 bg-white shadow-sm transition-all duration-300 active:scale-95 ${colorClasses[color]}`}
    >
      <div className={`size-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 mb-6 ${color === 'orange' ? 'bg-orange-50' : 'bg-blue-50'}`}>
        {icon}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <ChevronRight className="size-4 text-slate-300 group-hover:translate-x-1 group-hover:text-slate-900 transition-all" />
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <CheckCircle2 className={`size-5 ${color === 'orange' ? 'text-orange-500' : 'text-blue-500'}`} />
      </div>
    </motion.button>
  );
};