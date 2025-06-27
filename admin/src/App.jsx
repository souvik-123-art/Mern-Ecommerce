import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Header } from "./Components/Header";
import "../src/App.css";
import { Sidebar } from "./Components/Sidebar";
import { useSelector } from "react-redux";
function App() {
  const sideBarOpen = useSelector((state) => state.sidePanel.sidePanelOpen);
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`sidebarWrapper ${
                  sideBarOpen === true ? "w-[15%]" : "w-0"
                } transition-all duration-300 overflow-hidden`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight ${
                  sideBarOpen === true ? "w-[85%]" : "w-[100%]"
                }  py-4 px-5 transition-all duration-300`}
              >
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
