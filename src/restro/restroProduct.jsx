import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function RestaurantProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "active",
    image: null,
    category: "Veg",
    subCategory: "Starters",
  });

  const categories = ["Veg", "Non-Veg"];
  const subCategories = [
    "Starters",
    "Soup",
    "Curries",
    "Rice and Biryani",
    "Roti and Breads",
    "Sweets",
    "Beverage",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/restaurant/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("status", formData.status);
      data.append("category", formData.category);
      data.append("subCategory", formData.subCategory);
      if (formData.image) data.append("image", formData.image);

      await api.post("/restaurant/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success", "Product Added", "success");
      setShowModal(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        status: "active",
        image: null,
        category: "Veg",
        subCategory: "Starters",
      });
      fetchProducts();
    } catch (err) {
      Swal.fire("Error", "Could not add product", "error");
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "80vh" }}>
      <h4 className="mb-3">My Products</h4>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div className="card shadow-sm">
              <img
                src={`http://localhost:8081/product-images/${product.id}`}
                className="card-img-top"
                alt=""
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="fw-bold">{product.name}</h5>
                <p>{product.description}</p>
                <p>₹ {product.price}</p>
                <p>
                  <span className={`badge ${product.status === "active" ? "bg-success" : "bg-danger"}`}>
                    {product.status.toUpperCase()}
                  </span>
                </p>
                <p>
                  <small>
                    {product.category} | {product.subCategory}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Add Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "green",
          color: "#fff",
          fontSize: "28px",
          border: "none",
          boxShadow: "0 6px 10px rgba(0,0,0,0.4)",
          cursor: "pointer",
        }}
        title="Add Product"
      >
        +
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="modal-dialog modal-lg">
            <div
              className="modal-content shadow-lg"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div className="row g-0">
                {/* Left Side Image */}
                <div
                  className="col-md-5 d-none d-md-block"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100%",
                  }}
                ></div>

                {/* Right Side Form */}
                <div className="col-md-7 p-4" style={{ backgroundColor: "#f8f9fa" }}>
                  <h6 className="fw-bold mb-3 text-center text-warning">Add Product</h6>

                  <input
                    className="form-control mb-2 rounded-pill shadow-sm"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />

                  <input
                    className="form-control mb-2 rounded-pill shadow-sm"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    className="form-control mb-2 rounded-pill shadow-sm"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />

                  {/* Status */}
                  <div className="mb-2">
                    <label className="me-2 fw-semibold">Status:</label>
                    {["active", "inactive"].map((status) => (
                      <div key={status} className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          value={status}
                          checked={formData.status === status}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                        />
                        <label className="form-check-label">{status}</label>
                      </div>
                    ))}
                  </div>

                  {/* Category & Sub-Category */}
                  <div className="d-flex gap-2 mb-2">
                    <select
                      className="form-select rounded-pill shadow-sm"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    <select
                      className="form-select rounded-pill shadow-sm"
                      value={formData.subCategory}
                      onChange={(e) =>
                        setFormData({ ...formData, subCategory: e.target.value })
                      }
                    >
                      {subCategories.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Image */}
                  <input
                    type="file"
                    className="form-control mb-3 rounded-pill shadow-sm"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                  />

                  {/* Buttons */}
                  <div className="d-flex justify-content-end mt-2 gap-2">
                    <button
                      className="btn btn-secondary rounded-pill px-4"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-success rounded-pill px-4"
                      onClick={handleAddProduct}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantProducts;