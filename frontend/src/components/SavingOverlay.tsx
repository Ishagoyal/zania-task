import React from "react";
import "../styles.css";

interface SavingOverlayProps {
  isSaving: boolean;
}

const SavingOverlay: React.FC<SavingOverlayProps> = ({ isSaving }) => {
  if (!isSaving) return null;

  return (
    <div className="saving-overlay">
      <div className="saving-spinner" />
      <p>Saving...</p>
    </div>
  );
};

export default SavingOverlay;
