import SearchBar from "./SearchBar";

function Header() {
  function handleScroll(item) {
    const title = document.getElementById(item + "Title");
    title.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="flex bg-blue-50 align-middle p-2 justify-between w-full">
      <SearchBar />
      <div className="flex ">
        <button
          className="uppercase text-sm pr-5 hover:underline hover:text-blue-400"
          onClick={() => handleScroll("company")}
        >
          Company Data
        </button>
        <button
          className="uppercase text-sm pr-5 hover:underline hover:text-blue-400"
          onClick={() => handleScroll("chart")}
        >
          Chart
        </button>
        <button
          className="uppercase text-sm pr-5 hover:underline hover:text-blue-400"
          onClick={() => handleScroll("news")}
        >
          News
        </button>
      </div>
    </header>
  );
}

export default Header;
