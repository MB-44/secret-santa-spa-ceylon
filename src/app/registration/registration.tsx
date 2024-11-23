"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./registration.module.css";
import Error from "next/error";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      alert("Registration successful! Please log in.");
      router.push("/login"); 
    } catch (err : any) {
      setError(err.message || "An unexpected error occured");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleRegister} className={styles.form}>
        <h2 className={styles.title}>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
