import { createContext, useContext, useEffect, useReducer } from "react";
import { API_KEY, BASE_URL } from "../utils/constant";
import {
  companyOverview,
  stock5min,
  stockDaily,
  stockDailyAdjusted,
  stockNews,
} from "../utils/tempData";

const StockContext = createContext();

const initialState = {
  symbol: "",
  company: {},
  stock: {},
  news: {},
  latestStock: {},
  isLoading: false,
  isLoadingNews: false,
  isLoadingChart: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "news/loading":
      return { ...state, isLoadingNews: true };

    case "chart/loading":
      return { ...state, isLoadingChart: true };

    case "company/loaded":
      return {
        ...state,
        isLoading: false,
        company: action.payload,
      };

    case "company/symbol":
      return {
        ...state,
        isLoading: false,
        symbol: action.payload,
      };

    case "stock/loaded":
      return {
        ...state,
        isLoading: false,
        stock: action.payload,
      };

    case "latest/loaded":
      return {
        ...state,
        isLoading: false,
        latestStock: action.payload,
      };

    case "news/loaded":
      return {
        ...state,
        isLoading: false,
        news: action.payload,
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function StockProvider({ children }) {
  const [
    {
      company,
      isLoading,
      isLoadingChart,
      isLoadingNews,
      error,
      symbol,
      stock,
      news,
      latestStock,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchCompanyOverview() {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(
            `${BASE_URL}/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
          );
          const data = await res.json();
          // This uses temporary data in case the API reaches the limit
          // const data = companyOverview;

          dispatch({ type: "company/loaded", payload: data });
          dispatch({ type: "company/symbol", payload: data.Symbol });
        } catch {
          dispatch({
            type: "rejected",
            payload: "There was an error loading data...",
          });
        }
      }
      fetchCompanyOverview();
    },
    [symbol]
  );

  async function fetchStockData(interval) {
    dispatch({ type: "loading" });
    let query = "";
    if (interval?.substr(interval.length - 3) === "min") {
      query = `function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`;
    } else {
      query = `function=TIME_SERIES_${interval?.toUpperCase()}&symbol=${symbol}&apikey=${API_KEY}`;
    }

    try {
      const res = await fetch(query);
      const data = await res.json();
      // This uses temporary data in case the API reaches the limit
      // const data =
      //   interval === "5min"
      //     ? stock5min
      //     : interval?.substr(interval.length - 9)?.toUpperCase() === "_ADJUSTED"
      //     ? stockDailyAdjusted
      //     : stockDaily;
      const latestData = Object.entries(
        data["Time Series (" + interval.replace("_adjusted", "") + ")"]
      )[0];

      dispatch({ type: "latest/loaded", payload: latestData });
      dispatch({ type: "stock/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
    }
  }

  async function fetchStockNews() {
    try {
      const res = await fetch(
        `${BASE_URL}/query?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${API_KEY}`
      );
      const data = await res.json();
      // This uses temporary data in case the API reaches the limit
      // const data = stockNews;
      dispatch({ type: "news/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
    }
  }

  return (
    <StockContext.Provider
      value={{
        company,
        isLoading,
        isLoadingChart,
        isLoadingNews,
        error,
        stock,
        news,
        latestStock,
        fetchStockData,
        fetchStockNews,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

function useStockOverview() {
  const context = useContext(StockContext);

  if (context === undefined)
    throw new Error("Cities context was used outside the CitiesProvider");
  return context;
}

export { StockProvider, useStockOverview };
