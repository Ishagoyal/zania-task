import React, { useEffect } from "react";

interface CardOverlayProps {
  image: string;
  onClose: () => void;
}

const CardOverlay: React.FC<CardOverlayProps> = ({ image, onClose }) => {
  // Use Effect for handling escape key functionality
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <img src={image} alt="Document"></img>
    </div>
  );
};

export default CardOverlay;
