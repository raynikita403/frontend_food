import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/loginRegister.css';
 
function CustomerRegistration() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/auth/register', {
        username,
        email,
        password,
      });
 
      console.log('User registered:', response.data);
      navigate('/login'); // Redirect to login page
    } catch (err) {
      // If Spring Boot returns an error message
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Registration failed');
      }
    }
  };
 
  return (
    <div className="app-bg-register vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg" style={{ minWidth: '350px', minHeight: '400px' }}>
        <h3 className="text-center text-white mb-3">Register</h3>
 
        <form onSubmit={e => e.preventDefault()}>
          {error && <p className="text-danger">{error}</p>}
 
          <div className="mb-3">
            <label className="form-label text-white">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
 
          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
 
          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
 
          <div className="d-grid mt-4">
            <button
              type="button"
              className="btn btn-warning text-white"
              onClick={handleRegister}
            >
              Register
            </button>
 
            <div className="text-center mt-2">
              <span className="text-white">Already have an account? </span>
              <Link to="/login" className="text-danger text-decoration-none">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default CustomerRegistration;