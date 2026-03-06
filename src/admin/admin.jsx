import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("manageRestaurant");
  const [restaurants, setRestaurants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "Admin";

  useEffect(() => {
    if (activePage === "manageRestaurant") {
      fetchRestaurants();
    }
  }, [activePage]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setRestaurantData({ ...restaurantData, image: files[0] });
    } else {
      setRestaurantData({ ...restaurantData, [name]: value });
    }
  };

  // ✅ Logout with confirmation
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = "/login";
      }
    });
  };

  // ✅ Fetch restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:8082/api/restaurant/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        Swal.fire("Error", "Failed to fetch restaurants", "error");
        return;
      }

      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      Swal.fire("Error", "Server error while fetching", "error");
    }
  };

  // ✅ Toggle Active/Inactive with confirmation
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    const confirmResult = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${newStatus} this restaurant?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, Confirm",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:8082/api/restaurant/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ active: newStatus }),
        }
      );

      if (response.ok) {
        fetchRestaurants();

        Swal.fire({
          icon: "success",
          title:
            newStatus === "active"
              ? "Restaurant Activated!"
              : "Restaurant Deactivated!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error", "Failed to update status", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error", "error");
    }
  };

  // ✅ Add Restaurant
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: "Adding Restaurant...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Step 1: Register Auth
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
        Swal.close();
        Swal.fire("Error", await authResponse.text(), "error");
        return;
      }

      const authResult = await authResponse.json();

      // Step 2: Register Restaurant
      const formData = new FormData();
      formData.append("name", restaurantData.name);
      formData.append("description", restaurantData.description);
      formData.append("timing", restaurantData.timing);
      formData.append("location", restaurantData.location);
      formData.append("active", restaurantData.active);
      formData.append("ownerId", authResult.id);

      if (restaurantData.image) {
        formData.append("image", restaurantData.image);
      }

      const restaurantResponse = await fetch(
        "http://localhost:8082/api/restaurant/register",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      Swal.close();

      if (!restaurantResponse.ok) {
        Swal.fire("Error", await restaurantResponse.text(), "error");
        return;
      }

      setShowModal(false);
      fetchRestaurants();

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

      Swal.fire({
        icon: "success",
        title: "Restaurant Added Successfully!",
        text: "The restaurant has been registered.",
        confirmButtonColor: "#ffc107",
      });
    } catch (error) {
      Swal.close();
      Swal.fire("Error", "Server error occurred", "error");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">
        {/* SIDEBAR */}
        <div className="col-md-2 bg-dark text-white p-4 d-flex flex-column justify-content-between">
          <div>
            <div className="text-center mb-4">
              <div
                className="rounded-circle bg-warning text-dark d-flex justify-content-center align-items-center fw-bold mx-auto mb-2"
                style={{ width: 60, height: 60, cursor: "pointer" }}
                onClick={() => setProfileOpen(!profileOpen)}
              >
                {username.charAt(0).toUpperCase()}
              </div>
              <h6 className="text-warning">{username}</h6>
              <small>Admin</small>

              {profileOpen && (
                <div className="mt-2">
                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button
              className="btn btn-link text-white d-block text-start text-decoration-none"
              onClick={() => setActivePage("manageRestaurant")}
            >
              Manage Restaurant
            </button>

            <button
              className="btn btn-link text-white d-block text-start text-decoration-none"
              onClick={() => setActivePage("manageCustomer")}
            >
              Manage Customer
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="col-md-10 bg-light p-4 position-relative">
          {activePage === "manageRestaurant" && (
            <>
              <h3 className="fw-bold mb-4">Restaurants</h3>

              <div className="row">
                {restaurants.map((res) => (
                  <div className="col-md-4 mb-4" key={res.id}>
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                      <img
                        src={
                          res.imageBase64
                            ? `data:image/jpeg;base64,${res.imageBase64}`
                            : "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
                        }
                        className="card-img-top"
                        style={{ height: 400, objectFit: "cover" }}
                        alt=""
                      />
                      <div className="card-body bg-dark text-white">
                        <h5 className="fw-bold">{res.name}</h5>
                        <p className=" small text-white">
                          {res.description}
                        </p>
                        <p className="small">📍 {res.location}</p>
                        <p className="small">⏰ {res.timing}</p>

                        <span
                          className={`badge ${
                            res.active === "active"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {res.active}
                        </span>

                        <div className="mt-3">
                          <button
                            className={`btn btn-sm ${
                              res.active === "active"
                                ? "btn-danger"
                                : "btn-success"
                            }`}
                            onClick={() =>
                              toggleStatus(res.id, res.active)
                            }
                          >
                            {res.active === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowModal(true)}
                style={{
                  position: "fixed",
                  bottom: 30,
                  right: 30,
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#ffc107",
                  fontSize: 28,
                  border: "none",
                }}
              >
                +
              </button>
            </>
          )}

          {activePage === "manageCustomer" && (
            <h3>Manage Customer (Coming Soon)</h3>
          )}
        </div>
      </div>

      {/* MODAL (UNCHANGED FORM) */}
           {showModal && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content rounded-4 overflow-hidden">
              <div className="row g-0">
                <div
                  className="col-md-5 d-none d-md-block"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1552566626-52f8b828add9')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                <div className="col-md-7 p-4 bg-light">
                  <h5 className="text-center fw-bold text-warning mb-3">
                    Add Restaurant
                  </h5>

                  <form onSubmit={handleSubmit}>
                    <input
                      className="form-control mb-2 rounded-pill"
                      placeholder="Name"
                      name="name"
                      value={restaurantData.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="email"
                      className="form-control mb-2 rounded-pill"
                      placeholder="Email"
                      name="email"
                      value={restaurantData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="password"
                      className="form-control mb-2 rounded-pill"
                      placeholder="Password"
                      name="password"
                      value={restaurantData.password}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="form-control mb-2 rounded-pill"
                      placeholder="Timing"
                      name="timing"
                      value={restaurantData.timing}
                      onChange={handleChange}
                    />
                    <input
                      className="form-control mb-2 rounded-pill"
                      placeholder="Location"
                      name="location"
                      value={restaurantData.location}
                      onChange={handleChange}
                    />
                    <textarea
                      className="form-control mb-2 rounded-4"
                      placeholder="Description"
                      name="description"
                      value={restaurantData.description}
                      onChange={handleChange}
                    />
                    <input
                      type="file"
                      className="form-control mb-3 rounded-pill"
                      name="image"
                      onChange={handleChange}
                    />

                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-secondary rounded-pill"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-warning rounded-pill"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;