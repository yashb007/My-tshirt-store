import React, { useState, useEffect } from "react";
import { isAuthenticate } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import {Link} from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { CreateOrder } from "./helper/orderhelper";

const Stripecheckout = ({products ,
     setReload = f => f,
      reload=undefined})=> {
       
      const [data , setData] =  useState({
          loading : false,
          success : false,
          error : "",
          address : ""
      })
      
      const token = isAuthenticate() && isAuthenticate().token
      const userId = isAuthenticate() && isAuthenticate().user._id
    
      const getFinalPrice = () => {
       let amount = 0
       products.map(p =>{
           amount = amount + p.price;
       })    
       return amount;
    }

    const makePayment = (token) => {
        const body = {
            token,
            products
          };
          const headers = {
            "Content-Type": "application/json"
          };
      
          return fetch(`/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
          })
            .then(response => {
              console.log( response);
              const {status} = response
              console.log(status)
              cartEmpty()
            })
            .catch(error => console.log(error));
    }

    const showStripeButton = () =>{
        return isAuthenticate() ? (
            <StripeCheckoutButton
            stripeKey="pk_test_i5OUP616IMltQXQ7A58yWDXG002UctbSgh"
          token={makePayment}
          name="Buy T-shirts"
          amount={getFinalPrice() * 100}
          shippingAddress
          billingAddress
            >            <button className="btn btn-success"> Pay with strip </button>
            </StripeCheckoutButton>

            )  : <Link to="/signin" > <button className="btn btn-danger"> Signin </button>
        </Link>
    }

        return (
        <div>
        <h3 className="text-white">Stripe check out {getFinalPrice()}</h3>
        {showStripeButton()}
        </div>
    )
}

export default Stripecheckout;