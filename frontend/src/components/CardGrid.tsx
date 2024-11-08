import React, { useEffect, useRef, useState } from "react";
import { CardItem } from "../types";
import Card from "./Card";
import CardOverlay from "./CardOverlay";
import "../styles.css";

const CardGrid: React.FC = () => {
  const [data, setData] = useState<CardItem[]>([]);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);

  const saveInterval = useRef<number | null>(null);

  useEffect(() => {
    fetch("/api/cards")
      .then((response) => response.json())
      .then(setData);
  }, []);

  // Effect to automatically save changes every 5 seconds if there are unsaved changes
  useEffect(() => {
    if (saveInterval.current) clearInterval(saveInterval.current);
    saveInterval.current = setInterval(() => {
      if (hasChanges) {
        saveData();
      }
    }, 5000);
    return () => {
      if (saveInterval.current) clearInterval(saveInterval.current);
    };
  }, [hasChanges, data]);

  // Save data function
  const saveData = () => {
    setIsSaving(true);

    fetch("/api/cards", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(() => {
        setIsSaving(false);
        setHasChanges(false);
        setLastSaveTime(new Date());
      })
      .catch((err) => {
        console.error("Error saving data:", err);
        setIsSaving(false);
      });
  };

  const addCard = (newCard: CardItem) => {
    setData((prevData) => [...prevData, newCard]);
    setHasChanges(true); // Mark changes as unsaved
  };

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
      setHasChanges(true);
    };
  };

  // Calculate the time elapsed since the last save
  const timeSinceLastSave = lastSaveTime
    ? `${Math.floor((Date.now() - lastSaveTime.getTime()) / 1000)} seconds ago`
    : "Never";

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
      <button
        onClick={() =>
          addCard({
            type: "new-card",
            title: "New Card",
            position: data.length,
          })
        }
      >
        Add Card
      </button>

      {/* Display loading spinner with "Saving..." message while saving */}
      <div className="save-info">
        {isSaving ? (
          <div className="loading-spinner">
            <span>Saving...</span>
            {/* Spinner element */}
            <div className="spinner"></div>
          </div>
        ) : (
          <span>Last saved: {timeSinceLastSave}</span>
        )}
      </div>
    </div>
  );
};

export default CardGrid;
