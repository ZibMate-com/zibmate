import { useFilterPGs } from "./viewmodels/filterFunction";
import { FilterSection } from "./view/filterSection";
import { FilteredPg } from "./view/filterdpg";
import MotionSection from "../../components/view/motionComponents";
import Mycontext from "../../features/context/mycontext";
import { Loader } from "../../components/view/loader";
// import { usePgData } from "./viewmodels/usePgData";
import { useContext } from "react";
export const Pglist = () => {
    const {
        filteredPg,
        handlefilters,
        filters,
        handleRemoveFilters,
        handleSearch
    } = useFilterPGs();
   const {loading} = useContext(Mycontext)
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
                    handleSearch={handleSearch}
                />
                <div>
                    <FilteredPg filteredPg={filteredPg} />
                </div>
            </div>
        </MotionSection>
    )
}