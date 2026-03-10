import React from "react";
import "../../styles/AboutBanner.css";

const AboutBanner = () => {
  return (
    <div className="about-banner d-flex align-items-center text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <p className="text-white mb-4 fs-3">
             Order what you love. <br />
             We’ll bring it to you.
            </p>
            <h6 className="text-secondary">“Feeling hungry? Order whatever you want and treat yourself today.
From your favorite snacks to full meals, get it delivered hot and fresh.
Satisfy your cravings anytime, anywhere, with just a few taps!”</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
