"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./mainDashboard.module.css";

const MainDashboard: React.FC = () => {
  const router = useRouter();

  const handleCreateWishlist = () => {
    router.push("/wishlist");
  };

  const handleCreateGroup = () => {
    router.push("/step01");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Your Dashboard</h1>
      <div className={styles.cards}>
        <button className={styles.card} onClick={handleCreateWishlist}>
          Create Your Wishlist
        </button>
        <button className={styles.card} onClick={handleCreateGroup}>
          Create Your Group
        </button>
      </div>
    </div>
  );
};

export default MainDashboard;
