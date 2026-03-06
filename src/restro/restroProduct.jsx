import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function RestaurantProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: true,
    image: null,
    category: "",
    subCategory: "",
  });

  const [preview, setPreview] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8082/api/menu/restaurant/products",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8082/api/menu/categories",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(res.data);

      if (res.data.length > 0) {
        setFormData((prev) => ({
          ...prev,
          category: res.data[0].name,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8082/api/menu/subcategories",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubCategories(res.data);

      if (res.data.length > 0) {
        setFormData((prev) => ({
          ...prev,
          subCategory: res.data[0].name,
        }));
      }
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

      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.post(
        "http://localhost:8082/api/menu/restaurant/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Success", "Product Added Successfully", "success");

      setShowModal(false);
      fetchProducts();

      setFormData({
        name: "",
        description: "",
        price: "",
        status: true,
        image: null,
        category: categories[0]?.name || "",
        subCategory: subCategories[0]?.name || "",
      });

      setPreview(null);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not add product", "error");
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axios.put(
        `http://localhost:8082/api/menu/toggle-status/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">

      <h4 className="text-center mb-4">My Products</h4>

      {/* PRODUCT CARDS */}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div
              className="card shadow-lg border-0 h-100"
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                transition: "0.3s",
              }}
            >
              <img
                src={
                  product.imageBase64
                    ? `data:image/jpeg;base64,${product.imageBase64}`
                    : "https://via.placeholder.com/200"
                }
                alt={product.name}
                style={{
                  height: "240px",
                  objectFit: "cover",
                }}
              />

              <div
                className="card-body"
                style={{
                  background:
                    "linear-gradient(135deg,#1f1f1f,#2b2b2b)",
                  color: "#fff",
                }}
              >
                <h5 className="fw-bold">{product.name}</h5>

                <p className="small">{product.description}</p>

                <h6 className="text-success fw-bold">
                  ₹ {product.price}
                </h6>

                <span
                  className={`badge ${
                    product.status ? "bg-success" : "bg-danger"
                  }`}
                >
                  {product.status
                    ? "Available"
                    : "Unavailable"}
                </span>

                <div className="small text-muted mt-2">
                  {product.category} • {product.subCategory}
                </div>

                <button
                  className={`btn btn-sm mt-3 ${
                    product.status
                      ? "btn-danger"
                      : "btn-success"
                  }`}
                  onClick={() => toggleStatus(product.id)}
                >
                  {product.status
                    ? "Mark Unavailable"
                    : "Mark Available"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FLOATING ADD BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: "35px",
          right: "35px",
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg,#00c853,#009624)",
          color: "#fff",
          fontSize: "30px",
          border: "none",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        +
      </button>

      {/* ADD PRODUCT MODAL */}
      {showModal && (
        <div
          className="modal d-block"
          style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(5px)",
          }}
        >
          <div className="modal-dialog modal-lg">

            <div
              className="modal-content p-4"
              style={{
                borderRadius: "20px",
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >

              {/* DARK OVERLAY */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(0,0,0,0.65)",
                  borderRadius: "20px",
                }}
              ></div>

              <div style={{ position: "relative", zIndex: 2 }}>

                <h4 className="text-center text-white fw-bold mb-4">
                  Add Product
                </h4>

                <div className="row">

                  {/* FORM */}
                  <div className="col-md-7">

                    <input
                      className="form-control mb-3"
                      placeholder="Product Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                    />

                    <textarea
                      className="form-control mb-3"
                      rows="3"
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />

                    <input
                      type="number"
                      className="form-control mb-3"
                      placeholder="Price"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: e.target.value,
                        })
                      }
                    />

                    <select
                      className="form-select mb-3"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        })
                      }
                    >
                      {categories.map((cat) => (
                        <option key={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>

                    <select
                      className="form-select mb-3"
                      value={formData.subCategory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subCategory: e.target.value,
                        })
                      }
                    >
                      {subCategories.map((sub) => (
                        <option key={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>

                    <div className="d-flex gap-2">

                      <button
                        className="btn btn-outline-light w-50"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>

                      <button
                        className="btn btn-success w-50"
                        onClick={handleAddProduct}
                      >
                        Save Product
                      </button>

                    </div>
                  </div>

                  {/* IMAGE UPLOAD */}
                  <div className="col-md-5">

                    <div
                      style={{
                        border: "2px dashed #fff",
                        borderRadius: "16px",
                        padding: "20px",
                        textAlign: "center",
                        background: "rgba(255,255,255,0.1)",
                      }}
                    >

                      {preview ? (
                        <img
                          src={preview}
                          alt="preview"
                          style={{
                            width: "100%",
                            height: "220px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            marginBottom: "10px",
                          }}
                        />
                      ) : (
                        <p className="text-white">
                          Upload Product Image
                        </p>
                      )}

                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            image: e.target.files[0],
                          });

                          setPreview(
                            URL.createObjectURL(
                              e.target.files[0]
                            )
                          );
                        }}
                      />

                    </div>

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