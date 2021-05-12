import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productAction';

export default function ProductScreen(props) {
    // const product = data.products.find(x => x._id === props.match.params.id);
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1)
    const productDetails = useSelector( state => state.productDetails);
    const { loading, error, products } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    // if(!product){
    //     return <div>Product not Found</div>
    // }
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }
    return (
        <>
        {
            loading ? <LoadingBox></LoadingBox>: error
            ? <MessageBox variant="danger">{error}</MessageBox> 
            :
            <div>
            <Link to="/">Back to Home</Link>
            <div className="row top">
                <div className="col-2">
                    <img src={`.${products.img}`} alt={products.name} className="large" />
                </div>
                <div className="col-1">
                            <ul>
                                <li>{products.name}</li>
                                <li><Rating rating={products.rating} numReviews={products.numReviews} /></li>
                                <li>Price: ${products.price}</li>
                                <li>Description
                                    <p>{products.description}</p>
                                </li>
                            </ul>
                    </div>
                        <div className="col-1">
                                <div className="card card-body">
                                        <ul>
                                            <li>
                                                <div className="row">
                                                    <div>Price</div>
                                                    <div className="price">${products.price}</div>

                                                </div>
                                            </li>

                                            <li>
                                                <div className="row">
                                                    <div>Status</div>
                                                    <div>
                                                        {products.countInStock > 0 ? <span className="success">In Stock</span>:
                                                        <span className="error">Unavailable</span>
                                                        }
                                                    </div>

                                                </div>
                                            </li>
                                            {
                                                products.countInStock > 0 && (
                                             <>
                                             <li>
                                                    <div className="row">
                                                        <div>Qty</div>
                                                        <div>
                                                            <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                {
                                                                    [...Array(products.countInStock).keys()].map( x => (
                                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                             </li>
                                                <li><button className="primary block" onClick={addToCartHandler}>Add To Cart</button></li>  
                                            </>
                                                )
                                            }
                                          
                                        </ul>
                                </div>
                            </div>
            </div>
        </div>
        }
        </>
    )
}
