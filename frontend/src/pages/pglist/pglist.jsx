import { FaChevronDown, FaHeart, FaImages, FaLocationArrow, FaMap, FaRupeeSign, FaSearchLocation, FaStar, FaStarHalf } from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
import { PgData } from "./models/pgdata";
import { useFilterPGs } from "./viewmodels/filterFunction";
import { FilterSection } from "./view/filterSection";
import { FilteredPg } from "./view/filterdpg";
import MotionSection from "../../components/view/motionComponents";
import Mycontext from "../../features/context/mycontext";
import { Loader } from "../../components/view/loader";
import { usePgData } from "./viewmodels/usePgData";
export const Pglist = () => {
    const {
        filteredPg,
        handlefilters,
        filters,
        handleRemoveFilters
    } = useFilterPGs();
    // const {pgs} = usePgData();
    const {pgs,loading} = usePgData();
    // console.log("Real Pgs:" , pgs);
    console.log("filteredPg :" , filteredPg);   
    
    if(loading){
        return <Loader/>
    }
    return (
        <MotionSection className="w-full min-h-screen flex justify-center ">
            <div className="w-7xl flex flex-col gap-4 justify-center mt-10 mb-10">
                <FilterSection
                    handlefilters={handlefilters}
                    filters={filters}
                    handleRemoveFilters={handleRemoveFilters}
                />
                <div>
                    <FilteredPg filteredPg={filteredPg} />
                </div>
            </div>
        </MotionSection>
    )
}