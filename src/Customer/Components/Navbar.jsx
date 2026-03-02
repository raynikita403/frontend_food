import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/nav-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // ✅ Get username & token from localStorage
  const username = localStorage.getItem("username") || "";
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    setOpen(false);
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Foodly" width="40" height="40" className="me-2" />
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
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-light" to="/#contact-us">Contact Us</Link>
            </li>
          </ul>

          {/* Right Icons */}
          <div className="d-flex align-items-center gap-3 position-relative">

            {/* Cart Icon */}
            <i className="bi bi-cart fs-5 text-light cursor-pointer"></i>

            {/* Profile Icon / Avatar */}
            {token && username ? (
              <div ref={dropdownRef} className="position-relative">
                {/* Avatar */}
                <div
                  className="rounded-circle bg-warning text-dark d-flex justify-content-center align-items-center fw-bold"
                  style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer"
                  }}
                  onClick={() => setOpen(!open)}
                >
                  {username ? username.charAt(0).toUpperCase() : "U"}
                </div>

                {/* Dropdown Panel */}
                {open && (
                  <div
                    className="position-absolute bg-dark shadow rounded p-3"
                    style={{
                      top: "50px",
                      right: "0",
                      width: "220px",
                      zIndex: 1000
                    }}
                  >
                    <div className="text-center mb-2">
                      <div
                        className="rounded-circle bg-warning text-dark d-flex justify-content-center align-items-center fw-bold mx-auto mb-2"
                        style={{ width: "60px", height: "60px", fontSize: "24px" }}
                      >
                        {username ? username.charAt(0).toUpperCase() : "U"}
                      </div>

                      <h6 className="mb-0 text-warning">{username || "User"}</h6>
                      <small className="text-light">Logged In</small>
                    </div>

                    <hr />

                    <button
                      className="btn btn-danger btn-sm w-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <i
                className="bi bi-person fs-5 text-light cursor-pointer"
                onClick={() => navigate("/login")}
              ></i>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;