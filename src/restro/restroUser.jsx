import { useState } from "react";
import Products from "./restroProduct";
import Orders from "./restroOrders";
 
function RestaurantDashboard() {
  const [activePage, setActivePage] = useState("products");
 
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
 
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
     
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="text-warning">Restaurant Panel</h4>
 
        <button
          className="btn btn-link text-white d-block text-start"
          onClick={() => setActivePage("products")}
        >
          Product List
        </button>
 
        <button
          className="btn btn-link text-white d-block text-start"
          onClick={() => setActivePage("orders")}
        >
          Orders
        </button>
 
        <button
          className="btn btn-danger mt-4"
          onClick={handleLogout}
        >
          Logout
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
 
 