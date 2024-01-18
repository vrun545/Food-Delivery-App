import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {URL} from "../Helper";


export default function Login() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      }),
    });
    result = await result.json();
    if (result.success) {
      localStorage.setItem("email", JSON.stringify(details.email));
      const token = JSON.stringify(result.token);
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email address"
              name="email"
              value={details.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={details.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            Not Registerd ?
          </Link>
        </form>
      </div>
      <div className="ms-auto"
      style={{
        marginTop: "190px",
        alignItems:"center"
      }}>
        <Footer />
      </div>
    </div>
  );
}
