import React, { useState } from "react";

const Loginform = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginerror,setLoginerror] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoginerror(null);

    // Perform validation checks
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8000/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const {token} = data;
          localStorage.setItem('token',token);
          console.log("Form submitted successfully!");
          // Handle success, e.g., redirect to another page or show a success message
        } else {
          const errorMessage = await response.json();
          setLoginerror(errorMessage);
        }
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    }
  };

  return (
    <form className="flex-col-container" onSubmit={handleSubmit}>
      <div className="flex-row-container">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
          placeholder={errors.email}
        />
      </div>
      <div className="flex-row-container">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "error" : ""}
          placeholder={errors.password}
        />
      </div>
      {loginerror && <span className="error-message">{loginerror}</span>}
      <button className="submit-btn" type="submit">
        Log In
      </button>
    </form>
  );
};

export default Loginform;
