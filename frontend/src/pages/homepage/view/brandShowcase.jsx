import { Hotel, SparkleIcon, SparklesIcon, UserStarIcon } from "lucide-react"
export const Brandshowcase = ()=>{
    return (
      <section className="w-full p-6 md:p-10 mt-3">
            <div className="flex justify-evenly ">
                <span className="w-2xs">
                    <Hotel className="size-10 text-blue-900"/>
                    <h1 className=" font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent md:text-xl font-Montserrat text-xl">Choose form over 10,000+ pg's and hostels.</h1>
                </span>
                <span className="w-2xs">
                    <UserStarIcon className="size-10 text-blue-900"/>
                    <h1 className=" font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent md:text-xl font-Montserrat text-xl">
                        Find best pg's based on reviews.
                    </h1>
                </span>
                <span className="w-2xs">
                    <SparklesIcon className = "size-10 text-blue-900 "/>
                    <h1 className=" font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent md:text-xl font-Montserrat text-xl">It's our duty to help you find best pg for your choice</h1>
                </span>
            </div>
      </section>
    )
}