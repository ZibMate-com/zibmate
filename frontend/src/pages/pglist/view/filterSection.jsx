import { Filters } from "../models/pglist"

export const FilterSection = ()=>{
    return (
        <div className="w-full flex justify-evenly items-center font-semibold">
            {
                Filters.map((filter,index)=>{
                    return (
                        <select name={filter.title} id={index} className="border border-gray-500 p-3 rounded-4xl ">
                            {<filter.component className="size-8"/>}
                            <option value="">{filter.title}</option>
                            {
                                filter.values.map((val)=>{
                                    return <option value={val}>{val}</option>
                                })
                            }
                        </select>
                    )
                })
            }
        </div>
    )
}