"use client";

import React, {useState} from "react";
import styles from "./navBar.module.css";
// import styles from 

const NavigationBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div className={styles.navbar}>
            {/* <div>
                <a href="">
                    <img src="../../images/logo.png" alt="logo" />
                </a>
            </div> */}


            <div className={styles.profileIcon} onClick={toggleMenu}>
                <img 
                    src="../src" 
                    alt="profile"
                    className={styles.iconImage}
                />
            </div>

            {isOpen && (
            <div className={styles.menu}>
                <ul className={styles.menuList}>
                    <li className={styles.menuItem}>My Wish List</li>
                    <li className={styles.menuItem}>My Drawn Name</li>
                    <li className={styles.menuItem}>My Group Page</li>
                    <hr className={styles.divider} />
                    <li className={styles.menuItem}>My Celebrations</li>
                    <li className={styles.menuItem}>My Wish Lists</li>
                    <li className={styles.menuItem}>My Account</li>
                    <li className={styles.menuItem}>menathlakvindub@gmail.com</li>
                    <li className={styles.menuItemSignOut}>Sign Out</li>
                </ul>
            </div>
      )}
        </div>
    )
}

export default NavigationBar;