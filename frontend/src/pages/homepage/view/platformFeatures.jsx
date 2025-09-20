import { Component, Heart, MapPin, MessageCircle, Sparkle, Sparkles, StickyNote } from "lucide-react"
import { features } from "../model/homepage"
import { motion, useInView, useScroll } from "framer-motion"
import { useEffect, useRef } from "react"
import MotionSection from "../../../components/view/motionComponents"
export const PlatformFeatures = () => {
    const container = useRef(null);
    const ref = useRef(null);
    const isInView = useInView(ref);

    useEffect(()=> {
        console.log("Elemnet is in View", isInView);
        
    },[isInView])
    return (
        <MotionSection ref={container}
             initial = {{opacity : 0 , translateY : 500}}
             whileInView={{ opacity : 1 , translateY : 0}}  
             transition={{ duration: 0.5, delay: 0}} 
              viewport={{ once: false, amount: "some" }}
         className="mt-10 p-4 w-full" id="features">
            <div 
           
             className="text-center w-full" >
                <h4 className="text-gray-500">Platform Features</h4>
                <h1 className="text-4xl mt-3">Effortless management for guests and owners </h1>
                <div className="flex flex-col items-center gap-6 mt-4 w-full">
                    {/* Grid of 6 cards */}
                    <div className="grid grid-cols-3 gap-6 w-full max-w-6xl">
                        {features.map((ele, i) => (
                            <div
                                key={i}
                                className="h-80 p-6 border border-gray-400 rounded-xl flex justify-center items-center flex-col gap-6 shadow-sm hover:shadow-md transition-all hover:scale-105"
                            >
                                <ele.component className="size-12 text-orange-500" />
                                <span className="text-center">
                                    <h1 className="text-2xl font-semibold">{ele.heading}</h1>
                                    <p className="text-gray-500">{ele.para}</p>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                {/*
                <button className="p-4 w-40 bg-orange-500 rounded-2xl text-white text-md font-semibold mt-6">Get Started</button> */}
            </div>
        </MotionSection>
    )
}