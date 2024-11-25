"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./step07.module.css";

const STEP07: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const groupName = searchParams.get("groupName") || "Your Group";

  const [message, setMessage] = useState<string>(
    `We're going to draw names for "${groupName}"! Make a wish list and draw a name so that everyone has time to buy a gift.`
  );

  useEffect(() => {
    setMessage(
      `We're going to draw names for "${groupName}"! Make a wish list and draw a name so that everyone has time to buy a gift.`
    );
  }, [groupName]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleContinue = () => {
    if (message.trim() === "") {
      alert("Please enter a message for the group.");
      return;
    }
    router.push("/step08"); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>What is your message for group members?</h2>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            value={message}
            onChange={handleMessageChange}
            rows={4}
          ></textarea>
          <button
            className={styles.clearButton}
            onClick={() => setMessage("")}
            aria-label="Clear message"
          >
            ✕
          </button>
        </div>
        <div className={styles.actions}>
          <button className={styles.backButton} onClick={() => router.back()}>
            ←
          </button>
          <button className={styles.continueButton} onClick={handleContinue}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default STEP07;
