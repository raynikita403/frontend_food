import { useEffect, useState } from "react";
import Swal from "sweetalert2";
 
function RestaurantProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
 
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
      await api.post("/restaurant/products", formData);
 
      Swal.fire("Success", "Product Added", "success");
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      Swal.fire("Error", "Could not add product", "error");
    }
  };
 
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h4>My Products</h4>
        <button
          className="btn btn-warning"
          onClick={() => setShowModal(true)}
        >
          + Add Product
        </button>
      </div>
 
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div className="card">
              <img
                src={`http://localhost:8081/product-images/${product.id}`}
                className="card-img-top"
                alt=""
                style={{ height: "200px", objectFit: "cover" }}
              />
 
              <div className="card-body">
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p>₹ {product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
 
      {/* Simple Modal */}
      {showModal && (
        <div className="modal d-block" style={{ background: "#00000088" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>Add Product</h5>
 
              <input
                className="form-control mb-2"
                placeholder="Name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
 
              <input
                className="form-control mb-2"
                placeholder="Description"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
 
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Price"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
 
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-warning"
                  onClick={handleAddProduct}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default RestaurantProducts;
 
 