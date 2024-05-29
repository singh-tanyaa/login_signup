"use client";

import { useState } from "react";
import * as Yup from "yup";
import styles from "./login.module.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password must contain letters")
      .matches(/[0-9]/, "Password must contain numbers"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Login Successful", formData);
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <div className={styles.modalLeft}>
            <span className={styles.modalDesc}>Login Now🙋‍♀️</span>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputBlock}>
                <label className={styles.inputLabel}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
                {errors.name && <div className={styles.error}>{errors.name}</div>}
              </div>
              <div className={styles.inputBlock}>
                <label className={styles.inputLabel}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
                {errors.email && <div className={styles.error}>{errors.email}</div>}
              </div>
              <div className={styles.inputBlock}>
                <label className={styles.inputLabel}>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className={styles.error}>{errors.password}</div>
                )}
              </div>
              <div className={styles.inputBlock}>
                <button className={styles.loginButton} type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className={styles.modalRight}>
            <img
              src="https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZ2luJTIwdG8lMjB3ZWJzaXRlfGVufDB8MXwwfHx8MA%3D%3D"
              alt="Login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

// import React from 'react'

// type Props = {}

// const Login = (props: Props) => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login