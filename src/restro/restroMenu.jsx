import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Customer/Components/Navbar";
import Footer from "../Customer/Components/footer";
import AboutBanner from "../Customer/Components/about-banner";
import bannerImage from "../assets/restroMenuBanner.jpg";

function RestaurantMenu() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    // Fetch restaurant
    axios
      .get(`http://localhost:8082/api/restaurant/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error(err));

    // Fetch menu items
    axios
      .get(`http://localhost:8082/api/menu/restaurant/${id}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));

    // Fetch subcategories
    axios
      .get(`http://localhost:8082/api/menu/subcategories`)
      .then((res) => setSubCategories(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Filter products based on search, veg/nonveg, and subcategory
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" ||
      (filterType === "Veg" && product.category === "Veg") ||
      (filterType === "Non-Veg" && product.category === "Non-Veg");

    const matchesSubCategory =
      selectedSubCategory === "all" ||
      product.subCategory === selectedSubCategory;

    return matchesSearch && matchesType && matchesSubCategory;
  });

  // Card hover effect
  const cardStyle = { transition: "transform 0.3s ease, box-shadow 0.3s ease" };
  const cardHover = {
    transform: "scale(1.05)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
  };

  return (
    <>
      <Navbar />
      <AboutBanner />

      {/* Restaurant Hero */}
      {restaurant && (
        <div className="container my-5 p-4 rounded shadow bg-dark text-light">
          <div
            className="d-flex flex-column flex-md-row align-items-center"
            style={{ gap: "20px" }}
          >
            <div className="flex-fill text-center">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                alt="Chef"
                style={{
                  maxWidth: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "15px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                }}
              />
            </div>
            <div className="flex-fill">
              <h2 className="fw-bold">{restaurant.name}</h2>
              <p className="lead">{restaurant.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Banner Section */}
      {restaurant && (
        <div
          className="position-relative overflow-hidden"
          style={{ height: "350px" }}
        >
          <img
            src={bannerImage}
            className="w-100 h-100 object-fit-cover"
            alt="Banner"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
          <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
            <h6 className="fw-bold">
              Taste the best at {restaurant?.name}! 🍴 Fresh & delicious meals.
            </h6>
          </div>
        </div>
      )}

      {/* Menu Section */}
      <div className="container mt-5" id="menu-section">
        <h3 className="text-center mb-2">Restaurant Menu</h3>
        <h6 className="text-center mb-4 text-secondary">
          Discover delicious dishes crafted with love and fresh ingredients.
        </h6>

        {/* Search + Veg/NonVeg Filter */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <input
            type="text"
            className="form-control w-75 mb-3 mb-md-0"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div>
            <button
              className={`btn me-2 ${
                filterType === "all" ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => setFilterType("all")}
            >
              All
            </button>

            <button
              className={`btn me-2 ${
                filterType === "Veg" ? "btn-success" : "btn-outline-success"
              }`}
              onClick={() => setFilterType("Veg")}
            >
              Veg
            </button>

            <button
              className={`btn ${
                filterType === "Non-Veg" ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => setFilterType("Non-Veg")}
            >
              Non Veg
            </button>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div
                className="card shadow"
                style={cardStyle}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, cardHover)
                }
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, {
                    transform: "scale(1)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  })
                }
              >
                <img
                  src={
                    product.imageBase64
                      ? `data:image/jpeg;base64,${product.imageBase64}`
                      : "https://via.placeholder.com/200"
                  }
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />

                <div className="card-body bg-dark text-light">
                  <span
                    className={`badge mb-2 ${
                      product.category === "Veg" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {product.category}
                  </span>
                  <h5>{product.name}</h5>
                  <p>{product.description}</p>
                  <small className="text-warning">{product.subCategory}</small>
                  <h6 className="text-success mt-2">₹ {product.price}</h6>
                  <button className="btn btn-warning mt-2 w-100">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Filter Button */}
      <button
        className="btn btn-dark"
        onClick={() => setShowFilterMenu(!showFilterMenu)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          fontSize: "22px",
          zIndex: 1000,
        }}
      >
        ☰
      </button>

      {/* SubCategory Filter Menu */}
      {showFilterMenu && (
        <div
          className="bg-dark text-white shadow p-3"
          style={{
            position: "fixed",
            bottom: "100px",
            right: "30px",
            width: "220px",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          <h6 className="fw-bold mb-2">Filter by SubCategory</h6>

          <div
            className="p-2 border-bottom"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedSubCategory("all");
              setShowFilterMenu(false);
            }}
          >
            All
          </div>

          {subCategories.map((sub) => (
            <div
              key={sub.id}
              className="p-2 border-bottom"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedSubCategory(sub.name);
                setShowFilterMenu(false);
              }}
            >
              {sub.name}
            </div>
          ))}
        </div>
      )}

      <Footer />
    </>
  );
}

export default RestaurantMenu;