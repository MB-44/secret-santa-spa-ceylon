"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./introduction.module.css";

const IntroPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login"); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>Welcome to SantaSpace</h1>
        <p className={styles.description}>
          Celebrate your holiday season with Secret Santa! Create groups, share
          wishlists, and make the holidays magical for everyone. Simple, fun,
          and stress-free.
        </p>
        <button className={styles.loginButton} onClick={handleLogin}>
          Login →
        </button>
      </div>
      <div className={styles.right}>
        <img
          src="/images/intro-vector.jpg"
          alt="Holiday Illustration"
          className={styles.vector}
        />
      </div>
    </div>
  );
};

export default IntroPage;
