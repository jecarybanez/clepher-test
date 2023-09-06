import { Link } from "react-router-dom";
import { convertToDate } from "../utils/dateHelper";

function News({ data = {} }) {
  return (
    <Link
      to={data.url}
      className="w-full flex flex-row gap-5 hover:bg-blue-200 transition-colors mb-2"
    >
      <img
        className="max-w-[200px]"
        src={data.banner_image}
        alt={data.banner_image}
      />
      <div>
        <h2 className="text-md text-blue-600 pt-1">{data.title}</h2>
        <p className="text-xs text-slate-600">
          {new Date(convertToDate(data?.time_published)).toLocaleDateString()}{" "}
          by:{" "}
          {data?.authors?.map((author, i) => (i > 0 ? ", " + author : author))}
        </p>
        <p className="text-sm">{data.summary}</p>
      </div>
    </Link>
  );
}

export default News;
