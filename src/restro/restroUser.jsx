import { useState } from "react";
import Products from "./restroProduct";
import Orders from "./restroOrders";

function RestaurantDashboard() {
  const [activePage, setActivePage] = useState("products");
  const [profileOpen, setProfileOpen] = useState(false);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 d-flex flex-column justify-content-start" style={{ width: "250px" }}>
        {/* Profile Section */}
        <div className="d-flex flex-column align-items-center mb-4">
          <div
            className="rounded-circle bg-warning text-dark d-flex justify-content-center align-items-center fw-bold mb-2"
            style={{ width: "60px", height: "60px", fontSize: "24px", cursor: "pointer" }}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            {username.charAt(0).toUpperCase()}
          </div>
          <h6 className="text-warning">{username}</h6>
          <small className="text-light">Restaurant</small>

          {/* Dropdown for logout */}
          {profileOpen && (
            <div className="mt-2 bg-secondary rounded p-2 w-100 text-center">
              <button className="btn btn-sm btn-danger w-100" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <button
          className={`btn btn-link text-white d-block text-start text-decoration-none ${
            activePage === "products" ? "fw-bold text-warning" : ""
          }`}
          onClick={() => setActivePage("products")}
        >
          Product List
        </button>

        <button
          className={`btn btn-link text-white d-block text-start text-decoration-none ${
            activePage === "orders" ? "fw-bold text-warning" : ""
          }`}
          onClick={() => setActivePage("orders")}
        >
          Orders
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        {activePage === "products" && <Products />}
        {activePage === "orders" && <Orders />}
      </div>
    </div>
  );
}

export default RestaurantDashboard;