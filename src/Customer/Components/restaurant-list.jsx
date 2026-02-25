import React, { useEffect, useState } from "react";
import CommonCard from "./common-card";

const RestaurantsSection = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8082/api/restaurant/all")
      .then((res) => res.json())
      .then((data) => {
        // Show only active restaurants on homepage
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
    <div className="container my-5">
      <h2 className="mb-4 text-center">
        Popular Restaurants Near You
      </h2>

      {loading ? (
        <p className="text-center">Loading restaurants...</p>
      ) : restaurants.length === 0 ? (
        <p className="text-center text-muted">
          No restaurants available.
        </p>
      ) : (
        <div className="row g-4 justify-content-center">
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
  );
};

export default RestaurantsSection;