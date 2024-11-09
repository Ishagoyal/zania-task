import React, { useEffect, useRef, useState } from "react";
import { CardItem } from "../types";
import Card from "./Card";
import CardOverlay from "./CardOverlay";
import "../styles.css";
import SavingOverlay from "./SavingOverlay";

const CardGrid: React.FC = () => {
  const [data, setData] = useState<CardItem[]>([]);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const saveInterval = useRef<number | null>(null);

  // Effect to automatically save changes every 5 seconds if there are unsaved changes
  useEffect(() => {
    fetch("/api/cards")
      .then((response) => response.json())
      .then(setData);
  }, []);

  // Save data function
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
    if (!isDragging) {
      setOverlayImage(image);
    }
  };

  const handleDragStart =
    (index: number) => (e: React.DragEvent<HTMLDivElement>) => {
      setIsDragging(true);
      setDragIndex(index);
      e.dataTransfer.effectAllowed = "move";

      // Add drag image or ghost element if needed
      if (e.dataTransfer.setDragImage && e.currentTarget) {
        e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
      }

      // Set minimal data to identify this is our drag
      e.dataTransfer.setData("text/plain", index.toString());
    };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragIndex(null);
    setDropTargetIndex(null);
  };

  const handleDragEnter =
    (index: number) => (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (dragIndex !== null && dragIndex !== index) {
        setDropTargetIndex(index);
      }
    };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // Only reset if we're leaving the card container, not entering a child element
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    setDropTargetIndex(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop =
    (dropIndex: number) => (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (dragIndex === null || dragIndex === dropIndex) {
        setDropTargetIndex(null);
        return;
      }

      // Create a new array and perform the reorder
      const updatedData = [...data];
      const [draggedCard] = updatedData.splice(dragIndex, 1);
      updatedData.splice(dropIndex, 0, draggedCard);
      // Update positions
      const reorderedData = updatedData.map((card, index) => ({
        ...card,
        position: index,
      }));

      setData(reorderedData);
      setHasChanges(true);
      setDragIndex(null);
      setDropTargetIndex(null);
      setIsDragging(false);
    };

  const timeSinceLastSave = lastSaveTime
    ? `${Math.floor((Date.now() - lastSaveTime.getTime()) / 1000)} seconds ago`
    : "Never";

  const getCardClassName = (index: number) => {
    let className = "card-container";
    if (isDragging) {
      if (index === dragIndex) {
        className += " dragging";
      } else if (index === dropTargetIndex) {
        className += " drop-target";
      }
    }
    return className;
  };

  return (
    <div className="card-grid-container">
      <div className="save-info">
        {isSaving ? (
          <SavingOverlay isSaving={isSaving} />
        ) : (
          <div className="last-saved">
            <span>Last saved: {timeSinceLastSave}</span>
          </div>
        )}
      </div>
      <div className={`card-grid ${isDragging ? "dragging" : ""}`}>
        {data.map((item, index) => (
          <div
            key={`${item.type}-${index}`}
            className={getCardClassName(index)}
            draggable={true}
            onDragStart={handleDragStart(index)}
            onDragEnd={handleDragEnd}
            onDragEnter={handleDragEnter(index)}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop(index)}
          >
            <Card
              item={item}
              onClick={handleCardClick}
              isDragging={dragIndex === index}
              isDropTarget={dropTargetIndex === index}
            />
          </div>
        ))}
        {overlayImage && (
          <CardOverlay
            image={overlayImage}
            onClose={() => setOverlayImage(null)}
          />
        )}
        <button
          className="add-card-button"
          onClick={() =>
            addCard({
              type: `new-card-${Date.now()}`,
              title: "New Card",
              position: data.length,
            })
          }
        >
          Add Card
        </button>
      </div>
    </div>
  );
};

export default CardGrid;
