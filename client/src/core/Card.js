import React,{useState,useEffect} from 'react';
import Imagehelper from './helper/Imagehelper';
import { addItemToCart, removeItemToCart } from './helper/cartHelper';
import {Redirect } from 'react-router-dom';
    const Card = ({product, addtoCart=true,removefromCart=false,
        setReload = f => f
    ,reload=undefined}) => {
       
        const [redirect, setRedirect] = useState(false)
        const [count, setCount] = useState(product.count)

     const cartTitle = product ? product.name :"A photo from pexels"
     const cartDescription = product ? product.description :"A photo from pexels"
     const cartPrice = product ? product.price  :"A photo from pexels"
    
     const addToCart= () =>{
         addItemToCart(product, ()=>{
             setRedirect(true)
         })
     }

     const getRedirect = (redirect) => {
         if(redirect){
             return <Redirect to = "/cart" />
         }
     }

        const showAddToCart = (addtoCart) => {
            
           return addtoCart && (
            <button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
           )

        }

        
        const showRemoveFromCart = () => {
            
            return removefromCart && (
                <button
                    onClick={() => {
                        removeItemToCart(product._id);
                        setReload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                  >
                    Remove from cart
                  </button>
            )
        }

        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
            {getRedirect(redirect)}
             <Imagehelper  product = {product}/>
              <p className="lead bg-success font-weight-normal text-wrap">
                {cartDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">${cartPrice}</p>
              <div className="row">
                <div className="col-12">
                 {showAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                  {(showRemoveFromCart(removefromCart))}
                </div>
              </div>
            </div>
          </div>
        );
      };


export default Card;