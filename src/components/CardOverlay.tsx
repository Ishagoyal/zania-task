import React, { useState } from "react";

interface CardOverlayProps {
  image: string;
  onClose: () => void;
}

const CardOverlay: React.FC<CardOverlayProps> = ({ image, onClose }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <img src={image} alt="Document"></img>
    </div>
  );
};

export default CardOverlay;
