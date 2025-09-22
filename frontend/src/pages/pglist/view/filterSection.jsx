import { Filters } from "../models/pglist"
export const FilterSection = ({ handlefilters, filters, handleRemoveFilters }) => {
    return (
        <div className="w-full text-end">
            <span
                className="cursor-pointer hover:underline text-orange-600 font-semibold text-lg mb-10"
                onClick={handleRemoveFilters}
            >
                Remove Filters
            </span>
            <div className="flex justify-evenly gap-2 items-center font-semibold">
                {Filters.map((filter, index) => (
                    <div
                        key={index}
                        className="flex items-center border gap-2 w-full border-gray-500 rounded-4xl p-2"
                    >
                        <filter.component className="size-6" />
                        <select
                            name={filter.title}
                            className="w-full focus:outline-0"
                            value={filters[filter.title] || ""}
                            onChange={event =>
                                handlefilters({
                                    title: filter.title,
                                    values: event.target.value
                                })
                            }
                        >
                            <option value="">{filter.title}</option>
                            {filter.values.map(val => (
                                <option key={val} value={val}>
                                    {val}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}