import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Customer/Pages/home";
import About from "./Customer/Pages/about";
import RestaurantsPage from "./Customer/Pages/restaurant";
import ContactUs from "./Customer/Components/contactUs";
import CustomerLogin from "./auth/CustomerLogin";
import CustomerRegistration from "./auth/CustomerRegistration";

import AdminDashboard from "./admin/admin";
import RestaurantDashboard from "./restro/restroUser";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public + USER */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/restaurants" element={<RestaurantsPage />} /> 
        <Route path="/contact" element={<ContactUs/>} /> 
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/register" element={<CustomerRegistration />} />

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* RESTAURANT */}
        <Route
          path="/restro/*"
          element={
            <ProtectedRoute allowedRoles={["ROLE_RESTAURANT"]}>
              <RestaurantDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;