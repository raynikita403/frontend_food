import React, { useEffect, useState } from "react";
import CommonCard from "../Components/common-card";
import Navbar from "../Components/Navbar";
import Footer from "../Components/footer";
import "../../styles/cardEffect.css";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8082/api/restaurant/all")
      .then((res) => res.json())
      .then((data) => {
        const activeRestaurants = data.filter(
          (res) => res.active === "active"
        );
        setRestaurants(activeRestaurants); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching restaurants:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
    <Navbar/>
    <div className="container my-5">
      <h2 className="mb-4 text-center">All Restaurants</h2>

      {loading ? (
        <p className="text-center">Loading restaurants...</p>
      ) : restaurants.length === 0 ? (
        <p className="text-center text-muted">
          No restaurants available.
        </p>
      ) : (
        <div className="row g-4">
          {restaurants.map((item) => (
            <div key={item.id} className="col-12 col-md-3 col-lg-3">
              <CommonCard
                title={item.name}
                desc={item.description}
                bg={
                  item.imageBase64
                    ? `data:image/jpeg;base64,${item.imageBase64}`
                    : ""
                }
                showOverlay={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
     <Footer/>
    </>
  );
};

export default RestaurantsPage;