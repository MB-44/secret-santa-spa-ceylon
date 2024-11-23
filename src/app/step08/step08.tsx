"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./step08.module.css";

const STEP08: React.FC = () => {
  const router = useRouter();

  const handleClick = (method: string) => {
    // alert(`You selected: ${method}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>How do you want to send the invitations?</h2>
        <p className={styles.description}>
          The celebration has been confirmed. Send the invitations now. Then
          everyone can draw a name and make a wish list.
        </p>

        <div className={styles.options}>
          <button
            className={styles.optionButton}
            onClick={() => handleClick("Email")}
          >
            Email →
          </button>
          <button
            className={styles.optionButton}
            onClick={() => handleClick("WhatsApp")}
          >
            WhatsApp →
          </button>
          <button
            className={styles.optionButton}
            onClick={() => handleClick("Text Message")}
          >
            Text Message →
          </button>
        </div>

        <button
          className={styles.groupPageButton}
          onClick={() => router.push("/dashboard")}
        >
          Visit the group page
        </button>
      </div>
    </div>
  );
};

export default STEP08;
