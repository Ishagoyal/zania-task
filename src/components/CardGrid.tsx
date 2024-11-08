import React, { useEffect, useState } from "react";
import { CardItem } from "../types";
import Card from "./Card";
import CardOverlay from "./CardOverlay";

const CardGrid: React.FC = () => {
  const [data, setData] = useState<CardItem[]>([]);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/cards")
      .then((response) => response.json())
      .then(setData);
  }, []);

  const handleCardClick = (image: string) => {
    setOverlayImage(image);
  };

  const handleDragStart = (cardIndex: number) => {
    return (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData("cardIndex", cardIndex.toString());
    };
  };

  const handleDrop = (cardIndex: number) => {
    return (e: React.DragEvent<HTMLDivElement>) => {
      const draggedIndex = parseInt(e.dataTransfer.getData("cardIndex"));
      const updatedData = [...data];
      const [drageedCard] = updatedData.splice(draggedIndex, 1);
      updatedData.splice(cardIndex, 0, drageedCard);
      setData(updatedData);
    };
  };

  return (
    <div className="card-grid">
      {data.map((item, index) => (
        <div
          key={item.type}
          onDragStart={handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop(index)}
        >
          <Card item={item} onClick={handleCardClick}></Card>
        </div>
      ))}
      {overlayImage && (
        <CardOverlay
          image={overlayImage}
          onClose={() => setOverlayImage(null)}
        ></CardOverlay>
      )}
    </div>
  );
};

export default CardGrid;
