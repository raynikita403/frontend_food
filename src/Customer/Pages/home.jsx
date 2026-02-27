import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Carousel from "../Components/Slider";
import CardsSection from "../Components/cards-sweets";
import RestaurantsSection from "../Components/restaurant-list";
import AboutUsSection from "../Components/about-us";
import Footer from "../Components/footer";
import ContactUs from "../Components/contactUs";

import pizza from "../../assets/about-section.avif";

const Home = () => {
  const location = useLocation();

  // ✅ Smooth scroll when URL contains #contact-us
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const yOffset = -80; // adjust if navbar overlaps
        const y =
          element.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Carousel />
      <CardsSection />

      <AboutUsSection
        title="About Foodly"
        text1={`Welcome to Foodly, your ultimate food delivery companion. From local favorites to international cuisines, 
we bring a wide variety of dishes right to your doorstep. Whether you're craving comfort food, healthy options, 
or a gourmet meal, we have it all. Our platform connects you with top-rated restaurants nearby, ensuring every 
order is fresh, hot, and prepared with care.`}
        text2={`We focus on speed, convenience, and quality, so you can enjoy delicious meals without any hassle. 
Track your order in real-time, explore new flavors, and enjoy exclusive deals and discounts along the way. 
At Foodly, we make sure your dining experience at home is as delightful as eating out. Join thousands of happy 
customers who trust us for their daily cravings and special occasions.`}
        imageSrc={pizza}
        imageHeight="300px"
        imageWidth="350px"
        bgColor="bg-warning"
        linkText="Know More About Foodly"
        linkTo="/about"
        showButton={true}
      />

      <RestaurantsSection />
      <ContactUs />
      <Footer />
    </>
  );
};

export default Home;