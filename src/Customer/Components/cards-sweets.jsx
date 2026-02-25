import React from "react";
import CommonCard from './common-card'

import bg1 from "../../assets/card1.avif";
import bg2 from "../../assets/card2.avif";
import bg3 from "../../assets/card3.avif";

import overlay1 from "../../assets/card1-img.png";
import overlay2 from "../../assets/card2-img.png";
import overlay3 from "../../assets/card3-img.png";

const CardsSection = () => {

  // this data should come from Backend
  const cardsData = [
    {
      id: 1,
      title: "Cup Cake",
      desc: "Soft, fluffy, and oh-so-delicious in every bite.",
      bg: bg1,
      overlay: overlay1,
    },
    {
      id: 2,
      title: "Cake",
      desc: "Baked to perfection, enjoyed with happiness.",
      bg: bg2,
      overlay: overlay2,
    },
    {
      id: 3,
      title: "Ice Cream",
      desc: "Frozen delight, made to sweeten your day.",
      bg: bg3,
      overlay: overlay3,
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Sweet Treats, Big Smiles</h2>

      <div className="row g-4 justify-content-center">
        {cardsData.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4">
            <CommonCard
              title={item.title}
              desc={item.desc}
              bg={item.bg}
              overlay={item.overlay}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsSection;
