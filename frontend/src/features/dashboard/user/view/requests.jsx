import { Requests } from "../models/requests"
import { User, Phone } from "lucide-react"
export const SentRequests = () => {
    return (
        <div className="flex flex-col gap-8 mt-5">
            {
                Requests.map((req) => {
                    return (
                        <div className=" flex   text-lg  items-center rounded-2xl p-2 bg-zinc-50 shadow-md">
                            <div className="w-max p-3 border h-max rounded-full">
                                <User />
                            </div>
                            <div className="flex justify-between items-center p-3 w-full">
                                <div className="flex flex-col  text-zinc-700">
                                    <span>We’ve shared your request for <b>{req.forProperty}</b> with the PG owner, expect to hear from them shortly.</span>
                                </div>
                                <div className="flex flex-col justify-between items-end">
                                    {/* <span className="text-sm text-gray-700">Posted On : 25 sept. 2025</span> */}

                                    <button className="w-max p-2 bg-orange-500 text-white rounded-xl flex items-center gap-2">
                                        <Phone className="size-5" />
                                        Call Now</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}