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
    <section className="py-10 pb-10 w-full">
      <div className="container mx-auto flex flex-col md:flex-row gap-5 px-2 sm:px-4">
        {/* Sidebar */}
        <div className="leftPart w-full md:w-[25%] relative">
          <AccountSidebar />
        </div>

        {/* My List Content */}
        <div className="rightPart w-full md:w-[75%] flex flex-col gap-5">
          <div className="shadow-md bg-white rounded-md w-full">
            <div className="py-4 px-3 text-center sm:text-left border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-black/70">
                My List
              </h2>
              <p className="mt-2 text-base sm:text-lg mb-4 sm:mb-6 font-light">
                There are{" "}
                <span className="font-bold text-primary">
                  {myListData?.length}{" "}
                </span>
                Products in My List
              </p>
            </div>

            {myListData?.length !== 0 ? (
              <div className="flex flex-col gap-3 sm:gap-5 p-2 sm:p-4">
                {myListData?.map((item) => (
                  <MyListItems key={item?._id} data={item} />
                ))}
              </div>
            ) : (
              <div className="w-full h-[400px] sm:h-[500px] flex flex-col items-center justify-center gap-5 px-2 sm:px-0">
                <img
                  src="/Images/broken-heart.png"
                  className="w-auto h-[150px] sm:h-[200px] opacity-80"
                  alt="No Products"
                />
                <span className="font-bold font-['lexend'] text-2xl sm:text-4xl text-black/50 text-center px-4 sm:px-16">
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
