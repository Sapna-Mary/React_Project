import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (form.name.length < 3) {
      newErrors.name = "Minimum 3 characters required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!form.age) {
      newErrors.age = "Age is required.";
    } else if (form.age < 18 || form.age > 60) {
      newErrors.age = "Age must be between 18 and 60.";
    }

    if (!form.terms) {
      newErrors.terms = "Please accept the terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(form);
      setErrors({});
    }
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      age: "",
      terms: false,
    });
    setErrors({});
    setSubmitted(null);
  };

  return (
    <div className="container">
      <h2>Event Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <div className="error">{errors.name}</div>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <div className="error">{errors.phone}</div>}

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />
        {errors.age && <div className="error">{errors.age}</div>}

        <label className="terms">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
          />
          I accept the Terms and Conditions
        </label>
        {errors.terms && <div className="error">{errors.terms}</div>}

        <button type="submit">Register</button>
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </form>

      {submitted && (
        <div className="submitted">
          <h3>Registration Successful</h3>
          <p><strong>Name:</strong> {submitted.name}</p>
          <p><strong>Email:</strong> {submitted.email}</p>
          <p><strong>Phone:</strong> {submitted.phone}</p>
          <p><strong>Age:</strong> {submitted.age}</p>
        </div>
      )}
    </div>
  );
}

export default App;