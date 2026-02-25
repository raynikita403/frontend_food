import React, { useEffect } from "react";
import slider1 from "../../assets/slider1.avif"; 
import slider2 from "../../assets/slider22.jpg"; 
import slider3 from "../../assets/slider3.jpg"; 
const Carousel = () => {
  useEffect(() => {
    const carouselElement = document.querySelector(
      "#carouselExampleIndicators"
    );

    if (carouselElement && window.bootstrap) {
      new window.bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: "carousel",
      });
    }
  }, []);

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
    >
      <div className="carousel-indicators">
        <button data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
        <button data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
        <button data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
      </div>

      <div className="carousel-inner">
       <div className="carousel-item active">
  <div className="position-relative">
    <img
      src={slider1}
      className="d-block w-100"
      style={{ height: "600px", objectFit: "cover" }}
      alt="Food 1"
    />
    
    <div
      className="position-absolute top-50 start-0 ps-4 pt-2 pe-2 text-white"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: "5px",
      }}
    >
      <h3>Fresh ingredients, crafted with care, served with a smile.</h3>
      <p>At our kitchen, every dish starts with the freshest ingredients, thoughtfully prepared and carefully crafted <br /> to delight your taste buds. Served with a warm smile, we aim to make every meal not just food, but a joyful experience</p>
    </div>
  </div>
</div>

        <div className="carousel-item ">
  <div className="position-relative">
    <img
      src={slider2}
      className="d-block w-100"
      style={{ height: "600px", objectFit: "cover" }}
      alt="Food 1"
    />
    
    <div
      className="position-absolute top-50 start-0 ps-4 pt-2 pe-2 text-white"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: "5px",
      }}
    >
      <h3>Turning everyday meals into unforgettable experience.</h3>
      <p>We transform everyday meals into unforgettable experiences by blending quality ingredients, thoughtful <br /> preparation, and a touch of creativity in every dish. Each bite is designed to delight your senses and turn ordinary moments into memorable ones."</p>
    </div>
  </div>
</div>
         <div className="carousel-item">
  <div className="position-relative">
    <img
      src={slider3}
      className="d-block w-100"
      style={{ height: "600px", objectFit: "cover" }}
      alt="Food 1"
    />
    
    <div
      className="position-absolute top-50 start-0 ps-4 pt-2 pe-2 text-white"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: "5px",
      }}
    >
      <h3>Where passion meets the plate, and taste tells the story.</h3>
      <p>Where passion meets the plate, every dish tells its own story. Crafted with care and bursting with flavor, <br /> our meals are more than just food—they’re a journey of taste and a celebration of culinary artistry.</p>
    </div>
  </div>
</div>
      </div>

      <button className="carousel-control-prev" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button className="carousel-control-next" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default Carousel;
