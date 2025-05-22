import React, { useState } from "react";
import "./ContactUs.css";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "", 
    department: "", 
    year: "", 
    message: "",
  });
  const [formSuccess, setFormSuccess] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitted Data:", formData);

    try {
      const response = await fetch("https://test-516n.onrender.com/students", {
     
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSuccess(true);
        setFormData({
          name: "",
          email: "",
          rollNumber: "",
          department: "",
          year: "",
          message: "",
        });
      } else {
        setFormSuccess(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      {formSuccess === true ? (
        <p className="success-message">Thank you for contacting us!</p>
      ) : formSuccess === false ? (
        <p className="error-message">Failed to submit. Please try again.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number:</label>
            <input
              type="number"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;