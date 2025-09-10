import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { IoMdGift } from "react-icons/io";
import { MdOutlineSupportAgent } from "react-icons/md";
import { Link } from "react-router-dom";
import { PiChatsBold } from "react-icons/pi";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
export const Footer = () => {
  return (
    <footer className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 mb-12 pt-8">
          {[
            {
              icon: (
                <LiaShippingFastSolid className="text-[40px] group-hover:-translate-y-2 transition duration-300 group-hover:text-primary mb-1" />
              ),
              title: "Free Shipping",
              desc: "For all Orders Over $100",
            },
            {
              icon: (
                <GiReturnArrow className="text-[40px] group-hover:-translate-y-2 transition duration-300 group-hover:text-primary mb-1" />
              ),
              title: "30 Days Returns",
              desc: "For an Exchange Product",
            },
            {
              icon: (
                <RiSecurePaymentLine className="text-[40px] group-hover:-translate-y-2 transition duration-300 group-hover:text-primary mb-1" />
              ),
              title: "Secured Payment",
              desc: "Payment Cards Accepted",
            },
            {
              icon: (
                <IoMdGift className="text-[40px] group-hover:-translate-y-2 transition duration-300 group-hover:text-primary mb-1" />
              ),
              title: "Special Gifts",
              desc: "Our First Product Order",
            },
            {
              icon: (
                <MdOutlineSupportAgent className="text-[40px] group-hover:-translate-y-2 transition duration-300 group-hover:text-primary mb-1" />
              ),
              title: "Support 24/7",
              desc: "Contact us Anytime",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center w-full sm:w-1/2 md:w-1/5"
            >
              {item.icon}
              <h3 className="mb-2 text-[18px] font-[500]">{item.title}</h3>
              <p className="text-[#555] text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <hr />

        <div className="footer flex flex-wrap gap-8 py-8">
          {/* Part 1 */}
          <div className="w-full md:w-1/4">
            <h2 className="text-[25px] font-bold mb-4">Contact us</h2>
            <p className="text-[16px] text-[#333] mb-5">
              Classyshop - Mega Super Store <br /> 507-Union Trade Centre France
            </p>
            <Link to="mailto:someone@example.com" className="link transition">
              sales@yourcompany.com
            </Link>
            <span className="block mb-4 mt-3 text-[25px] font-semibold text-primary">
              (+91) 9876-543-210
            </span>
            <div className="flex items-center gap-3 text-xl">
              <PiChatsBold className="text-5xl text-primary" />
              <span className="font-semibold">
                Online Chat <br /> Get Expert Help
              </span>
            </div>
          </div>

          {/* Part 2 */}
          <div className="w-full md:w-1/2 flex flex-wrap gap-8">
            <div className="w-full sm:w-1/2">
              <h2 className="text-[23px] font-[600] mb-4">Products</h2>
              <ul>
                {[
                  "Prices drop",
                  "New products",
                  "Best sales",
                  "Contact us",
                  "Sitemap",
                  "Stores",
                ].map((text, idx) => (
                  <li
                    key={idx}
                    className="text-sm mb-4 hover:translate-x-2 transition duration-300"
                  >
                    <Link to="/" className="link">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full sm:w-1/2">
              <h2 className="text-[23px] font-[600] mb-4">Our Company</h2>
              <ul>
                {[
                  "Delivery",
                  "Legal Notice",
                  "Terms and conditions of use",
                  "About us",
                  "Secure payment",
                  "Login",
                ].map((text, idx) => (
                  <li
                    key={idx}
                    className="text-sm mb-4 hover:translate-x-2 transition duration-300"
                  >
                    <Link to="/" className="link">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Part 3 */}
          <div className="w-full md:w-1/4">
            <h2 className="text-[23px] font-[600] mb-4">
              Subscribe to newsletter
            </h2>
            <p className="mb-8 text-sm">
              Subscribe to our latest newsletter to get news about special
              discounts.
            </p>
            <form>
              <input
                type="email"
                className="w-full px-4 py-3 outline-none rounded-md border border-[#dadada] mb-3"
                placeholder="Your Email Address"
              />
              <Button className="!px-4 !py-2 !bg-primary !text-white !transition hover:!bg-gray-900 w-full">
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
};
