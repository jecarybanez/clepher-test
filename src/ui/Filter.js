import { useSearchParams } from "react-router-dom";

function Filter({ field, filterList }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(field) || filterList.at(0).value;
  const isAdjusted =
    currentFilter.substr(currentFilter.length - 9) === "_adjusted";

  function handleClick(value) {
    if (value === currentFilter && isAdjusted) {
      searchParams.set(field, value.replace("_adjusted", ""));
    }
    if (value === currentFilter && !isAdjusted) {
      searchParams.set(field, value + "_adjusted");
    }
    if (value !== currentFilter) {
      searchParams.set(field, value);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-2 justify-center items-center">
      {filterList.map((filter) => (
        <button
          className={`cursor-pointer px-2 py-1 rounded-md text-xs ${
            filter === currentFilter || filter + "_adjusted" === currentFilter
              ? "bg-blue-200 font-bold"
              : "bg-slate-100"
          }`}
          onClick={() => handleClick(filter)}
          active={filter === currentFilter ? "true" : null}
          disabled={
            filter === currentFilter &&
            filter.substr(filter.length - 3) === "min"
          }
          key={filter}
        >
          {filter}
          {filter === currentFilter.replace("_adjusted", "") &&
            isAdjusted &&
            ": Adjusted"}
        </button>
      ))}
    </div>
  );
}

export default Filter;
