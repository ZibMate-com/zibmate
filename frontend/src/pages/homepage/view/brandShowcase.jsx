import { Hotel, SparkleIcon, SparklesIcon, UserStarIcon } from "lucide-react"
export const Brandshowcase = ()=>{
    return (
      <section className="w-full p-4  mt-10">
            <div className="flex justify-between ">
                <span className="w-2xs">
                   <h1 className="font-bold text-3xl">5K +</h1>
                    <h2 className=" bg-gradient-to-r bg-clip-text text-black md:text-xl font-Montserrat text-lg">Active Users</h2>
                    <p className="text-gray-400">Owners and Tenants using our  platform</p>
                </span>
                <span className="w-2xs">
                     <h1 className="font-bold text-3xl">1.2K +</h1>
                    <h2 className=" bg-gradient-to-r bg-clip-text text-black md:text-xl font-Montserrat text-lg">Buildings Listed</h2>
                    <p className="text-gray-400">Properties Managed Through Our Systems.</p>
                </span>
                <span className="w-2xs">
                   <h1 className="font-bold text-3xl">8K +</h1>
                    <h2 className=" bg-gradient-to-r bg-clip-text text-black md:text-xl font-Montserrat text-lg">Payments processed</h2>
                    <p className="text-gray-400">Monthly transactions on the platform.</p>
                </span>
                <span className="w-2xs">
                   <h1 className="font-bold text-3xl">24/7</h1>
                    <h2 className=" bg-gradient-to-r bg-clip-text text-black md:text-xl font-Montserrat text-lg">Support Avaible</h2>
                    <p className="text-gray-400">Assistance for Owners and Tenants</p>
                </span>
            </div>
      </section>
    )
}