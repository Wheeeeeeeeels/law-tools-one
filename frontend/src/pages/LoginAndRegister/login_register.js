import React, { useState,useEffect } from 'react';
import { Link,Navigate,useNavigate } from 'react-router-dom';
import './login.css';

// import particlesJS from 'particles.js';
// import Particles from 'react-particles-js';
// import {Particles} from "react-tsparticles";


export function Login({setIsLoggedIn,setWelcomeUserName}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //     window.particlesJS.load('particles-js', './effect/particles-config.json', function() {
    //       console.log('particles.js loaded - callback');
    //     });
    //   }, []);

    const containerStyle = {
        backgroundImage: {},
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const base64Credentials = btoa(`${email}:${password}`);

        const response = await fetch("http://127.0.0.1:8000/login",{
            method: "POST",
            // 401 异常
            headers: {
                'Authorization': `Basic ${base64Credentials}`
            },
        });
        const data = await response.json();
        if (response.ok){
            console.log("Before setting isLoggedIn to true");
            setIsLoggedIn(true);
            console.log("After setting isLoggedIn to true");

            setWelcomeUserName(email);
            if(data.role === 'admin'){
                console.log("admin");
                navigate('/admin-dashboard');
            }else{
                navigate('/user-index')
            }
        }else{
            setErrorMessage(data.error || "login fail,pls try again");
        }
    };
    return (
        
        <div className="login-container">
            {/* <h1 className="brand-name">zaka-tech</h1> */}
            <div className="input-container">
                <span className="icon">✉️</span>
                <input
                    type="email"
                    placeholder="Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-container">
                <span className="icon">🔒</span>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="submit-btn" onClick={handleSubmit}>Sign In</button>
            <div className="extras">
                <label>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    Remember me
                </label>
                <span className="forgot-password">Forgot Password?</span>
                <Link to="/register" className='register-link'>没有账号？点击这里注册</Link>
            </div>
            <footer className="footer">
            Copyright © 2023 zaka-tech. ·All rights reserved. 
            </footer>
        </div>
    );
}

export function Register({setIsLoggedIn,setWelcomeUserName}){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword){
            setErrorMessage("Password and Confirm Password must match");
            return;
        }
        const response = await fetch("http://127.0.0.1:8000/register",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({email,password}),
        });
        const data = await response.json();
        console.log(data); 
        if (response.ok){
            console.log("Before setting isLoggedIn to true");
            setIsLoggedIn(true);
            console.log("After setting isLoggedIn to true");
            setWelcomeUserName(email);
            
            
        }else{
            setErrorMessage(data.error || "register fail,pls try again");
        }
    }
    return (
        <div className="login-container">
             {/* <h1 className="brand-name"></h1> */}
            <div className="input-container">
                <span className="icon">✉️</span>
                <input
                    type="email"
                    placeholder="Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-container">
                <span className="icon">🔒</span>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="input-container">
                <span className="icon">🔒</span>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <button className="submit-btn" onClick={handleSubmit}>Register</button>
            <footer className="footer">
            Copyright © 2023 zaka-tech. ·All rights reserved.
            </footer>
        </div>
    );
}

