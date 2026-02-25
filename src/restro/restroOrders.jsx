import { useEffect, useState } from "react";

 
function RestaurantOrders() {
  const [orders, setOrders] = useState([]);
 
  useEffect(() => {
    api.get("/restaurant/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);
 
  return (
    <div>
      <h4>Orders</h4>
 
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Bill</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.user.username}</td>
              <td>{order.product.name}</td>
              <td>{order.productQty}</td>
              <td>{order.bill}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default RestaurantOrders;
 
 