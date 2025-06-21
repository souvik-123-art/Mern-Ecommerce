import React from 'react'
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { IoMdGift } from "react-icons/io";
import { MdOutlineSupportAgent } from "react-icons/md";
import { Link } from 'react-router-dom';
import { PiChatsBold } from "react-icons/pi";
import Button from '@mui/material/Button';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
export const Footer = () => {
  return (
    <footer className="py-8 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-center mb-12 pt-8 gap-2">
          <div className="col group flex items-center justify-center flex-col w-1/5">
            <LiaShippingFastSolid className="text-[40px] group-hover:-translate-y-2 transition duration-300 group-hover:text-primary mb-1" />
            <h3 className="mb-2 text-[18px] font-[500]">Free Shipping</h3>
            <p className="text-[#555] text-sm">For all Orders Over $100</p>
          </div>
          <div className="col group flex items-center justify-center flex-col w-1/5">
            <GiReturnArrow className="text-[40px] group-hover:-translate-y-2 transition duration-300 group-hover:text-primary mb-1" />
            <h3 className="mb-2 text-[18px] font-[500]">30 Days Returns</h3>
            <p className="text-[#555] text-sm">For an Exchange Product</p>
          </div>
          <div className="col group flex items-center justify-center flex-col w-1/5">
            <RiSecurePaymentLine className="text-[40px] group-hover:-translate-y-2 transition duration-300 group-hover:text-primary mb-1" />
            <h3 className="mb-2 text-[18px] font-[500]">Secured Payment</h3>
            <p className="text-[#555] text-sm">Payment Cards Accepted</p>
          </div>
          <div className="col group flex items-center justify-center flex-col w-1/5">
            <IoMdGift className="text-[40px] group-hover:-translate-y-2 transition duration-300 group-hover:text-primary mb-1" />
            <h3 className="mb-2 text-[18px] font-[500]">Special Gifts</h3>
            <p className="text-[#555] text-sm">Our First Product Order</p>
          </div>
          <div className="col group flex items-center justify-center flex-col w-1/5">
            <MdOutlineSupportAgent className="text-[40px] group-hover:-translate-y-2 transition duration-300 group-hover:text-primary mb-1" />
            <h3 className="mb-2 text-[18px] font-[500]">Support 24/7</h3>
            <p className="text-[#555] text-sm">Contact us Anytime</p>
          </div>
        </div>
        <hr />
        <div className="footer flex py-8">
          <div className="part1 w-[25%]">
            <h2 className="text-[25px] font-bold mb-4">Contact us</h2>
            <p className="text-[16px] text-[#333] mb-5">
              Classyshop - Mega Super Store <br /> 507-Union Trade Centre France
            </p>
            <Link className="link transition" to="mailto: someone@example.com">
              sales@yourcompany.com
            </Link>
            <span className="block mb-4 mt-3 text-[25px] font-semibold text-primary">
              (+91) 9876-543-210
            </span>
            <div className="text-xl gap-3 flex items-center">
              <PiChatsBold className="text-5xl text-primary" />
              <span className="font-semibold">
                Online Chat <br /> Get Expert Help
              </span>
            </div>
          </div>
          <div className="part2 w-[40%] flex">
            <div className="part2_col1 w-1/2">
              <h2 className="text-[23px] font-[600] mb-4">Products</h2>
              <ul>
                <li className="text-sm  mb-4 hover:translate-x-2 transition duration-300">
                  <Link className="link" to="/">
                    Prices drop
                  </Link>
                </li>
                <li className="text-sm  mb-4 hover:translate-x-2 transition duration-300">
                  <Link className="link" to="/">
                    New products
                  </Link>
                </li>
                <li className="text-sm  mb-4 hover:translate-x-2 transition duration-300">
                  <Link className="link" to="/">
                    Best sales
                  </Link>
                </li>
                <li className="text-sm  mb-4 hover:translate-x-2 transition duration-300">
                  <Link className="link" to="/">
                    Contact us
                  </Link>
                </li>
                <li className="text-sm  mb-4 hover:translate-x-2 transition duration-300">
                  <Link className="link" to="/">
                    Sitemap
                  </Link>
                </li>
                <li className="text-sm  mb-4 hover:translate-x-2 transition duration-300">
                  <Link className="link" to="/">
                    Stores
                  </Link>
                </li>
              </ul>
            </div>
            <div className="part2_col2 w-1/2">
              <h2 className="text-[23px] font-[600] mb-4">Our Company</h2>
              <ul>
                <li className="text-sm w-full mb-4 hover:translate-x-2 transition duration-300">
                  <Link className="link" to="/">
                    Delivery
                  </Link>
                </li>
                <li className="text-sm w-full mb-4 hover:translate-x-2 transition duration-300">
                  <Link className="link" to="/">
                    Legal Notice
                  </Link>
                </li>
                <li className="text-sm w-full mb-4 hover:translate-x-2 transition duration-300">
                  <Link className="link" to="/">
                    Terms and conditions of use
                  </Link>
                </li>
                <li className="text-sm w-full mb-4 hover:translate-x-2 transition duration-300">
                  <Link className="link" to="/">
                    About us
                  </Link>
                </li>
                <li className="text-sm w-full mb-4 hover:translate-x-2 transition duration-300">
                  <Link className="link" to="/">
                    Secure payment
                  </Link>
                </li>
                <li className="text-sm w-full mb-4 hover:translate-x-2 transition duration-300">
                  <Link className="link" to="/">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="part3 w-[35%]">
            <h2 className="text-[23px] font-[600] mb-4">
              Subscribe to newsletter
            </h2>
            <p className="mb-8 text-sm">
              Subscribe to our latest newsletter to get news about special
              discounts.
            </p>
            <form>
              <input
                type="text"
                className="w-full px-4 py-3 outline-none rounded-md border border-[#dadada] mb-3"
                placeholder="Your Email Address"
              />
              <Button className="!px-4 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 ">
                Subscribe
              </Button>
              <FormGroup className="!mt-6">
                <FormControlLabel
                  control={<Checkbox />}
                  label="I agree to the terms and conditions and the privacy policy"
                />
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
