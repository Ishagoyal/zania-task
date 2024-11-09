// src/services/storageService.ts

export interface Card {
  type: string;
  title: string;
  position: number;
}

const STORAGE_KEY = "cardsData";

// Load cards data from localStorage, or fetch from data.json if not found
export const loadCardsData = async (): Promise<Card[]> => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    // If no data is found in localStorage, fetch from data.json
    try {
      const response = await fetch("/data.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      saveCardsData(data); // Save the fetched data to localStorage
      return data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching initial data:", error);
      return []; // Return an empty array if fetching fails
    }
  }
};

// Save cards data to localStorage
export const saveCardsData = (data: Card[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};

// Add a card to localStorage
export const addCard = async (newCard: Card): Promise<void> => {
  const currentData = await loadCardsData();
  currentData.push(newCard);
  saveCardsData(currentData);
};

// Update an existing card
export const updateCard = async (updatedCard: Card): Promise<void> => {
  const currentData = await loadCardsData();
  const index = currentData.findIndex(
    (card) => card.position === updatedCard.position
  );
  if (index !== -1) {
    currentData[index] = updatedCard;
    saveCardsData(currentData);
  }
};

// Delete a card from localStorage
export const deleteCard = async (position: number): Promise<void> => {
  const currentData = await loadCardsData();
  const updatedData = currentData.filter((card) => card.position !== position);
  saveCardsData(updatedData);
};
