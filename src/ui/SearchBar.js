import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (search === "") {
        setData([]);
        return;
      }
      async function fetchSearch() {
        const controller = new AbortController();
        const typedValue = { key: search, value: "typing..." };
        try {
          const res = await fetch(
            `${BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${API_KEY}`,
            { signal: controller.signal }
          );
          const data = await res.json();
          const temp = data?.bestMatches.map((item) => {
            return { key: item["1. symbol"], value: item["2. name"] };
          });
          setData([typedValue, ...temp]);
        } catch {
          setData([
            typedValue,
            { key: "Error: Daily limit reached.", value: "Can't fetch data." },
          ]);
        }
      }
      fetchSearch();
    },
    [search]
  );

  return (
    <div className="w-[600px] relative" onBlur={() => setData([])}>
      <input
        className="w-full rounded-xl border-slate-200 border-[1px] px-5 py-1"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Symbols or companies..."
      />
      <div className="absolute bg-slate-50 w-[600px] z-10 shadow-md">
        {data.map((item) => (
          <div
            value={item.key}
            key={item.key}
            className="flex justify-between py-1 hover:bg-blue-100 cursor-pointer px-5"
            onMouseDown={() => {
              navigate("/stock?&symbol=" + item.key.toUpperCase());
              setSearch("");
              setData([]);
            }}
          >
            <div className="text-slate-800 text-sm">{item.key}</div>
            <div className="text-slate-500 text-sm">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
