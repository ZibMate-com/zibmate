import { ArrowRight } from "lucide-react"
import MotionSection from "../../../components/view/motionComponents"
import { NavLink } from "react-router-dom"

export const SectionThree = ()=>{
    return (
        <section className="w-full relative mt-15">
            <div className="w-full ">
                 <img className="w-full object-cover" src="https://webflow-prod-assets.s3.amazonaws.com/image-generation-assets/2c842ce8-08ff-4a60-b2d5-d3db7168f64d.avif" alt="" />
            </div>
            <div className="absolute w-full h-full top-0 flex justify-start p-10 items-center">
                <div className="w-full border border-gray-400 p-5 rounded-2xl">
                    <h1 className="text-4xl font-semibold">Connecting owners and guests easily</h1>
                    <ul className="shadow-2xl shadow-black mt-5">
                        {
                            ["Streamline property management for all users.","Centralize payments and communication securely.","Modern platform for efficient operations."].map((ele)=>{
                                return (
                                    <li className="flex items-center p-3 gap-3 mt-3 text-2xl">
                                        <ArrowRight className="text-orange-500"/>
                                        {
                                            ele
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <NavLink to="contact">

                      <button  className="p-3 w-36 bg-orange-500 rounded-xl text-lg  text-white
             font-semibold mt-6">Contact Us</button>
                    </NavLink>
                </div>
            </div>
        </section>
    )
}