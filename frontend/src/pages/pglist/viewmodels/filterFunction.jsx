export const usefilterPGs =(pgList, appliedFilters)=> {
  return pgList.filter(pg => {
    const { filters } = pg;

    // 🔹 Price filter
    if (appliedFilters.Price?.values) {
      const [min, max] = appliedFilters.Price.values
        .split("-")
        .map(v => parseInt(v.replace(/,/g, "").trim()));

      const pgMin = parseInt(filters.Price.values.split("-")[0].replace(/,/g, "").trim());
      const pgMax = parseInt(filters.Price.values.split("-")[1].replace(/,/g, "").trim());

      if (max < pgMin || min > pgMax) return false;
    }

    // 🔹 Location filter
    if (appliedFilters.Location?.values) {
      if (filters.Location.values.toLowerCase() !== appliedFilters.Location.values.toLowerCase()) {
        return false;
      }
    }

    // 🔹 Amenities filter
    if (appliedFilters.Amenities?.values?.length) {
      const required = appliedFilters.Amenities.values;
      const hasAll = required.every(a => filters.Amenities.values.includes(a));
      if (!hasAll) return false;
    }

    // 🔹 Occupancy filter
    if (appliedFilters.Occupancy?.values?.length) {
      const required = appliedFilters.Occupancy.values.map(o => o.toLowerCase());
      const pgOcc = filters.Occupancy.values.map(o => o.toLowerCase());
      if (!required.some(r => pgOcc.includes(r))) return false;
    }

    // 🔹 LookingFor filter
    if (appliedFilters.LookingFor?.values?.length && filters.LookingFor?.values) {
      const required = appliedFilters.LookingFor.values.map(o => o.toLowerCase());
      const pgTarget = filters.LookingFor.values.map(o => o.toLowerCase());
      if (!required.some(r => pgTarget.includes(r))) return false;
    }

    return true;
  });
}
