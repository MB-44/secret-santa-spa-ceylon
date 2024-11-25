"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./step01.module.css";

const STEP01_WISHLIST: React.FC = () => {
  const [wishlists, setWishlists] = useState([]);
  const router = useRouter();

  console.log("Wishlists state:", wishlists);
  console.log("Styles imported:", styles);

  const handleCreateWishlist = () => {
    router.push("/step02-w");
  };

  return (
    <div className={styles?.container || ""}>
      <h1 className={styles?.title || ""}>Your Wishlists</h1>
      <button className={styles?.shareButton || ""}>Share Wishlists</button>
      <div className={styles?.wishlistsContainer || ""}>
        {Array.isArray(wishlists) && wishlists.length > 0 ? (
          wishlists.map((wishlist) => (
            <div key={wishlist?.id || Math.random()} className={styles?.wishlistCard || ""}>
              <div className={styles?.cardHeader || ""}>
                <div className={styles?.iconWrapper || ""}>
                  <span className={styles?.itemCount || ""}>
                    {wishlist?.items?.length || 0}
                  </span>
                </div>
              </div>
              <h3>{wishlist?.title || "Untitled Wishlist"}</h3>
              <p>{wishlist?.visibility || "private"}</p>
              <p>Last updated: {wishlist?.updated || "N/A"}</p>
            </div>
          ))
        ) : (
          <p className={styles?.emptyState || ""}>You have no wishlists yet.</p>
        )}
        <div className={styles?.createWishlistCard || ""} onClick={handleCreateWishlist}>
          <h3>Create a Wishlist</h3>
          <div className={styles?.plusIcon || ""}> + </div>
        </div>
      </div>
    </div>
  );
};

export default STEP01_WISHLIST;
