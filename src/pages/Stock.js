import { useNavigate, useSearchParams } from "react-router-dom";
import { useStockOverview } from "../context/StockContext";
import { useState } from "react";

import EmptyPage from "../ui/EmptyPage";
import KeyData from "../ui/KeyData";
import Filter from "../ui/Filter";
import Spinner from "./Spinner";
import Chart from "../ui/Chart";
import News from "../ui/NewsList";

function Stock() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isOpenDescription, setIsOpenDescription] = useState(true);
  const symbol = searchParams.get("symbol") ? searchParams.get("symbol") : "";
  const { company, isLoading, latestStock } = useStockOverview();
  const latestStockValues = latestStock[1] || {};
  const keyData = [
    { name: "Exchange", value: company.Exchange },
    { name: "Sector", value: company.Sector },
    { name: "Industry", value: company.Industry },
    { name: "Country", value: company.Country },
    { name: "Fiscal Year End", value: company.FiscalYearEnd },
    { name: "Latest Quarter", value: company.LatestQuarter },
    { name: "Market Capitalization", value: company.MarketCapitalization },
    { name: "EBITDA", value: company.EBITDA },
    { name: "PE Ratio", value: company.PERatio },
    { name: "PEG Ratio", value: company.PEGRatio },
    { name: "Book Value", value: company.BookValue },
    { name: "Dividend Per Share", value: company.DividendPerShare },
    { name: "Dividend Yield", value: company.DividendYield },
    { name: "EPS", value: company.EPS },
    { name: "Revenue Per Share TTM", value: company.RevenuePerShareTTM },
    { name: "Profit Margin", value: company.ProfitMargin },
    { name: "Operating Margin TTM", value: company.OperatingMarginTTM },
    { name: "Return On Assets TTM", value: company.OperatingMarginTTM },
    { name: "Return On Equity TTM", value: company.ReturnOnEquityTTM },
    { name: "Revenue TTM", value: company.RevenueTTM },
    { name: "Gross Profit TTM", value: company.GrossProfitTTM },
    { name: "Diluted EPS TTM", value: company.DilutedEPSTTM },
    {
      name: "Quarterly Earnings Growth YOY",
      value: company.QuarterlyEarningsGrowthYOY,
    },
    {
      name: "Quarterly Revenue Growth YOY",
      value: company.QuarterlyRevenueGrowthYOY,
    },
    { name: "Analyst Target Price", value: company.AnalystTargetPrice },
    { name: "Trailing PE", value: company.TrailingPE },
    { name: "Forward PE", value: company.ForwardPE },
    { name: "Price To Sales Ratio TTM", value: company.PriceToSalesRatioTTM },
    { name: "Price To Book Ratio", value: company.PriceToBookRatio },
    { name: "EV To Revenue", value: company.EVToRevenue },
    { name: "EV To EBITDA", value: company.EVToEBITDA },
    { name: "Beta", value: company.Beta },
    { name: "52 Week High", value: company["52WeekHigh"] },
    { name: "5 2Week Low", value: company["52WeekLow"] },
    { name: "50 Day Moving Average", value: company["50DayMovingAverage"] },
    { name: "200 Day Moving Average", value: company["200DayMovingAverage"] },
    { name: "Shares Outstanding", value: company.SharesOutstanding },
    { name: "Dividend Date", value: company.DividendDate },
    { name: "Ex Dividend Date", value: company.ExDividendDate },
  ];
  const filterList = [
    "1min",
    "5min",
    "15min",
    "30min",
    "60min",
    "Daily",
    "Weekly",
    "Monthly",
  ];

  if (symbol === "") return <EmptyPage />;
  if (searchParams.get("interval") === null)
    navigate("/stock?symbol=" + symbol + "&interval=5min");
  if (isLoading) return <Spinner />;

  console.log("latestStock", latestStockValues);

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-3xl">
            {company.Name} - {company.AssetType}
          </h1>
          <h2 className="font-bold text-xl">({symbol})</h2>
          <p className="text-xs text-slate-600">
            {company.Exchange} - Currency in {company.Currency}
          </p>
        </div>
        <div className="text-right">
          <h1 className="font-bold text-3xl">
            {latestStockValues["4. close"]}
          </h1>
          <p className="text-xs">
            <span className="text-green-600 mr-2">
              {latestStockValues["2. high"]}▲
            </span>
            <span className="text-red-600">{latestStockValues["3. low"]}▼</span>
          </p>
          <p className="text-xs">{latestStockValues["5. volume"]}</p>
          <p className="text-slate-600 text-xs">{latestStock[0]}</p>
        </div>
      </div>
      <div
        className={`flex text-slate-600 pt-2 text-sm overflow-hidden transition-all duration-300 ${
          isOpenDescription ? "max-h-full" : "max-h-0"
        }`}
      >
        <p className="border-r-[1px] border-blue-200 pr-4">{company.Address}</p>
        <p className="pl-5">{company.Description}</p>
      </div>
      <div
        className="cursor-pointer hover:font-bold text-blue-400 text-center"
        onClick={() => setIsOpenDescription(!isOpenDescription)}
      >
        {isOpenDescription ? "- Close" : "+ Open"} Description
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col min-w-[400px]">
          <h2
            id="companyTitle"
            className="text-xl underline underline-offset-4 uppercase pb-3 border-blue-200 border-b-[1px] text-blue-600 "
          >
            Company Data
          </h2>
          {keyData.map((d) => (
            <KeyData keyData={d} key={d.name} />
          ))}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h2
                id="chartTitle"
                className="text-xl underline underline-offset-4 uppercase pb-3 text-blue-600"
              >
                Chart
              </h2>
              <Filter field="interval" filterList={filterList} />
            </div>
            <div className="w-full">
              <Chart />
            </div>
          </div>
          <div className="flex flex-col">
            <h2
              id="newsTitle"
              className="text-xl underline underline-offset-4 uppercase pb-3 text-blue-600"
            >
              News
            </h2>
            <News />
          </div>
        </div>
      </div>
    </>
  );
}

export default Stock;
