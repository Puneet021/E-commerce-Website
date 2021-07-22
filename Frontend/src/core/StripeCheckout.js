import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper/index";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = (
    {products,
    setReload = f => f,
    reload=undefined}
) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })

    const tokend = isAutheticated() && isAutheticated().token;
    const userId = isAutheticated() && isAutheticated().user._id;

    const getFinalPrice = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price;
        });
        return amount;
    };

    const makePayment = token => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "appliaction/json"
        }
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            const {status} = response;
            console.log("STATUS", status);
            // const orederData = {
            //     products: products,
            //     transaction_id: response.transaction.id,
            //     amount: response.transaction.amount
            // }
            // createOrder(userId, tokend, orederData);
            cartEmpty(() => console.log("jjjj"));
            setReload(!reload);
        })
        .catch(err => console.log(err));
    };

    const showStripeButton = () => {
        return isAutheticated() ? (
            <StripeCheckoutButton
            stripeKey="pk_test_51IsRemSAurBHUCLwyhY1M5L0NPHEYmAMNMK00pdBqdyc6tTVpETIWVlNlkPlm5bzcfgJrALksDIfRUCEt7QrzDWg00U2WoKUbx"
            token={makePayment}
            amount={getFinalPrice() * 100}
            name="Buy Tshirts"
            shippingAddress
            billingAddress
            >
                <button className="btn btn-success">Stripe Checkout</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">SignIn</button>
            </Link>
        );
    }

    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    );
};

export default StripeCheckout;