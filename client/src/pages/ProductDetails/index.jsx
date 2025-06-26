import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { ProductZoom } from "../../components/ProductZoom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { QtyBox } from "../../components/QtyBox";
import { FaOpencart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { GoGitCompare } from "react-icons/go";
import TextField from "@mui/material/TextField";
import { ProductSlider } from "../../components/ProductSlider";
export const ProductDetails = () => {
  const [productActionIndex, setProductActionIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-5">
      <div className="container mx-auto">
        <Breadcrumbs separator="|" aria-label="breadcrumb">
          <Link
            underline="hover"
            className="link transition"
            color="inherit"
            href="/"
          >
            Home
          </Link>
          <Link
            separator="|"
            underline="hover"
            color="inherit"
            href="/"
            className="link transition"
          >
            Fashion
          </Link>
          <Link separator="|" underline="none" color="inherit" className="none">
            Floral Beads and Stones Pure Chiffon Saree
          </Link>
        </Breadcrumbs>
      </div>
      <div className="bg-white py-5 mt-4">
        <div className="container mx-auto flex gap-8">
          <div className="productzoomcontainer w-[40%] overflow-hidden">
            <ProductZoom />
          </div>
          <div className="proCont w-[60%] flex flex-col  justify-center items-start px-10">
            <h1 className="text-[22px] font-[600] text-[rgba(0,0,0,0.7)] mb-2">
              AKHILAM Women's Woven Design Georgette Kanjeevaram Saree With
              Unstitched Blouse Piece
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 flex gap-2">
                Brands:
                <span className="font-[500] text-[rgba(0,0,0,0.7)]">
                  Koskii
                </span>
              </span>
              <Rating
                name="size-small"
                defaultValue={4}
                readOnly
                size="small"
              />
              <span className="text-sm text-gray-700">Reviews (5)</span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="oldPrice line-through text-gray-500 text-[20px] font-[500]">
                $58.00
              </span>
              <span className="price text-primary text-[20px] font-[600]">
                $58.00
              </span>
              <span className="text-sm">
                Available In Stock:&nbsp;&nbsp;
                <span className="text-green-500 font-semibold">147 Items</span>
              </span>
            </div>
            <p className="mt-4 text-gray-400 text-sm leading-loose">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates eum dolorem quibusdam. Excepturi praesentium culpa quo,
              mollitia assumenda, quam ullam aperiam illo et vero inventore
              accusantium qui tempora harum odio!
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm">Size:</span>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setProductActionIndex(0)}
                  className={`!w-[40px] !min-w-[40px] !rounded-full ${
                    productActionIndex === 0
                      ? "!bg-primary !text-[#fff] "
                      : " !text-[#333] "
                  } !h-[40px] !text-lg`}
                >
                  S
                </Button>
                <Button
                  onClick={() => setProductActionIndex(1)}
                  className={`!w-[40px] !min-w-[40px] !rounded-full ${
                    productActionIndex === 1
                      ? "!bg-primary !text-[#fff] "
                      : " !text-[#333] "
                  } !h-[40px] !text-lg`}
                >
                  M
                </Button>
                <Button
                  onClick={() => setProductActionIndex(2)}
                  className={`!w-[40px] !min-w-[40px] !rounded-full ${
                    productActionIndex === 2
                      ? "!bg-primary !text-[#fff] "
                      : " !text-[#333] "
                  } !h-[40px] !text-lg`}
                >
                  L
                </Button>
                <Button
                  onClick={() => setProductActionIndex(3)}
                  className={`!w-[40px] !min-w-[40px] !rounded-full ${
                    productActionIndex === 3
                      ? "!bg-primary !text-[#fff] "
                      : "!text-[#333] "
                  } !h-[40px] !text-lg`}
                >
                  XL
                </Button>
              </div>
            </div>
            <p className="text-sm mt-4 mb-2 text-gray-600">
              Free Shipping (Est. Delivery Time 2-3 Days)
            </p>
            <div className="flex items-center mt-2 mb-8">
              <div className="qtyboxWrapper">
                <QtyBox />
              </div>
            </div>
            <Button className="!px-4 !ml-1 !mb-6 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 flex items-center gap-1">
              <FaOpencart className="text-xl" /> Add To Cart
            </Button>
            <div className="flex items-center gap-4">
              <span className="flex link transition cursor-pointer gap-2 items-center">
                <FaRegHeart className="text-lg" /> Add To Wishlist
              </span>
              <span className="flex link transition cursor-pointer gap-2 items-center">
                <GoGitCompare className="text-lg" /> Add To Compare
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-10">
        <div className="flex items-center gap-8 mb-4">
          <span
            onClick={() => setActiveTab(0)}
            className={`link transition ${
              activeTab === 0 && "text-red-500"
            } cursor-pointer text-lg font-semibold`}
          >
            Description
          </span>
          <span
            onClick={() => setActiveTab(1)}
            className={`link transition ${
              activeTab === 1 && "text-red-500"
            } cursor-pointer text-lg font-semibold`}
          >
            Product Details
          </span>
          <span
            onClick={() => setActiveTab(2)}
            className={`link transition ${
              activeTab === 2 && "text-red-500"
            } cursor-pointer text-lg font-semibold`}
          >
            Reviews
          </span>
        </div>
        {activeTab === 0 && (
          <div className="shadow-md w-full py-5 px-8 rounded-md bg-white text-gray-500">
            <p className="mb-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores cum animi repellendus enim sint libero saepe earum
              dolorem. Debitis consectetur ipsa suscipit? Magni odio maxime cum,
              saepe numquam officia excepturi.
            </p>
            <h3 className="font-bold mb-2 text-lg text-black/70">
              Lightweight Design
            </h3>
            <p className="mb-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              fugit nisi porro autem quisquam iusto corporis expedita unde error
              a!
            </p>
            <h3 className="font-bold mb-2 text-lg text-black/70">
              Lightweight Design
            </h3>
            <p className="mb-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              fugit nisi porro autem quisquam iusto corporis expedita unde error
              a!
            </p>
            <h3 className="font-bold mb-2 text-lg text-black/70">
              Lightweight Design
            </h3>
            <p className="mb-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              fugit nisi porro autem quisquam iusto corporis expedita unde error
              a!
            </p>
          </div>
        )}
        {activeTab === 1 && (
          <div className="shadow-md w-full py-5 px-8 rounded-md bg-white text-gray-500">
            <div class="relative overflow-x-auto rounded-md border border-gray-200">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead class="text-xs text-white uppercase bg-gray-800">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Material composition
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Fit type
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Sleeve type
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Neck style
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b border-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      52% Cotton 48% Poly
                    </th>
                    <td class="px-6 py-4">Regular Fit</td>
                    <td class="px-6 py-4">Half Sleeve</td>
                    <td class="px-6 py-4">Collared Neck</td>
                  </tr>
                  <tr class="bg-white border-b border-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      52% Cotton 48% Poly
                    </th>
                    <td class="px-6 py-4">Regular Fit</td>
                    <td class="px-6 py-4">Half Sleeve</td>
                    <td class="px-6 py-4">Collared Neck</td>
                  </tr>
                  <tr class="bg-white border-b border-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      52% Cotton 48% Poly
                    </th>
                    <td class="px-6 py-4">Regular Fit</td>
                    <td class="px-6 py-4">Half Sleeve</td>
                    <td class="px-6 py-4">Collared Neck</td>
                  </tr>
                  <tr class="bg-white border-b border-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      52% Cotton 48% Poly
                    </th>
                    <td class="px-6 py-4">Regular Fit</td>
                    <td class="px-6 py-4">Half Sleeve</td>
                    <td class="px-6 py-4">Collared Neck</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div className="shadow-md w-full py-5 px-8 rounded-md bg-white text-gray-900">
            <div className="reviewForm">
              <h2 className="text-lg font-semibold mb-3">Add a Review</h2>
              <form className="flex flex-col">
                <TextField
                  id="outlined-basic"
                  label="write your review"
                  multiline
                  className="w-1/2 !mb-4 !font-['lexend']"
                  rows={5}
                  variant="outlined"
                />
                <Rating defaultValue={1} size="mediam" />
                <Button className="!px-4 !mt-4 !mb-6 !self-start !py-2 !bg-primary !text-white !transition hover:!bg-gray-900">
                  Submit
                </Button>
              </form>
            </div>
            <div className="w-full proReviewContainer">
              <h2 className="text-lg font-semibold mb-6">Customer Reviews</h2>
              <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden">
                <div className="review w-full mb-3">
                  <article className="border border-gray-200 p-5 rounded-md">
                    <div class="flex items-center mb-4">
                      <img
                        class="w-10 h-10 me-4 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPnE_fy9lLMRP5DLYLnGN0LRLzZOiEpMrU4g&s"
                        alt=""
                      />
                      <div class="font-medium text-black/80">
                        <p>Jese Leos</p>
                      </div>
                    </div>
                    <div class="mb-3 text-sm text-gray-800">
                      <p className="mb-2">
                        <time datetime="2017-03-03 19:00">March 3, 2017</time>
                      </p>
                      <Rating
                        name="size-small"
                        defaultValue={4}
                        readOnly
                        size="small"
                      />
                    </div>
                    <p class="mb-2 text-gray-800">
                      This is my third Invicta Pro Diver. They are just
                      fantastic value for money. This one arrived yesterday and
                      the first thing I did was set the time, popped on an
                      identical strap from another Invicta and went in the
                      shower with it to test the waterproofing.... No problems.
                    </p>
                  </article>
                </div>
                <div className="review w-full mb-3">
                  <article className="border border-gray-200 p-5 rounded-md">
                    <div class="flex items-center mb-4">
                      <img
                        class="w-10 h-10 me-4 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPnE_fy9lLMRP5DLYLnGN0LRLzZOiEpMrU4g&s"
                        alt=""
                      />
                      <div class="font-medium text-black/80">
                        <p>Jese Leos</p>
                      </div>
                    </div>
                    <div class="mb-3 text-sm text-gray-800">
                      <p className="mb-2">
                        <time datetime="2017-03-03 19:00">March 3, 2017</time>
                      </p>
                      <Rating
                        name="size-small"
                        defaultValue={4}
                        readOnly
                        size="small"
                      />
                    </div>
                    <p class="mb-2 text-gray-800">
                      This is my third Invicta Pro Diver. They are just
                      fantastic value for money. This one arrived yesterday and
                      the first thing I did was set the time, popped on an
                      identical strap from another Invicta and went in the
                      shower with it to test the waterproofing.... No problems.
                    </p>
                  </article>
                </div>
                <div className="review w-full mb-3">
                  <article className="border border-gray-200 p-5 rounded-md">
                    <div class="flex items-center mb-4">
                      <img
                        class="w-10 h-10 me-4 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPnE_fy9lLMRP5DLYLnGN0LRLzZOiEpMrU4g&s"
                        alt=""
                      />
                      <div class="font-medium text-black/80">
                        <p>Jese Leos</p>
                      </div>
                    </div>
                    <div class="mb-3 text-sm text-gray-800">
                      <p className="mb-2">
                        <time datetime="2017-03-03 19:00">March 3, 2017</time>
                      </p>
                      <Rating
                        name="size-small"
                        defaultValue={4}
                        readOnly
                        size="small"
                      />
                    </div>
                    <p class="mb-2 text-gray-800">
                      This is my third Invicta Pro Diver. They are just
                      fantastic value for money. This one arrived yesterday and
                      the first thing I did was set the time, popped on an
                      identical strap from another Invicta and went in the
                      shower with it to test the waterproofing.... No problems.
                    </p>
                  </article>
                </div>
                <div className="review w-full mb-3">
                  <article className="border border-gray-200 p-5 rounded-md">
                    <div class="flex items-center mb-4">
                      <img
                        class="w-10 h-10 me-4 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPnE_fy9lLMRP5DLYLnGN0LRLzZOiEpMrU4g&s"
                        alt=""
                      />
                      <div class="font-medium text-black/80">
                        <p>Jese Leos</p>
                      </div>
                    </div>
                    <div class="mb-3 text-sm text-gray-800">
                      <p className="mb-2">
                        <time datetime="2017-03-03 19:00">March 3, 2017</time>
                      </p>
                      <Rating
                        name="size-small"
                        defaultValue={4}
                        readOnly
                        size="small"
                      />
                    </div>
                    <p class="mb-2 text-gray-800">
                      This is my third Invicta Pro Diver. They are just
                      fantastic value for money. This one arrived yesterday and
                      the first thing I did was set the time, popped on an
                      identical strap from another Invicta and went in the
                      shower with it to test the waterproofing.... No problems.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container mx-auto mt-12">
        <h3 className="text-3xl font-semibold mb-2">Related Products</h3>
        <ProductSlider items={6} />
      </div>
    </section>
  );
};
