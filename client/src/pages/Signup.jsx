import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../App.css';

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing up...");
    const url = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.post(
        `${url}/users/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      console.log(response.data);

      toast.update(toastId, {
        render: "Signed up successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setName("");
      setEmail("");
      setPassword("");

      // ✅ Navigate AFTER success
      navigate("/login");

    } catch (error) {
      console.error("There was an error!", error);

      toast.update(toastId, {
        render: error.response?.data?.message || "Signup failed",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="body">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 style={{ fontSize: "36px", textAlign: "center" }}>Sign up</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">Sign up</button>

          <div className="register-link">
            <p>
              Have an account? <Link to="/login">Login Here!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
