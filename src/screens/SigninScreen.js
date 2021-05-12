import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function SigninScreen(props) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const userSignin = useSelector(state => state.userSignin);
const { userInfo, loading, error } = userSignin;

const redirect = props.location.search ? props.location.search.split('=')[1]: '/';

const dispatch = useDispatch();

const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
}
useEffect(() => {
    if(userInfo){
        props.history.push(redirect)
    }
},[props.history, redirect, userInfo])
    return (
        <div>
          <form className="form" onSubmit={submitHandler}> 
        <div>
            <hi>Sign In</hi>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger"></MessageBox>}
        <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
            <label />
           <button className="primary" type="submit">Sign In</button>
        </div>
        <div>
            <label />
            <div>
                New Customer? { ' '}
                <Link to={`/register?redirect=${redirect}`}>Create Account</Link>
            </div>
        </div>
        </form>  
        </div>
    )
}
