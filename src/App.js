import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippAddressScreen from './screens/ShippAddressScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <Router>
    <div className="grid-container">
    <header className="row">
        <div>
            <Link to="/" className="brand">Amazona</Link>
        </div>
        <div>
            <Link to="/cart">Cart
            {
              cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )
            }
            </Link>
            {
              

             
              userInfo ? 
              <div className="dropdown">
              <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
              <ul className="dropdown-content">
                <Link to="/#signout" onClick={signoutHandler}>Signout</Link>
              </ul>
              </div>
               : <Link to="/signin">Signin</Link>
            }
            
        </div>
    </header>
    <main>

  <Switch>
    <Route path="/" exact component={HomeScreen} />
    <Route path="/product/:id" exact component={ProductScreen} />
    <Route path="/cart/:id?" exact component={CartScreen} />
    <Route path="/signin" exact component={SigninScreen} />
    <Route path="/register" exact component={RegisterScreen} />
    <Route path="/shipping" exact component={ShippAddressScreen} />
    <Route path="/payment" exact component={PaymentMethodScreen} />
    <Route path="/placeorder" exact component={PlaceOrderScreen} />
  </Switch> 

  
      
    </main>
    <footer className="row center">All right Reserved</footer>
    </div>
    </Router>
  );
}

export default App;
