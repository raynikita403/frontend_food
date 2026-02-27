import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/nav-logo.png";

const Navbar = () => {
  const navigate = useNavigate(); 
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark text-light shadow-sm">
      <div className="container">

        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Foodly"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="fw-bold text-light">Foodly</span>
        </Link>

        {/* Toggle button (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#foodlyNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="foodlyNavbar">

          {/* Center Menu */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-light" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-light" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-light" to="/restaurants">Restaurant</Link>
            </li>
           <Link className="nav-link fw-semibold text-light" to="/#contact-us">
             Contact Us
          </Link>
          </ul>

          {/* Right Icons */}
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-search fs-5 cursor-pointer"></i>

            {/* Profile Icon navigates to Login */}
            <i
              className="bi bi-person fs-5 cursor-pointer"
              onClick={() => navigate("/login")}
            ></i>

            <i className="bi bi-cart fs-5 cursor-pointer"></i>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
