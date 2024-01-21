import { useState } from "react";

const Signupform = ({onFormSubmit}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Perform validation checks
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      formData.confirmPassword = ""
      newErrors.confirmPassword = "Password doesn't match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8000/signup", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });
  
        if (response.ok) {
          console.log("Form submitted successfully!");
          onFormSubmit(true);
          // Handle success, e.g., redirect to another page or show a success message
        } else {
          // Handle error, e.g., display an error message to the user
          console.error("Error submitting form:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    }
  }
  return (
    <form className="flex-col-container" onSubmit={handleSubmit}>
      <div className="flex-row-container">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
          placeholder={errors.name}
        />
      </div>
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
      <div className="flex-row-container">
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? "error" : ""}
          placeholder={errors.confirmPassword}
        />
      </div>
      <button className="submit-btn" type="submit">
        Sign-Up
      </button>
    </form>
  );
};

export default Signupform;
