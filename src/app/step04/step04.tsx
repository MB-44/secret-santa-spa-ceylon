"use client";

import React, {useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./step04.module.css";

const STEP_04: React.FC = () => {
    const [groupName, setGroupName] = useState("");
    const router = useRouter();

    const handleContinue = () => {
        if (groupName.trim() === "") {
            alert("Please enter a group name.");
            return;
        }
        router.push(`/step05?groupName=${encodeURIComponent(groupName)}`);
    };

    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Group name</h2>
                <div className={styles.inputWrapper}>
                    <input 
                        type="text" 
                        className={styles.input}
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter group name"
                    />
                    {groupName && (
                        <button
                            className={styles.clearButton}
                            onClick={() => setGroupName("")}
                            aria-label="Clear group name"
                        >
                            X
                        </button>
                    )}
                </div>
                <div className={styles.actions}>
                    <button 
                        className={styles.backButton}
                        onClick={() => router.back()}
                    >
                        ←
                    </button>
                    <button 
                        className={styles.continueButton}
                        onClick={handleContinue}
                    >
                        Continuee →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default STEP_04;