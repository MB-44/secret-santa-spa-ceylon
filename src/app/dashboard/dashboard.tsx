"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import styles from "./dashboard.module.css";

const DashBoard: React.FC = () => {
  const searchParams = useSearchParams();

  const groupName = searchParams.get("groupName") || "Your Group";
  const selectedDate = searchParams.get("selectedDate") || "No Date Chosen";
  const budget = searchParams.get("budget") || "No Budget Set";
  const members = JSON.parse(searchParams.get("members") || "[]");

  const handleViewWishlist = (member: string) => {
    // alert(`Viewing wishlist for ${member}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{groupName}</h1>

      {/* Card 1: Date and Budget */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Event Details</h2>
        <p>
          <strong>Date:</strong> {selectedDate}
        </p>
        <p>
          <strong>Budget:</strong> {budget}
        </p>
      </div>

      {/* Card 2: Chat */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Group Chat</h2>
        <div className={styles.chatBox}>
          <p className={styles.message}>John: Can't wait for the event!</p>
          <p className={styles.message}>Doe: Remember to bring your wishlist!</p>
        </div>
        <textarea
          className={styles.chatInput}
          placeholder="Type your message..."
        ></textarea>
        <button className={styles.sendButton}>Send</button>
      </div>

      {/* Card 3: Group Members */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Group Members</h2>
        <ul className={styles.memberList}>
          {members.map((member: string, index: number) => (
            <li
              key={index}
              className={styles.memberItem}
              onClick={() => handleViewWishlist(member)}
            >
              {member}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
