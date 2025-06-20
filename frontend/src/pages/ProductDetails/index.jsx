import React from 'react'
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { ProductZoom } from '../../components/ProductZoom';
import Rating from "@mui/material/Rating";
export const ProductDetails = () => {
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
          <div className="proCont w-[60%]">
            <h1 className="text-[22px] font-[600] text-[rgba(0,0,0,0.7)] mb-2">
              Floral Beads and Stones Pure Chiffon Saree
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
            </div>
            <p className='mt-4 text-gray-400 text-sm leading-loose'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eum dolorem quibusdam. Excepturi praesentium culpa quo, mollitia assumenda, quam ullam aperiam illo et vero inventore accusantium qui tempora harum odio!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
