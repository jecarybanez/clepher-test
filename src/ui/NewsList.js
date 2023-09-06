import { useEffect, useState } from "react";
import { useStockOverview } from "../context/StockContext";
import News from "./News";
import Spinner from "../pages/Spinner";

function NewsList() {
  const { fetchStockNews, news, isLoadingNews } = useStockOverview();
  const [isLoadMore, setIsLoadMore] = useState(false);
  const data = news?.feed;
  const slicedData = data?.slice(0, 5);

  useEffect(function () {
    fetchStockNews();
  }, []);

  if (isLoadingNews) return <Spinner />;
  if (isLoadMore)
    return data?.map((feed) => <News data={feed} key={feed.title} />);

  return (
    <>
      {slicedData?.map((feed) => (
        <News data={feed} key={feed.title} />
      ))}
      <div className="flex justify-center pb-3">
        <button className="text-blue-600" onClick={() => setIsLoadMore(true)}>
          Load More
        </button>
      </div>
    </>
  );
}

export default NewsList;
