import React from "react";
import "./WishList.css";
import { WishListCard } from "./WishListCard";

export function WishList() {
  let showWishList;
  if (localStorage.getItem("wishlist") === null) {
    showWishList = [];
  } else {
    showWishList = JSON.parse(localStorage.getItem("wishlist"));
  }
  const createWishList = (arr) => {
    if (arr.length === 0) {
      return <h1>No data added to Wishlist</h1>;
    } else {
      return arr.map((item, index) => {
        return (
          <div className="wishlist-card" key={`wish${index}`}>
            <WishListCard index={index} wishData={item} />
          </div>
        );
      });
    }
  };
  return <div className="wrapper-wishlist">{createWishList(showWishList)}</div>;
}
