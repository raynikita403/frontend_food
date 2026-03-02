import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/loginRegister.css";

function CustomerLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please enter username and password",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        { username, password }
      );

      console.log("Full response:", response.data);

      const token = response.data.token;
      const roles = response.data.roles || [];

      // 🔹 Safe username extraction with fallback
      const loggedUser =
        response.data.username ||
        response.data.user?.username ||
        username;

      const userRole = roles[0];

      // Save auth details
      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("username", loggedUser);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${loggedUser}!`,
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        if (userRole === "ROLE_ADMIN") navigate("/admin");
        else if (userRole === "ROLE_RESTAURANT") navigate("/restro");
        else if (userRole === "ROLE_USER") navigate("/");
        else navigate("/login");
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid username or password",
      });
    }
  };

  return (
    <div className="app-bg vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card p-4 shadow-lg"
        style={{ minWidth: "350px", minHeight: "400px" }}
      >
        <h3 className="text-center text-white mb-3">Login</h3>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label className="form-label text-white">User Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid mt-4">
            <button
              type="button"
              className="btn btn-warning text-white"
              onClick={handleLogin}
            >
              Login
            </button>

            <div className="text-center mt-2">
              <span className="text-white">Don't have an account? </span>
              <Link to="/register" className="text-danger text-decoration-none">
                Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerLogin;