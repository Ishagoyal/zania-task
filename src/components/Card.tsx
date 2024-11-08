import React, { useState } from "react";
import { CardItem } from "../types";
import "../styles.css";

interface CardProps {
  item: CardItem;
  onClick: (image: string) => void;
}
const Card: React.FC<CardProps> = ({ item, onClick }) => {
  const [loading, setLoading] = useState(true);

  const thumbnailMap: { [key: string]: string } = {
    "bank-draft": "public/images/cat-pet-animal-domestic-104827.jpeg",
    "bill-of-lading": "public/images/kitty-cat-kitten-pet-45201 (1).jpeg",
    invoice: "public/images/pexels-photo-982865.jpeg",
    "bank-draft-2": "public/images/pexels-photo-1056251.jpeg",
    "bill-of-lading-2": "public/images/pexels-photo-4587959.jpeg",
  };

  const handleImageLoad = () => setLoading(false);

  return (
    <div
      className="card"
      onClick={() => onClick(thumbnailMap[item.type])}
      draggable
    >
      <h3>{item.title}</h3>
      {loading && <div className="spinner"> Loading...</div>}
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
