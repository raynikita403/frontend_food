import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* Brand / About */}
          <div className="col-12 col-md-4 mb-4">
            <h4 className="fw-bold">Foodly</h4>
            <p className="text-light">
              Discover the best restaurants near you. Fresh food, fast delivery,
              and unforgettable flavors — all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light  text-decoration-none">Home</a></li>
              <li><a href="#" className="text-light mt-2 text-decoration-none">Restaurants</a></li>
              <li><a href="#" className="text-light mt-2 text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-light mt-2 text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="fw-semibold">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light mt-2 text-decoration-none">Help Center</a></li>
              <li><a href="#" className="text-light mt-2 text-decoration-none">Terms & Conditions</a></li>
              <li><a href="#" className="text-light mt-2 text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="fw-semibold">Follow Us</h6>
            <div className="d-flex gap-3 mt-2">
              <a href="#" className="text-light fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

        </div>

        <hr className="border-secondary" />

        {/* Copyright */}
        <div className="text-center text-light">
          © {new Date().getFullYear()} Foodly. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
