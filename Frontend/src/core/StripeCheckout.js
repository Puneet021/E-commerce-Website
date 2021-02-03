import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { cartEmpty, loadCart } from "./helper/cartHelper";


const StripeCheckout = (
    {products,
    setReload = f => f,
    reload=undefined}
) => {

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price;
        });
        return amount;
    };

    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
        </div>
    );
};

export default StripeCheckout;