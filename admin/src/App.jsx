import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Header } from "./Components/Header";
import '../src/App.css'
import { Sidebar } from "./Components/Sidebar";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div className="sidebarWrapper w-[15%]">
                <Sidebar />
              </div>
              <div className="contentRight w-[75%] py-3 px-3">
                <Dashboard/>
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
