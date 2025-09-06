import React, { useEffect } from "react";
import { MyListItems } from "./MyListItems";
import { AccountSidebar } from "../../components/AccountSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const MyList = () => {
  const navigate = useNavigate();
  const myListData = useSelector((state) => state.myListData.myListData);
  const userDetails = useSelector((state) => state.UserDetails.userDetails);
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token === undefined || token === null || token === "") {
      navigate("/");
    }
  }, [userDetails]);
  return (
    <section className="py-10 pb-10">
      <div className="container mx-auto flex gap-5">
        <div className="rightPart w-[20%] relative">
          <AccountSidebar />
        </div>
        <div className="rightPart w-[80%]">
          <div className="shadow-md bg-white rounded-md">
            <div className="py-2 px-3 text-center border-b border-gray-200">
              <h2 className="text-2xl font-bold text-black/70">My List</h2>
              <p className="mt-2 text-lg mb-6 font-light">
                There are{" "}
                <span className="font-bold text-primary">
                  {myListData?.length}{" "}
                </span>
                Products in My List
              </p>
            </div>
            {myListData?.length !== 0 ? (
              myListData?.map((item) => (
                <MyListItems key={item?._id} data={item} />
              ))
            ) : (
              <div className="w-full h-[500px] flex flex-col items-center justify-center gap-5">
                <img
                  src="/Images/broken-heart.png"
                  className="w-auto h-[200px] opacity-80"
                  alt=""
                />
                <span className="font-bold font-['lexend'] text-4xl text-black/50 p-16">
                  No Products In Your List!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
