import { FaChevronDown, FaHeart, FaImages, FaLocationArrow, FaMap, FaRupeeSign, FaSearchLocation, FaStar, FaStarHalf } from "react-icons/fa"
import { useEffect, useState } from "react"
import { PgData } from "./models/pgdata";
import { useFilterPGs } from "./viewmodels/filterFunction";
import { Navigate, useNavigate } from "react-router";
import { Heart } from "lucide-react";
import { FilterSection } from "./view/filterSection";
import { FilteredPg } from "./view/filterdpg";
import MotionSection from "../../components/view/motionComponents";
export const Pglist = () => {
    const {
        filteredPg,
        handlefilters,
        filters,
        handleRemoveFilters
    } = useFilterPGs();
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