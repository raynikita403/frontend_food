import React from "react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/footer";
import AboutBanner from "../Components/about-banner";
import WhatWeDo from "../Components/about-what-we-do";
import AboutUsSection from "../Components/about-us";

import pizza from "../../assets/about-section.avif";

const About = () => {
  return (
    <>
      <Navbar />
      <AboutBanner />
      <WhatWeDo />

      <AboutUsSection
        title="Our Story"
        text1={`Foodly was founded with a simple mission: to bring delicious, high-quality meals to your doorstep quickly 
and reliably. From local favorites to international cuisines, we partner with the best restaurants to provide 
a wide variety of options that cater to every taste. Whether you're craving comfort food, healthy choices, 
or gourmet specialties, Foodly ensures your order is prepared fresh and delivered hot.`}
        text2={`Our team focuses on speed, safety, and customer satisfaction at every step. With real-time order tracking, 
exclusive offers, and a seamless app experience, we make sure you enjoy every meal without any hassle. 
Thousands of happy customers trust Foodly for their daily cravings, special occasions, and late-night snacks. 
Our commitment to quality, variety, and convenience continues to drive us as we expand to bring great food closer 
to you, wherever you are.
We also believe in leveraging technology to make food delivery smarter and more sustainable. Our platform uses 
advanced logistics to reduce delivery times and minimize environmental impact. By partnering with local 
restaurants and supporting community initiatives, Foodly strives to make a positive difference while bringing 
delicious meals right to your door.
`}
        imageSrc={pizza}
        imageHeight="500px"
        imageWidth="450px"
        bgColor="bg-dark"
        showButton={false} 
      />
<Footer />
    </>
  );
};

export default About;
