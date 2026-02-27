import { useState } from "react";
 
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
 
  const token = localStorage.getItem("token");
 
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
 
  // ✅ Add Restaurant (Auth + OwnerId Logic)
 
  const handleSubmit = async (e) => {
 
    e.preventDefault();
 
    try {
 
      // STEP 1 - Create Auth User
 
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
 
      // STEP 2 - Create Restaurant Profile
 
      const formData = new FormData();
 
      formData.append("name", restaurantData.name);
 
      formData.append("description", restaurantData.description);
 
      formData.append("timing", restaurantData.timing);
 
      formData.append("location", restaurantData.location);
 
      formData.append("active", restaurantData.active);
 
      formData.append("ownerId", restaurantUserId);
 
      if (restaurantData.image) {
 
        formData.append("image", restaurantData.image);
 
      }
 
      const restaurantResponse = await fetch(
 
        "http://localhost:8082/api/restaurant/register",
 
        {
 
          method: "POST",
 
          headers: {
 
            Authorization: `Bearer ${token}`,
 
          },
 
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
 
      const response = await fetch(
 
        "http://localhost:8082/api/restaurant/all",
 
        {
 
          headers: { Authorization: `Bearer ${token}` },
 
        }
 
      );
 
      const data = await response.json();
 
      if (response.ok) {
 
        setRestaurants(data);
 
      }
 
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
 
      if (response.ok) {
 
        fetchRestaurants();
 
      }
 
    } catch (error) {
 
      console.error("Error updating status:", error);
 
    }
 
  };
 
  return (
<div className="container-fluid p-0">
<div className="row g-0 min-vh-100 flex-column flex-md-row">
 
        {/* Sidebar */}
<div className="col-12 col-md-2 bg-dark text-white p-4">
<button
 
            className="btn btn-link text-white d-flex align-items-center ms-4 text-decoration-none"
 
            onClick={() => setActivePage("addRestaurant")}
>
 
            Add Restaurant
</button>
 
          <button
 
            className="mt-3 btn btn-link text-white d-block text-start ms-4 text-decoration-none"
 
            onClick={() => {
 
              setActivePage("manageRestaurant");
 
              fetchRestaurants();
 
            }}
>
 
            Manage Restaurant
</button>
 
          <button
 
            className="mt-3 btn btn-link text-white d-block text-start ms-4 text-decoration-none"
 
            onClick={() => setActivePage("manageCustomer")}
>
 
            Manage Customer
</button>
 
          <button
 
            className="btn btn-light w-75 text-warning mt-4 ms-4"
 
            onClick={handleLogout}
>
 
            Logout
</button>
</div>
 
        {/* Main Content */}
<div className="col-12 col-md-9 flex-grow-1 p-4 bg-light d-flex justify-content-center align-items-start">
 
          {/* ADD RESTAURANT FORM (EXACT MATCH) */}
 
          {activePage === "addRestaurant" && (
<div className="card w-75 w-md-75 w-lg-50 p-4 bg-dark shadow-sm">
<h2 className="mb-4 text-center text-warning">Add Restaurant</h2>
 
              <form onSubmit={handleSubmit}>
<div className="mb-3">
<label className="form-label text-white">Restaurant Name</label>
<input
 
                    type="text"
 
                    className="form-control"
 
                    name="name"
 
                    value={restaurantData.name}
 
                    onChange={handleChange}
 
                    required
 
                  />
</div>
 
                <div className="mb-3">
<label className="form-label text-white">Email</label>
<input
 
                    type="email"
 
                    className="form-control"
 
                    name="email"
 
                    value={restaurantData.email}
 
                    onChange={handleChange}
 
                    required
 
                  />
</div>
 
                <div className="mb-3">
<label className="form-label text-white">Password</label>
<input
 
                    type="password"
 
                    className="form-control"
 
                    name="password"
 
                    value={restaurantData.password}
 
                    onChange={handleChange}
 
                    required
 
                  />
</div>
 
                <div className="mb-3">
<label className="form-label text-white">Image</label>
<input
 
                    type="file"
 
                    className="form-control"
 
                    name="image"
 
                    onChange={handleChange}
 
                  />
</div>
 
                <div className="mb-3">
<label className="form-label text-white">Description</label>
<textarea
 
                    className="form-control"
 
                    name="description"
 
                    value={restaurantData.description}
 
                    onChange={handleChange}
 
                    rows={3}
 
                  />
</div>
 
                <div className="mb-3">
<label className="form-label text-white">Timing</label>
<input
 
                    type="text"
 
                    className="form-control"
 
                    name="timing"
 
                    value={restaurantData.timing}
 
                    onChange={handleChange}
 
                  />
</div>
 
                <div className="mb-3">
<label className="form-label text-white">Location</label>
<input
 
                    type="text"
 
                    className="form-control"
 
                    name="location"
 
                    value={restaurantData.location}
 
                    onChange={handleChange}
 
                  />
</div>
 
                <div className="mb-3">
<label className="form-label me-3 text-white">Active Status:</label>
 
                  <div className="form-check form-check-inline">
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
 
                  <div className="form-check form-check-inline">
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
 
                <button type="submit" className="btn btn-warning text-light w-100">
 
                  Add Restaurant
</button>
</form>
</div>
 
          )}
 
          {/* MANAGE RESTAURANT TABLE (EXACT MATCH) */}
 
          {activePage === "manageRestaurant" && (
<div className="container">
<h2 className="mb-4">Manage Restaurants</h2>
 
              <table
 
                className="table table-bordered table-striped"
 
                style={{ fontSize: "10px" }}
>
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
<span
 
                          className={`badge ${
 
                            res.active === "active"
 
                              ? "bg-success"
 
                              : "bg-danger"
 
                          }`}
>
 
                          {res.active}
</span>
</td>
 
                      <td>
<button
 
                          style={{ fontSize: "10px" }}
 
                          className={`btn btn-sm ${
 
                            res.active === "active"
 
                              ? "btn-danger"
 
                              : "btn-success"
 
                          }`}
 
                          onClick={() => toggleStatus(res.id, res.active)}
>
 
                          {res.active === "active"
 
                            ? "Deactivate"
 
                            : "Activate"}
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
 
 