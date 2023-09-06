import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <>
      <Header />
      <main className="min-w-[1200px] p-5 m-x-auto min-h-fit">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
