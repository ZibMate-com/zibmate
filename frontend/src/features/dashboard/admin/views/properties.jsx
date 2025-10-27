import { Properties } from "../models/properties"
import { Users,MapPin } from "lucide-react"
export const Listedproperties = ()=>{
    return (
          <div className=" flex flex-col gap-10 mt-5">
                        {
                            Properties.map((prop) => {
                                return (
                                    <div className=" flex gap-4 text-lg border rounded-3xl">
                                        <div className="w-1/3 h-48">
                                            <img src={prop.images[0]} className="w-full h-full object-cover rounded-3xl" alt="" />
                                        </div>
                                        <div className="flex justify-between p-3 w-full">
                                            <div className="flex flex-col  text-gray-700">
                                                <span>id : {prop.id}</span>
                                                <span className="font-semibold">{prop.name}</span>
                                                <span className="font-medium">{prop.description}</span>
                                                <span className="flex items-center gap-3"><Users className="size-4" />{prop.occupancy}</span>
                                                <span className="flex items-center gap-3"><MapPin className="size-4" />{prop.city}</span>
                                                <span>Facilities : {prop.facilities}</span>
                                            </div>
                                            <div className="flex flex-col justify-between items-end">
                                                <span className="text-sm text-gray-700">Posted On : 25 sept. 2025</span>
                                                <div>
                                                    <span className="text-2xl font-semibold">{prop.price}</span>
                                                    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-lg m-2">
                                                        Save ₹{prop.discount}
                                                    </span>
                                                </div>

                                                <button className="w-20 p-2 bg-orange-500 text-white rounded-xl">Active</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
    )
}