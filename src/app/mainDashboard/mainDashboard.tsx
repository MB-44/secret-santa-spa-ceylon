"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./mainDashboard.module.css";

const MainDashboard: React.FC = () => {
  const router = useRouter();

  const handleCreateWishlist = () => {
    router.push("/step01-w");
  };

  const handleCreateGroup = () => {
    router.push("/step01");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Celebrate your secret santa with us</h1>
      <div className={styles.cards}>
        {/* Wishlist Card */}
        <div className={styles.card} onClick={handleCreateWishlist}>
          <img
            src="/images/wish-list-icon.png" /* Replace with your image path */
            alt="Wishlist Icon"
            className={styles.cardImage}
          />
          <button className={styles.cardButton}>Create Your Wishlist</button>
        </div>

        {/* Group Card */}
        <div className={styles.card} onClick={handleCreateGroup}>
          <img
            src="/images/group-icon.png" /* Replace with your image path */
            alt="Group Icon"
            className={styles.cardImage}
          />
          <button className={styles.cardButton}>Create Your Group</button>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
