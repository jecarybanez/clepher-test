import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Stock from "./pages/Stock";
import { StockProvider } from "./context/StockContext";

function App() {
  return (
    <StockProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              element={
                <Navigate replace to="stock?symbol=AAPL&interval=5min" />
              }
            />
            <Route path="stock" element={<Stock />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </StockProvider>
  );
}

export default App;
