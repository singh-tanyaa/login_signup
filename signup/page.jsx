// import React from 'react'

// type Props = {}

// const SignUp = (props: Props) => {
//   return (
//     <div>SignUp</div>
//   )
// }

// export default SignUp
"use client";

import { useState } from "react";
import * as Yup from "yup";
import styles from "./signup.module.css";
import Link from "next/link";

const FormWithYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    roles: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("First name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    contactNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Contact number is required"),
    roles: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);
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
            <h1 className={styles.modalDesc}>Ready to Register?</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputBlock}>
                <label className={styles.inputLabel}>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  placeholder="Enter your first name"
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <div className={styles.error}>{errors.firstName}</div>
                )}
              </div>
              <div className={styles.inputBlock}>
                <label className={styles.inputLabel}>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Enter your last name"
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <div className={styles.error}>{errors.lastName}</div>
                )}
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
                {errors.email && (
                  <div className={styles.error}>{errors.email}</div>
                )}
              </div>
              <div className={styles.inputBlock}>
                <label className={styles.inputLabel}>Contact Number:</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  placeholder="Enter your phone no."
                  onChange={handleChange}
                />
                {errors.contactNumber && (
                  <div className={styles.error}>{errors.contactNumber}</div>
                )}
              </div>
              <div className={styles.inputBlock}>
                <label className={styles.inputLabel}>Roles:</label>
                <select
                  name="roles"
                  value={formData.roles}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Admin">ADMIN</option>
                  <option value="Writer">WRITER</option>
                  <option value="Reviewer">REVIEWER</option>
                  <option value="User">USER</option>
                </select>
                {errors.roles && (
                  <div className={styles.error}>{errors.roles}</div>
                )}
              </div>
              <div className={styles.inputBlock}>
                <button className={styles.inputButton} type="submit">
                  Register
                </button>
              </div>
            </form>

            {/* <div className={styles.loginRedirect}>
             
            </div> */}
            <div className={styles.loginRedirect}>
  <Link href="/login" className={styles.loginButton}>
    
      Already registered? <span className={styles.loginButtonText}>Login</span>
   
  </Link>
</div>
        
            <div className={styles.acceptTerms}>
              <input type="checkbox" id="accept-terms-checkbox" />
              <label htmlFor="accept-terms-checkbox">
                I accept the <span className={styles.highlight}>Terms of Use</span> & <span className={styles.highlight}>Privacy Policy</span>
              </label>
            </div>
          </div>
          <div className={styles.modalRight}>
            <img
              src="https://plus.unsplash.com/premium_photo-1661286678499-211423a9ff5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQxfHxkYW5jZSUyMGZlc3RpdmFsfGVufDB8fDB8fHww"
              alt="Event"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWithYup;