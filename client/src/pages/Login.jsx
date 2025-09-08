import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import '../App.css'

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const handleSubmit = (e) => {
        const toastId = toast.loading("Logging in...");
        const url = import.meta.env.VITE_BACKEND_URL;
        e.preventDefault();

        axios.post(`${url}/users/login`, {
            email: email,
            password: password
        }, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                toast.update(toastId, {
                    render: "Logged in successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
                navigate('/dashboard')
            })
            .catch(error => {
                console.error('Invalid credentials!', error);
                toast.update(toastId, {
                    render: 'Invalid credentials!',
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
            });

        setEmail("");
        setPassword("");


    }
    return (
        <div className="body">

            <div className="form-container" >
                <form onSubmit={handleSubmit}>
                    <h1 style={{ fontSize: "36px", textAlign: "center" }}>Login</h1>

                    <div className='input-box'>
                        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" /> Remeber Me</label>
                        <a href="#">Fogot Password ?</a>
                    </div>


                    <button type="submit" className="btn-login">Log in</button>

                    <div className="register-link">
                        <p>Don't have an account ? <Link to="/Signup">Register Here!</Link></p>
                    </div>


                </form>

            </div>
        </div>

    )
}

export default Login
