import React, { useState } from "react";
import "../../styles/ContactUs.css"; 

const ContactUs = () => {
  // For demo, we'll handle success/error locally
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSuccess("Your message has been sent successfully!");
      setError("");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } else {
      setError("Please fill in all required fields.");
      setSuccess("");
    }
  };

  return (
    <div id="contact-us" className="container-fluid bg-warning">
      <div className="row ">
        {/* Form Column */}
        <div className="col-12 col-lg-6">
          <div className="container my-5">
            <h2 className="text-center mb-4 cursive-heading">
              We’d Love to Hear From You 
            </h2>
            <p className="text-center text-white">
              Have a question or Issues? Drop us a message and we’ll get back
              to you soon.
            </p>

            {/* Success/Error Messages */}
            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} id="contactForm">
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-light text-warning fw-bold"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Image Column */}
        <div className="col-12 col-lg-6 contact-img"></div>
      </div>
    </div>
  );
};

export default ContactUs;
