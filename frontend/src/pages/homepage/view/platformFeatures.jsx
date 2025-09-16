import { Component, Heart, MapPin, MessageCircle, Sparkle, Sparkles, StickyNote } from "lucide-react"
import { features } from "../model/homepage"
export const PlatformFeatures = () => {
  
    return (
        <section className="mt-10 p-4 w-full" id="features">
            <div className="text-center w-full">
                <h4 className="text-gray-500">Platform Features</h4>
                <h1 className="text-4xl mt-3">Effortless management for guests and owners </h1>
                <div className="grid grid-cols-3 justify-center items-center gap-4 mt-4 w-full">
                    {
                        features.map((ele) => {
                            return (
                                <div className=" w-full h-80 p-6 border border-gray-400 rounded-xl  flex justify-center items-center flex-col gap-8">
                                  {  <ele.component className="size-12 text-orange-500" />}
                                    <span className="text-center">
                                        <h1 className="text-2xl">{ele.heading}</h1>
                                        <p className="text-gray-500">{ele.para}</p>
                                    </span>
                                </div>
                            )
                        })
                    }

                </div>
                <button className="p-4 w-40 bg-orange-500 rounded-2xl text-white text-md font-semibold mt-6">Get Started</button>
            </div>
        </section>
    )
}