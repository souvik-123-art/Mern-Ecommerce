import React from "react";
import { MyListItems } from "./MyListItems";
import { AccountSidebar } from "../../components/AccountSidebar";
export const MyList = () => {
  return (
    <section className="py-10 pb-10">
      <div className="container mx-auto flex gap-5">
        <div className="rightPart w-[20%] relative">
          <AccountSidebar/>
        </div>
        <div className="rightPart w-[80%]">
          <div className="shadow-md bg-white rounded-md">
            <div className="py-2 px-3 text-center border-b border-gray-200">
              <h2 className="text-2xl font-bold text-black/70">My List</h2>
              <p className="mt-2 text-lg mb-6 font-light">
                There are <span className="font-bold text-primary">2 </span>
                Products in My List
              </p>
            </div>
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
          </div>
        </div>
      </div>
    </section>
  );
};
