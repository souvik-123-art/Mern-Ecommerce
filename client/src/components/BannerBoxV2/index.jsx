import React from 'react'
import { Link } from 'react-router-dom';

export const BannerBoxV2 = (props) => {
  return (
    <div className="bannerBoxV2 w-full group overflow-hidden rounded-md relative">
      <img
        src={props.img}
        alt=""
        className="w-full transition-all duration-500 group-hover:scale-105"
      />
      <div className={`info absolute px-5 py-7 z-50 top-0 ${props.info==="left"? 'left-0' : 'right-0'} w-1/2 h-full`}>
        <h2 className='text-[23px] font-[500] mb-2'>Samsung Gear VR Camera</h2>
        <span className='block text-primary font-bold text-2xl mb-6'>$129.00</span>
        <Link to="/" className="underline link text-2xl">
          Shop Now
        </Link>
      </div>
    </div>
  );
}
