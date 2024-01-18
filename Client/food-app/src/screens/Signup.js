import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {URL} from "../Helper";
import Footer from "../components/Footer";


export default function Signup() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });

  const onChange = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch(`${URL}/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: details.name,
        email: details.email,
        password: details.password,
        location: details.location,
      }),
    });
    result = await result.json();
    if (!result) {
      alert("Enter Valid Credentials");
    } else {
      navigate("/");
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
            <label for="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              name="name"
              value={details.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label for="email" className="form-label">
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
            <label for="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Enter your location"
              name="location"
              value={details.location}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
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
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User ?
          </Link>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
