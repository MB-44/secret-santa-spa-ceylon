"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid login credentials");

      const { token } = await response.json();

      document.cookie  = `token=${token}; path=/; HttpOnly; SamSite=Strict`;
      // Save token to localStorage or cookies
      // localStorage.setItem("token", token);

      // Redirect to dashboard
      alert("Login successful");
      router.push("/mainDashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
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
          Login
        </button>
        <p className={styles.link}>
          Don’t have an account?{" "}
          <a href="/register" className={styles.registerLink}>
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
