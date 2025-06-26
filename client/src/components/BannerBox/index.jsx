import React from 'react'
import { Link } from 'react-router-dom';

export const BannerBox = (props) => {
  return (
    <div className="box bannerbox overflow-hidden rounded-lg">
      <Link to={props.link}>
        <img src={props.img} className="w-full" alt="" />
      </Link>
    </div>
  );
}
