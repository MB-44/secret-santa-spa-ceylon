"use client";

import React, {useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./no.exclusion.module.css";

const NoExclusions: React.FC = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleContinue = () => {
        // alert("Continuing without exclusions!");
        router.push("/step04");
    };
    
    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Do you want to set exclusions?</h2>
                <p className={styles.description}>
                    An exclusion indicates who may <u>not</u> draw whom.
                </p>
                <p className={styles.subDescription}>
                    Your group is toosmall for exclusions.
                </p>
                <div className={styles.actions}>
                    <button className={styles.backButton} onClick={handleBack}>
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

export default NoExclusions;