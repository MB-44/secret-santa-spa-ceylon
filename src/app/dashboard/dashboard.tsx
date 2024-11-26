"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./dashboard.module.css";
import { FaAngleDown } from "react-icons/fa";

const DashBoard: React.FC = () => {
  const searchParams = useSearchParams();

  const groupName = searchParams.get("groupName") || "Your Group";
  const selectedDate = searchParams.get("selectedDate") || "No Date Chosen";
  const budget = searchParams.get("budget") || "No Budget Set";
  const members = JSON.parse(searchParams.get("members") || "[]");
  const exclusion = JSON.parse(searchParams.get("exclusions") || "{}");

  const [assignments, setAssignments] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  const assignSecretSantas = () => {
    const availableAssignments = [...members];
    const newAssignments: { [key: string]: string} = {};

    try {
      members.forEach((member) => {
        const excluded = exclusion[member] || [];
        const possibleAssignments = availableAssignments.filter(
          (potentialSanta) => 
            potentialSanta !== member && !excluded.includes(potentialSanta)
        );

        if (possibleAssignments.length === 0) {
          throw new Error(
            `Unable to assign a Secret santafor ${member} due to exclusions.`
          );
        }

        const assigned = possibleAssignments[Math.floor(Math.random() * possibleAssignments.length)];
        newAssignments[member] = assigned;

        const index = availableAssignments.indexOf(assigned);
        if (index > -1) {
          availableAssignments.splice(index, 1);
        }  
      });

      setAssignments(newAssignments);
      setError(null);
      console.log("Assignment success:",newAssignments);
    } catch (err : any) {
      setError(err.message);
      setAssignments({});
    }
  };

  const handleViewWishlist = (member: string) => {
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{groupName}</h1>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Event Details</h2>
        <p>
          <strong>Date:</strong> {selectedDate}
        </p>
        <p>
          <strong>Budget:</strong> {budget}
        </p>
      </div>

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
      
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Secret Santa Assignments</h2>
        <button className={styles.assignButton} onClick={assignSecretSantas}>
          Assign Secret Santas
        </button>
        {error && <p className={styles.error}>{error}</p>}
        <ul className={styles.assignmentList}>
          {Object.entries(assignments).map(([giver, receiver]) => (
            <li key={giver}>
              🎅{giver} →  🎁{receiver}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default DashBoard;
