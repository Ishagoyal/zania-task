import React, { useState } from "react";
import { CardItem } from "../types";
import "../styles.css";

interface CardProps {
  item: CardItem;
  onClick: (image: string) => void;
  isDragging?: boolean;
}
const Card: React.FC<CardProps> = ({ item, onClick, isDragging }) => {
  const [loading, setLoading] = useState(true);

  // Thumbnail mapping
  const thumbnailMap: { [key: string]: string } = {
    "bank-draft": "/images/cat-pet-animal-domestic-104827.jpeg",
    "bill-of-lading": "/images/kitty-cat-kitten-pet-45201 (1).jpeg",
    invoice: "/images/pexels-photo-982865.jpeg",
    "bank-draft-2": "/images/pexels-photo-1056251.jpeg",
    "bill-of-lading-2": "/images/pexels-photo-4587959.jpeg",
  };

  const handleImageLoad = () => setLoading(false);

  return (
    <div
      className={`card ${isDragging ? "dragging" : ""}`}
      onClick={() => onClick(thumbnailMap[item.type])}
      draggable
    >
      <h3>{item.title}</h3>
      {loading && (
        <div className="loading-container">
          <div className="loading">Loading...</div>
          <div className="spinner"> </div>
        </div>
      )}
      <img
        src={thumbnailMap[item.type]}
        alt={item.title}
        onLoad={handleImageLoad}
        style={{ display: loading ? "none" : "block" }}
      ></img>
    </div>
  );
};

export default Card;
