// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Headers";

function AppLayout() {
  return (
    <>
      <Headers />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default AppLayout;
