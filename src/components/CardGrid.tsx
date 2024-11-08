import React, { useEffect, useState } from "react";
import { CardItem } from "../types";
import Card from "./Card";
import CardOverlay from "./CardOverlay";

const CardGrid: React.FC = () => {
  const [data, setData] = useState<CardItem[]>([]);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("public/data.json")
      .then((response) => response.json())
      .then(setData);
  }, []);

  const handleCardClick = (image: string) => {
    setOverlayImage(image);
  };
  return (
    <div className="card-grid">
      {data.map((item, index) => (
        <div>
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
