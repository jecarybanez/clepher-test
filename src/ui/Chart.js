import { useEffect } from "react";
import { useStockOverview } from "../context/StockContext";
import { useSearchParams } from "react-router-dom";
import {
  Area,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Chart() {
  const [searchParams] = useSearchParams();
  const { fetchStockData, stock } = useStockOverview();
  const interval = searchParams.get("interval");
  const timeSeries =
    stock[`Time Series (${interval?.replace("_adjusted", "")})`] || {};
  const data = Object.keys(timeSeries).map((key) => ({
    date: new Date(key).toLocaleDateString(),
    open: timeSeries[key]["1. open"],
    high: timeSeries[key]["2. high"],
    low: timeSeries[key]["3. low"],
    close: timeSeries[key]["4. close"],
    volume: timeSeries[key]["5. volume"] || timeSeries[key]["6. volume"],
    adjustedClose: timeSeries[key]["5. adjusted close"],
    dividendAmount: timeSeries[key]["7. dividend amount"],
    splitCoefficient: timeSeries[key]["8. split coefficient"],
  }));

  const CustomTooltip = ({ payload, label }) => {
    return (
      <div className="custom-tooltip bg-blue-50 border-[1px] border-blue-400 p-2 text-sm">
        <p className="font-bold text-blue-400 pb-2">{label}</p>
        <p>Open: {payload[0]?.payload?.open}</p>
        <p>High: {payload[0]?.payload?.high}</p>
        <p>Low: {payload[0]?.payload?.low}</p>
        <p>Close: {payload[0]?.payload?.close}</p>
        {payload[0]?.payload?.adjustedClose && (
          <p>Adjusted Close: {payload[0]?.payload?.adjustedClose}</p>
        )}
        <p>Volume: {payload[0]?.payload?.volume}</p>
        {payload[0]?.payload?.dividendAmount && (
          <p>Dividend Amount: {payload[0]?.payload?.dividendAmount}</p>
        )}
        {payload[0]?.payload?.splitCoefficient && (
          <p>Split Coefficient: {payload[0]?.payload?.splitCoefficient}</p>
        )}
      </div>
    );
  };

  useEffect(
    function () {
      fetchStockData(interval);
    },
    [interval]
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data} reverseStackOrder={true}>
        <XAxis dataKey="date" reversed />
        <YAxis
          orientation={"right"}
          type="number"
          domain={["dataMin - 1", "dataMax + 1"]}
        />
        <Tooltip content={<CustomTooltip payload={data} />} />
        <Legend />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="close"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default Chart;
