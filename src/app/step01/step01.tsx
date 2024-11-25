"use client";

import React, {useState} from "react";
import styles from "./step01.module.css";
import { useRouter } from "next/navigation";

const STEP_01: React.FC = () => {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleContinue = () => {
        if (name.trim() === "") {
            alert("Please enter your name!");
            return;
        }
        router.push(`/step02?userName=${encodeURIComponent(name)}`);
    };

    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <h3 className={styles.title}>What's your name?</h3>
                <div className={styles.inputWrapper}>
                    <input 
                        type="text" 
                        placeholder="Enter your name"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {name && (
                        <button
                            className={styles.clearButton}
                            onClick={() => setName("")}
                            aria-label="Clear name"
                        >
                            x
                        </button>
                    )}
                </div>
                <button className={styles.continueButton} onClick={handleContinue}>
                    Continue
                </button>
                {/* <p className={styles.description}>
                    blah blah blah
                </p> */}
            </div>
        </div>
    );
}

export default STEP_01;