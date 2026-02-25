import React from "react";
import "../../styles/AboutBanner.css";

const services = [
  {
    icon: "bi bi-buildings-fill", 
    title: "Explore Countless Options",
    desc: "Discover hundreds of restaurants near you, from local favorites to global cuisines, all in one place.",
  },
  {
    icon: " bi bi-egg-fried",
    title: "Order in a Few Clicks",
    desc: "Choose your favorite dishes and place your order effortlessly. Fast, secure, and convenient",
  },
  {
    icon: "bi bi-bicycle",
    title: "Hot & Fresh to Your Door",
    desc: "Our delivery partners ensure your meals arrive quickly and piping hot, right when you want them",
  },
  {
    icon: "bi bi-geo-fill",
    title: "Real-Time Tracking",
    desc: "Track your order live from kitchen to doorstep and enjoy your food without any surprises.",
  },
];

const WhatWeDo = () => {
  return (
    <section className="what-we-do py-5">
      <div className="container text-center text-white">
        <h2 className="fw-bold mb-3 text-warning">What We Do</h2>

        <p className="mb-5">
          We help brands grow with innovative solutions and creative ideas. <br />
          Our team delivers high-quality digital experiences that engage <br />
         
        </p>
        <div className="row text-center mt-4">
          {services.map((service, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="p-4  h-100">
                {/* Icon */}
                <i className={`bi ${service.icon} fs-1 mb-3 text-warning `}></i>
                <h6 className="text-warning">{service.title}</h6>
                <p style={{ fontSize: "10px" }}>{service.desc}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
