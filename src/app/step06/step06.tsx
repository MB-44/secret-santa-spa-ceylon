"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./step06.module.css";

const STEP06: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const groupName = searchParams.get("groupName") || "Your group";
  const selectedDate = searchParams.get("selectedDate") || "No Date Chosen";
  const members = JSON.parse(searchParams.get("members") || "[]"); 

  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [customBudget, setCustomBudget] = useState<string>("");
  const [isEditingCustom, setIsEditingCustom] = useState(false);

  const handleBudgetClick = (budget: string) => {
    setSelectedBudget(budget);
    setIsEditingCustom(false);
  };

  const handleCustomBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomBudget(e.target.value);
    setSelectedBudget(e.target.value);
  };

  const handleContinue = () => {
    if (!selectedBudget) {
      alert("Please select a budget.");
      return;
    }
    router.push(
      `/step07?groupName=${encodeURIComponent(
        groupName
      )}&selectedDate=${encodeURIComponent(
        selectedDate
      )}&budget=${encodeURIComponent(
        selectedBudget)}&members=${encodeURIComponent(
          JSON.stringify(members))}`
    ); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>How much should people spend?</h2>

        <div className={styles.options}>
          {["LKR 30,000", "LKR 15,000", "LKR 10,000", "LKR 7,500", "LKR 5,000"].map((budget) => (
            <button
              key={budget}
              className={`${styles.budgetButton} ${
                selectedBudget === budget ? styles.selected : ""
              }`}
              onClick={() => handleBudgetClick(budget)}
            >
              {budget}
            </button>
          ))}

          <button
            className={`${styles.budgetButton} ${
              isEditingCustom ? styles.selected : ""
            }`}
            onClick={() => setIsEditingCustom(true)}
          >
            Other
            {isEditingCustom && (
              <input
                type="number"
                value={customBudget}
                onChange={handleCustomBudgetChange}
                className={styles.customInput}
                placeholder="Enter amount"
              />
            )}
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

export default STEP06;
