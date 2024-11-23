"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./setExclusion.module.css";

const SetExclusions: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [members, setMembers] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<{ [key: string]: string[] }>({});
  const [activePerson, setActivePerson] = useState<string | null>(null);

  // Parse members from query string
  useEffect(() => {
    const membersQuery = searchParams.get("members");
    if (membersQuery) {
      const parsedMembers = JSON.parse(decodeURIComponent(membersQuery));
      setMembers(parsedMembers);
    }
  }, [searchParams]);

  const toggleExclusion = (name: string, exclusion: string) => {
    setExclusions((prev) => {
      const currentExclusions = prev[name] || [];
      if (currentExclusions.includes(exclusion)) {
        return {
          ...prev,
          [name]: currentExclusions.filter((e) => e !== exclusion),
        };
      } else {
        return {
          ...prev,
          [name]: [...currentExclusions, exclusion],
        };
      }
    });
  };

  const handleContinue = () => {
    // alert(`Exclusions set: ${JSON.strin.gify(exclusions)}`);
    router.push("/step04"); // Replace with the next route in your app
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Do you want to set exclusions?</h2>
        <p className={styles.description}>
          An exclusion indicates who may <u>not</u> draw whom.
        </p>
        {members.length > 0 && (
          <div className={styles.exclusionsList}>
            {members.map((name) => (
              <div key={name} className={styles.memberRow}>
                <span className={styles.memberName}>{name}</span>
                <button
                  className={styles.chooseButton}
                  onClick={() => setActivePerson(name)}
                >
                  Choose exclusions →
                </button>
              </div>
            ))}
          </div>
        )}
        <div className={styles.actions}>
          <button className={styles.backButton} onClick={() => router.back()}>
            ←
          </button>
          <button className={styles.continueButton} onClick={handleContinue}>
            Continue →
          </button>
        </div>
      </div>

      {/* Exclusion Modal */}
      {activePerson && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>
              Set exclusions for {activePerson}
            </h3>
            <div className={styles.modalOptions}>
              {members
                .filter((name) => name !== activePerson)
                .map((name) => (
                  <label key={name} className={styles.optionLabel}>
                    <input
                      type="checkbox"
                      checked={exclusions[activePerson]?.includes(name) || false}
                      onChange={() => toggleExclusion(activePerson, name)}
                    />
                    {name}
                  </label>
                ))}
            </div>
            <button
              className={styles.saveButton}
              onClick={() => setActivePerson(null)}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetExclusions;
