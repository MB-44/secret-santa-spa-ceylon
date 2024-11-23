"use client";

import React, {useState} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./step02.module.css";
// import { json } from "stream/consumers";
// import { useRouter } from "next/navigation";
// import { defaultOverrides } from "next/dist/server/require-hook";

const STEP_02: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter()
    const userName = searchParams.get("userName") || "Your Name";

    const [members, setMembers] = useState([userName]);

    const addMemberField = () => {
        setMembers([...members, ""]);
    };

    const updateMember= (index: number, value: string) => {
        const updateMembers = [...members];
        updateMembers[index] = value;
        setMembers(updateMembers);
    };

    const handleContinue = () => {
        const activeMembers = members.filter((m) => m.trim() !== "");
        if (activeMembers.length > 4) {
          const query = encodeURIComponent(JSON.stringify(activeMembers));
          router.push(`/set-exclusion?members=${query}`);
        } else {
          router.push(`/no-exclusion`);
        }
    };

    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Who do you want to draw names with?</h2>
                <div className={styles.members}>
                    {members.map((member, index) => (
                    <input
                        key={index}
                        type="text"
                        className={styles.input}
                        value={member}
                        placeholder={`Enter member ${index + 1}...`}
                        onChange={(e) => updateMember(index, e.target.value)}
                    />
          ))}
        </div>
        <button className={styles.addButton} onClick={addMemberField}>
          +
        </button>
        <div className={styles.actions}>
          <button className={styles.backButton} onClick={() => history.back()}>
            ←
          </button>
          <button className={styles.continueButton} onClick={handleContinue}>
            Continue →
          </button>
        </div>
      </div>
    </div>
    );
}

export default STEP_02;