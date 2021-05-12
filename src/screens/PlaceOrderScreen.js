import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'


export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    if(!cart.paymentMethod){
        props.history.push('/payment')
    }
    const toPrice = (num) => Number(num.toFixed(2)); 
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = () => {

    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address: </strong> {cart.shippingAddress.address},  {cart.shippingAddress.city}, 
                                    {cart.shippingAddress.postalCode},{cart.shippingAddress.country},

                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p><strong>Method: </strong> {cart.paymentMethod}</p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                        <ul>
                        {
                            cart.cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div className="">
                                            <img src={`.${item.img}`} alt={item.name} className="small" />
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                            </div>
                        </li>
                    </ul>  
                </div>
                <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li> 
                                    <h2>Order Summary</h2>
                                </li>
                                <li> 
                                    <div className="row"> 
                                        <div>Items</div>
                                        <div>${cart.itemsPrice}</div>
                                    </div>
                                </li>
                               
                                <li> 
                                    <div className="row"> 
                                        <div>Shipping</div>
                                        <div>${cart.shippingPrice}</div>
                                    </div>
                                </li>
                               
                                <li> 
                                    <div className="row"> 
                                        <div>Tax</div>
                                        <div>${cart.taxPrice}</div>
                                    </div>
                                </li>
                            
                                <li> 
                                    <div className="row"> 
                                        <div><strong>Order Total</strong></div>
                                        <div><strong>${cart.totalPrice}</strong></div>
                                    </div>
                                </li>
                                <li>
                                    <button type="button" className="primary block" onClick={placeOrderHandler}>Place Order</button>
                                </li>
                            </ul>
                        </div>
                </div>
            </div>
        </div>
    )
}
