"use client";

import React, {useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./navBar.module.css";
import Link from "next/link";

const NavigationBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSignOutPopup, setShowSignOutPopup] = useState(false);
    
    // const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSignOut = () => {
      console.log("user sign out!")
      setShowSignOutPopup(false);
    };

    return(
        <div className={styles.navbar}>

        <div className={styles.logoContainer}>
            <Link href="/mainDashboard">
                <img
                    src="/images/logo-32.png"
                    alt="Logo"
                    className={styles.logo}
                />
            </Link>
        </div>

        <div className={styles.profileIcon} onClick={toggleMenu}>
            <img
                src="/images/people-32.png"
          alt="Profile"
          className={styles.iconImage}
        />
      </div>

      {isOpen && (
        <div className={styles.menu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>My Celebrations</li>
            <li className={styles.menuItem}>My Wish Lists</li>
            <li className={styles.menuItem}>My Account</li>
            <li 
              className={styles.menuItemSignOut}
              onClick={() => setShowSignOutPopup(true)}
              >
                Sign Out
            </li>
          </ul>
        </div>
      )}

      {showSignOutPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <p>Do you want to sign out from the account</p>
            <div className={styles.popupActions}>
              <button className={styles.yesButton} onClick={handleSignOut}>Yes</button>
              <button className={styles.noButton} onClick={() => setShowSignOutPopup(false)}>No</button>
            </div>
          </div>
        </div>
      )}

    </div>
    );
};

export default NavigationBar;