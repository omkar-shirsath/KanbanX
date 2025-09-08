import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { toast } from 'react-toastify'
import '../App.css' 

const Signup = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        const toastId = toast.loading("Signing in..."); // Show loading toast
        const url = import.meta.env.VITE_BACKEND_URL;

        e.preventDefault();

        axios.post(`${url}/users/signup`, {
            name: name,
            email: email,
            password: password
        }, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                toast.update(toastId, {
                    render: "Signed in successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
                toast.update(toastId, {
                    render: error.message,
                    type: "error",
                    isLoading: false,
                    autoClose: 4000,
                });
            });

        setName("");
        setEmail("");
        setPassword("");

        navigate('/login')
    }

    return (
        <div className="body">

            <div className="form-container" >
                <form onSubmit={handleSubmit}>
                    <h1 style={{ fontSize: "36px", textAlign: "center" }}>Sign up</h1>

                    <div className='input-box'>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} require />
                    </div>

                    <div className="input-box">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>



                    <button type="submit" className="btn-login">Sign up</button>

                    <div className="register-link">
                        <p>Have an account ? <Link to="/Login" >Login Here!</Link></p>
                    </div>


                </form>

            </div>
        </div>
    )
}

export default Signup
