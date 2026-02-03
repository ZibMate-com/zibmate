import { CgChevronDown, CgChevronUp } from "react-icons/cg"
import { ChevronDown, ChevronDownIcon, SearchIcon } from "lucide-react"
import { useSearchSection } from "../viewmodels/searchSection"
import { LookingFor, Location, Occupancy, Price } from "../model/searchsection"

export const Search = () => {
    const {
        SearchRef,
        handleLookingForClick,
        lookingfor,
        location,
        handleLocation,
        occupancy,
        handleOccuoancy,
        price,
        handlePrice

    } = useSearchSection()

    return (
        <div className=" w-full absolute -bottom-15 right-0 left-0 z-10 flex justify-center mt-4 mb-4">
            <div className="flex bg-gradient-to-br from-purple-300 via-blue-300 to-purple-300  w-max rounded-3xl shadow-blue-100 shadow-md  items-center md:gap-10 gap-20 px-4 py-5  md:text-lg text-xs font-semibold ">
                {/* <button className="flex flex-col relative gap-3 p-3   font-Syne items-center hover:shadow-2xs hover:shadow-blue-300 hover:text-blue-900 rounded-4xl transition-all " onClick={handleLookingForClick}> */}
                {/* <span className="flex items-center">
                    <p>Looking For</p>
                    <ChevronDownIcon className="size-7 mt-1"/>
                    </span>
                    { 
                        lookingfor
                         && <span className="w-full h-max flex flex-col gap-4 absolute top-20 bg-white p-3 rounded-2xl shadow-md " ref={SearchRef}>
                          <h1  className="hover:bg-blue-50  p-4 rounded-3xl ">Students</h1>
                          <h1 className="hover:bg-blue-50  p-4 rounded-3xl ">Proffesional</h1>
                          <h1 className="hover:bg-blue-50  p-4 rounded-3xl ">Boy's Only</h1>
                          <h1  className="hover:bg-blue-50  p-4 rounded-3xl ">Girl's Only</h1>
                    </span>
                    } */}
                <select className=" p-1 font-Syne items-center hover:shadow-2xs hover:shadow-blue-300 hover:text-blue-900 rounded-4xl transition-all border-0 outline-0" name="looking for" id="">
                    <option value="Looking for">Looking For</option>
                    {
                        LookingFor.map((ele) => {
                            return <option className="hover:bg-blue-50  p-4 rounded-3xl " value={ele}>{ele}</option>
                        })
                    }
                </select>


                {/* </button> */}
                <select className="p-1 font-Syne items-center hover:shadow-2xs hover:shadow-blue-300 hover:text-blue-900 rounded-4xl transition-all border-0 outline-0" name="Location" id="">
                    <option value="Location">Location</option>
                    {
                        Location.map((ele) => {
                            return <option className="hover:bg-blue-50  p-4 rounded-3xl " value={ele}>{ele}</option>
                        })
                    }
                </select>

                <span className="flex items-center gap-2">
                    <input type="text" className="border bg-white border-black rounded-2xl w-sm p-2 placeholder:text-sm outline-0 text-black placeholder-black" name="search" placeholder="search for nearby pg in your locality " />
                    <SearchIcon />
                </span>

                <select className="p-1 font-Syne items-center hover:shadow-2xs hover:shadow-blue-300 hover:text-blue-900 rounded-4xl transition-all border-0 outline-0" name="Price" id="">
                    <option value="price">Price</option>
                    {
                        Price.map((ele) => {
                            return <option className="hover:bg-blue-50  p-4 rounded-3xl " value={ele}>{ele}</option>
                        })
                    }
                </select>
                <select className=" p-1 font-Syne items-center hover:shadow-2xs hover:shadow-blue-300 hover:text-blue-900 rounded-4xl transition-all border-0 outline-0" name="Occupancy" id="">
                    <option value="occupancy">Occupancy</option>
                    {
                        Occupancy.map((ele) => {
                            return <option className="hover:bg-blue-50  p-4 rounded-3xl " value={ele}>{ele}</option>
                        })
                    }
                </select>

            </div>
        </div>
    )
}