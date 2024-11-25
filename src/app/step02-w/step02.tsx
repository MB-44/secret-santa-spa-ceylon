"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./step02.module.css";

const STEP02_WISHLIST: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [items, setItems] = useState([{ name: "", link: "", rank: 1 }]);
  const router = useRouter();

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const addNewItem = () => {
    setItems([...items, { name: "", link: "", rank: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const saveWishlist = () => {
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    if (items.some((item) => !item.name.trim() || !item.link.trim() || item.rank <= 0)) {
      alert("Please complete all item details before saving.");
      return;
    }

    const newWishlist = {
      id: Date.now(),
      title,
      description,
      visibility,
      updated: new Date().toLocaleDateString(),
      items,
    };

    const existingWishlists = JSON.parse(localStorage.getItem("wishlists") || "[]");
    localStorage.setItem("wishlists", JSON.stringify([...existingWishlists, newWishlist]));

    router.push("/step01-w");
  };

  const isCurrentItemIncomplete = () => {
    const currentItem = items[items.length - 1];
    return !currentItem.name.trim() || !currentItem.link.trim() || currentItem.rank <= 0;
  };

  return (
    <div className={styles.container}>
      <h1>Create Wishlist</h1>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          placeholder="Enter the title of the wishlist"
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        ></textarea>
      </div>
      <div>
        <label>Visibility</label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className={styles.select}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="groups">Groups</option>
        </select>
      </div>
      <div>
        <h3 className={styles.wishlistTitle}>Wishlist Items</h3>
        {items.map((item, index) => (
          <div key={index} className={styles.itemContainer}>
            <label>Product Name</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              className={styles.input}
              placeholder="Enter product name"
            />

            <label>Product URL</label>
            <input
              type="url"
              value={item.link}
              onChange={(e) => handleItemChange(index, "link", e.target.value)}
              className={styles.input}
              placeholder="Enter product URL"
            />

            <label>Rank</label>
            <input
              type="number"
              value={item.rank}
              onChange={(e) => handleItemChange(index, "rank", Number(e.target.value))}
              className={styles.input}
              min="1"
              placeholder="Enter rank"
            />

            {index > 0 && (
              <button
                className={styles.removeButton}
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          className={styles.addButton}
          onClick={addNewItem}
          disabled={isCurrentItemIncomplete()}
        >
          Add New Item
        </button>
      </div>
      <button onClick={saveWishlist} className={styles.saveButton}>
        Save Wishlist
      </button>
    </div>
  );
};

export default STEP02_WISHLIST;



// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./step02.module.css";

// const STEP02_WISHLIST: React.FC = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [visibility, setVisibility] = useState("public");
//   const [items, setItems] = useState([{ name: "", link: "", rank: 1 }]); // Initialize with an empty item
//   const router = useRouter();

//   const handleItemChange = (index: number, field: string, value: string | number) => {
//     const updatedItems = [...items];
//     updatedItems[index] = { ...updatedItems[index], [field]: value };
//     setItems(updatedItems);
//   };

//   const addNewItem = () => {
//     setItems([...items, { name: "", link: "", rank: 1 }]);
//   };

//   const removeItem = (index: number) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   const saveWishlist = () => {
//     if (!title.trim()) {
//       alert("Title is required!");
//       return;
//     }

//     const newWishlist = {
//       id: Date.now(),
//       title,
//       description,
//       visibility,
//       updated: new Date().toLocaleDateString(),
//       items,
//     };

//     const existingWishlists = JSON.parse(localStorage.getItem("wishlists") || "[]");
//     localStorage.setItem("wishlists", JSON.stringify([...existingWishlists, newWishlist]));

//     router.push("/step01-w");
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Create Wishlist</h1>
//       <div>
//         <label>Title</label>
//         <input
//           type="text"
//           value={title}
//           placeholder="Enter wishlist name"
//           onChange={(e) => setTitle(e.target.value)}
//           className={styles.input}
//         />
//       </div>
//       <div>
//         <label>Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className={styles.textarea}
//         ></textarea>
//       </div>
//       <div>
//         <label>Visibility</label>
//         <select
//           value={visibility}
//           onChange={(e) => setVisibility(e.target.value)}
//           className={styles.select}
//         >
//           <option value="public">Public</option>
//           <option value="private">Private</option>
//           <option value="groups">Groups</option>
//         </select>
//       </div>
//       <div>
//         <h3 className={styles.wishlistTitle}>Wishlist Items</h3>
//         {items.map((item, index) => (
//           <div key={index} className={styles.itemContainer}>
//             <label>Product Name</label>
//             <input
//               type="text"
//               value={item.name}
//               onChange={(e) => handleItemChange(index, "name", e.target.value)}
//               className={styles.input}
//               placeholder="Enter product name"
//             />

//             <label>Product URL</label>
//             <input
//               type="url"
//               value={item.link}
//               onChange={(e) => handleItemChange(index, "link", e.target.value)}
//               className={styles.input}
//               placeholder="Enter product URL"
//             />

//             <label>Rank</label>
//             <input
//               type="number"
//               value={item.rank}
//               onChange={(e) => handleItemChange(index, "rank", Number(e.target.value))}
//               className={styles.input}
//               min="1"
//               placeholder="Enter rank"
//             />

//             <button
//               className={styles.removeButton}
//               onClick={() => removeItem(index)}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//         <button className={styles.addButton} onClick={addNewItem}>
//           Add New Item
//         </button>
//       </div>
//       <button onClick={saveWishlist} className={styles.saveButton}>
//         Save Wishlist
//       </button>
//     </div>
//   );
// };

// export default STEP02_WISHLIST;
