import { useState, useEffect } from "react";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("addRestaurant");

  const [restaurantData, setRestaurantData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    description: "",
    timing: "",
    location: "",
    active: "active",
  });

  const [restaurants, setRestaurants] = useState([]);
  const [profileOpen, setProfileOpen] = useState(false);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "Admin";

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setRestaurantData({ ...restaurantData, image: files[0] });
    } else {
      setRestaurantData({ ...restaurantData, [name]: value });
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // Add Restaurant
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create Auth User
      const authResponse = await fetch(
        "http://localhost:8081/api/auth/register?type=RESTO",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: restaurantData.name,
            email: restaurantData.email,
            password: restaurantData.password,
          }),
        }
      );

      if (!authResponse.ok) {
        const errorText = await authResponse.text();
        alert(errorText);
        return;
      }

      const authResult = await authResponse.json();
      const restaurantUserId = authResult.id;

      // Create Restaurant Profile
      const formData = new FormData();
      formData.append("name", restaurantData.name);
      formData.append("description", restaurantData.description);
      formData.append("timing", restaurantData.timing);
      formData.append("location", restaurantData.location);
      formData.append("active", restaurantData.active);
      formData.append("ownerId", restaurantUserId);
      if (restaurantData.image) formData.append("image", restaurantData.image);

      const restaurantResponse = await fetch(
        "http://localhost:8082/api/restaurant/register",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!restaurantResponse.ok) {
        const errorText = await restaurantResponse.text();
        alert(errorText);
        return;
      }

      alert("Restaurant registered successfully!");
      setRestaurantData({
        name: "",
        email: "",
        password: "",
        image: null,
        description: "",
        timing: "",
        location: "",
        active: "active",
      });
    } catch (error) {
      console.error("Server error:", error);
      alert("Server error. Check backend.");
    }
  };

  // Fetch Restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:8082/api/restaurant/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  // Toggle Status
  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8082/api/restaurant/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            active: currentStatus === "active" ? "inactive" : "active",
          }),
        }
      );
      if (response.ok) fetchRestaurants();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100 flex-column flex-md-row">
        {/* Sidebar */}
        <div className="col-12 col-md-2 bg-dark text-white p-4 d-flex flex-column justify-content-between">
          <div>
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
              <small className="text-light">Admin</small>

              {/* Dropdown */}
              {profileOpen && (
                <div className="mt-2 bg-secondary rounded p-2 w-100 text-center">
                  <button
                    className="btn btn-sm btn-danger w-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Menu Buttons */}
            <button
              className={`btn btn-link text-white d-flex align-items-center ms-2 text-decoration-none ${
                activePage === "addRestaurant" ? "fw-bold text-warning" : ""
              }`}
              onClick={() => setActivePage("addRestaurant")}
            >
              Restaurant List
            </button>

            <button
              className={`mt-3 btn btn-link text-white d-block text-start ms-2 text-decoration-none ${
                activePage === "manageRestaurant" ? "fw-bold text-warning" : ""
              }`}
              onClick={() => {
                setActivePage("manageRestaurant");
                fetchRestaurants();
              }}
            >
              Manage Restaurant
            </button>

            <button
              className={`mt-3 btn btn-link text-white d-block text-start ms-2 text-decoration-none ${
                activePage === "manageCustomer" ? "fw-bold text-warning" : ""
              }`}
              onClick={() => setActivePage("manageCustomer")}
            >
              Manage Customer
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-10 flex-grow-1 p-4 bg-light d-flex justify-content-center align-items-start">
          {/* ADD RESTAURANT FORM */}
          {activePage === "addRestaurant" && (
            <div className="card w-75 w-md-75 w-lg-50 p-4 bg-dark shadow-sm">
              <h3 className="text-center text-warning fw-bold mb-4">Add New Restaurant</h3>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Restaurant Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold text-white">Restaurant Name</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      name="name"
                      placeholder="Enter name"
                      value={restaurantData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold text-white">Email</label>
                    <input
                      type="email"
                      className="form-control rounded-3"
                      name="email"
                      placeholder="Enter email"
                      value={restaurantData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold text-white">Password</label>
                    <input
                      type="password"
                      className="form-control rounded-3"
                      name="password"
                      placeholder="Enter password"
                      value={restaurantData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Timing */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold text-white">Timing</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      name="timing"
                      placeholder="10:00 AM - 11:00 PM"
                      value={restaurantData.timing}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Location */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold text-white">Location</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      name="location"
                      placeholder="Enter location"
                      value={restaurantData.location}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Image */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold text-white">Restaurant Image</label>
                    <input
                      type="file"
                      className="form-control rounded-3"
                      name="image"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Description */}
                  <div className="col-12 mb-3">
                    <label className="form-label fw-semibold text-white">Description</label>
                    <textarea
                      className="form-control rounded-3"
                      name="description"
                      placeholder="Write something about the restaurant..."
                      value={restaurantData.description}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>

                  {/* Active Status */}
                  <div className="col-12 mb-4">
                    <label className="form-label fw-semibold d-block mb-2 text-white">Active Status</label>
                    <div className="d-flex gap-4">
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="active"
                          value="active"
                          checked={restaurantData.active === "active"}
                          onChange={handleChange}
                        />
                        <label className="form-check-label text-white">Active</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="active"
                          value="inactive"
                          checked={restaurantData.active === "inactive"}
                          onChange={handleChange}
                        />
                        <label className="form-check-label text-white">Inactive</label>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-warning w-100 fw-bold rounded-3 py-2">
                  Add Restaurant
                </button>
              </form>
            </div>
          )}

          {/* MANAGE RESTAURANT TABLE */}
          {activePage === "manageRestaurant" && (
            <div className="container">
              <h2 className="mb-4">Manage Restaurants</h2>
              <table className="table table-bordered table-striped" style={{ fontSize: "10px" }}>
                <thead className="table-dark">
                  <tr className="text-center">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Timing</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((res) => (
                    <tr key={res.id} className="text-center">
                      <td>{res.name}</td>
                      <td>{res.email}</td>
                      <td>
                        {res.imageBase64 && (
                          <img
                            src={`data:image/jpeg;base64,${res.imageBase64}`}
                            alt={res.name}
                            width="80"
                            height="60"
                          />
                        )}
                      </td>
                      <td>{res.description}</td>
                      <td>{res.timing}</td>
                      <td>{res.location}</td>
                      <td>
                        <span className={`badge ${res.active === "active" ? "bg-success" : "bg-danger"}`}>
                          {res.active}
                        </span>
                      </td>
                      <td>
                        <button
                          style={{ fontSize: "10px" }}
                          className={`btn btn-sm ${res.active === "active" ? "btn-danger" : "btn-success"}`}
                          onClick={() => toggleStatus(res.id, res.active)}
                        >
                          {res.active === "active" ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activePage === "manageCustomer" && <h2>Manage Customer</h2>}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;