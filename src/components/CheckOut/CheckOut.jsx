import React from "react";
import { Payment } from "./Payment";
import { Summary } from "./Summary";
import { NavLink, useNavigate } from "react-router-dom";

export function CheckOut() {
  const ticketDetails = JSON.parse(sessionStorage.getItem("BookingDetails"));
  const navigate = useNavigate();
  return (
    <div className="check-out">
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <h1 className="checkout-heading">Checkout</h1>
      <div className="wraper-checkout">
        <Summary BookingDetails={ticketDetails} />
        <Payment />
      </div>
    </div>
  );
}
