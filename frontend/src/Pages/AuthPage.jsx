import React, { useState, useEffect } from 'react';
import '../Styles/Auth.css';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"
import axios from "axios";
function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [signUpData, setSignUpData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setIsSignIn(true);
        }, 200);
    }, []);

    const toggle = (val) => {
        setIsSignIn(val);
    };

    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value,
        });
    };

    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        setSignInData({
            ...signInData,
            [name]: value,
        });
    };

    const handleSignUpSubmit = async(e) => {
        e.preventDefault();

        // Check for empty fields
        if (
            !signUpData.username ||
            !signUpData.email ||
            !signUpData.password ||
            !signUpData.confirmPassword
        ) {
            toast.error('Please fill in all fields');
            return;
        }
        if(!signUpData.email.includes("@")){
            toast.error('Please enter a valid email');
            return;
        }
        if(signUpData.password.length < 8){
            toast.error('Password should be atleast 8 characters');
            return;
        }
        if(signUpData.password !== signUpData.confirmPassword){
            toast.error('Password and Confirm Password should be same');
            return;
        }

        // Handle sign-up logic (replace this with your actual logic)
        console.log('Sign-up data:', signUpData);

        try{
            const res=await axios.post("http://localhost:4000/user/register",{name:signUpData.username,email:signUpData.email,password:signUpData.password});
            if(!res.status===200){
                throw new Error("Error while registering");
            }
            toast.success('Sign-up successful');
            toggle(true);
        }
        catch(err){
            toast.error(err.response.data.message);
            return;
        }
        // Show success toast
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        // Check for empty fields
        if (!signInData.email || !signInData.password) {
            toast.error('Please fill in all fields');
            return;
        }
        if(!signInData.email.includes("@")){
            toast.error('Please enter a valid email');
            return;
        }
        // Handle sign-in logic (replace this with your actual logic)
        console.log('Sign-in data:', signInData);
        try{
            const res=await axios.post("http://localhost:4000/user/login",{email:signInData.email,password:signInData.password});
            localStorage.setItem("token",res.data.data);
            localStorage.setItem("email",signInData.email)
            if(!res.status===200){
                throw new Error("Error while logging in");
            }

            toast.success('Sign-in successful');

            navigate("/");
        }
        catch(err){
            toast.error(err.response.data.message);
            return;
        }
        // Show success toast

        //navigating to Home page
    };

    return (
        <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
            {/* FORM SECTION */}
            <div className="row">
                {/* SIGN UP */}
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <form className="form sign-up" onSubmit={handleSignUpSubmit}>
                            <div className="input-group">
                                <i className='bx bxs-user'></i>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={signUpData.username}
                                    onChange={handleSignUpChange}
                                />
                            </div>
                            <div className="input-group">
                                <i className='bx bx-mail-send'></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={signUpData.email}
                                    onChange={handleSignUpChange}
                                />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={signUpData.password}
                                    onChange={handleSignUpChange}
                                />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    value={signUpData.confirmPassword}
                                    onChange={handleSignUpChange}
                                />
                            </div>
                            <button type="submit">Sign up</button>
                            <p className="pit">
                                <span>Already have an account?</span>
                                <b onClick={()=>toggle(true)} className="pointer">
                                    Sign in here
                                </b>
                            </p>
                        </form>
                    </div>
                </div>
                {/* END SIGN UP */}
                {/* SIGN IN */}
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                        <form className="form sign-in" onSubmit={handleSignInSubmit}>
                            <div className="input-group">
                                <i className='bx bxs-user'></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={signInData.email}
                                    onChange={handleSignInChange}
                                />
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={signInData.password}
                                    onChange={handleSignInChange}
                                />
                            </div>
                            <button type="submit">Sign in</button>
                            {/* <p>
                                <b>Forgot password?</b>
                            </p> */}
                            <p className="pit">
                                <span>Don't have an account?</span>
                                <b onClick={()=>toggle(false)} className="pointer">
                                    Sign up here
                                </b>
                            </p>
                        </form>
                    </div>
                    <div className="form-wrapper"></div>
                </div>
                {/* END SIGN IN */}
            </div>
            {/* END FORM SECTION */}
            {/* CONTENT SECTION */}
            <div className="row content-row">
                {/* SIGN IN CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2>Welcome</h2>
                    </div>
                    <div className="img sign-in"></div>
                </div>
                {/* END SIGN IN CONTENT */}
                {/* SIGN UP CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="img sign-up"></div>
                    <div className="text sign-up">
                        <h2>Join with us</h2>
                    </div>
                </div>
                {/* END SIGN UP CONTENT */}
            </div>
            {/* END CONTENT SECTION */}
        </div>
    );
}

export default AuthPage;
