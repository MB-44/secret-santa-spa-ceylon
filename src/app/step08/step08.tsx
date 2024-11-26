"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./step08.module.css";
import { FaEnvelope, FaWhatsapp, FaSms, FaLink, FaArrowCircleRight } from "react-icons/fa";

const STEP08: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const groupName = searchParams.get("groupName") || "Your Group";
  const selectedDate = searchParams.get("selectedDate") || "No Date Chosen";
  const budget = searchParams.get("budget") || "No Budget Set";
  const message = searchParams.get("message") || "Default message";
  const members = JSON.parse(searchParams.get("members") || "[]");

  const handleClick = (method: string) => {
    const invitationLink = "https://yourwebsite.com/invitation";
    const encodedMessage = encodeURIComponent(
      `Join my Secret Santa group! Here's the invitation link: ${invitationLink}`
    );

    switch (method) {
      case "CopyInvitation":
        navigator.clipboard.writeText(invitationLink);
        alert("Invitation link copied to clipboard!");
        break;
      case "Email":
        window.location.href = `mailto:?subject=Join My Secret Santa&body=${encodedMessage}`;
        break;
      case "WhatsApp":
        window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
        break;
      case "Text Message":
        window.open(`sms:?&body=${encodedMessage}`, "_blank");
        break;
      default:
        alert("Unknown method");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>How do you want to send the invitations?</h2>
        <p className={styles.description}>
          The celebration has been confirmed. Send the invitations now. Then everyone can draw a name and make a wish list.
        </p>

        <div className={styles.options}>
          <button
            className={styles.optionButton}
            onClick={() => handleClick("CopyInvitation")}
          >
            <FaLink className={styles.icon} />
            Invitation Link
            <FaArrowCircleRight />
          </button>

          <button
            className={styles.optionButton}
            onClick={() => handleClick("Email")}
          >
            <FaEnvelope className={styles.icon} />
            Email
            <FaArrowCircleRight />
          </button>
          <button
            className={styles.optionButton}
            onClick={() => handleClick("WhatsApp")}
          >
            <FaWhatsapp className={styles.icon} />
            WhatsApp
            <FaArrowCircleRight />
          </button>
          <button
            className={styles.optionButton}
            onClick={() => handleClick("Text Message")}
          >
            <FaSms className={styles.icon} />
            Text Message
            <FaArrowCircleRight />
          </button>
        </div>

        <button
          className={styles.groupPageButton}
          onClick={() =>
            router.push(
              `/dashboard?groupName=${encodeURIComponent(groupName)}&selectedDate=${encodeURIComponent(
                selectedDate
              )}&budget=${encodeURIComponent(budget)}&message=${encodeURIComponent(
                message
              )}&members=${encodeURIComponent(JSON.stringify(members))}`
            )
          }
        >
          Visit the group page
        </button>
      </div>
    </div>
  );
};

export default STEP08;
