// src/services/storageService.ts

export interface Card {
  type: string;
  title: string;
  position: number;
}

const STORAGE_KEY = "cardsData";

// Load cards data from localStorage, or fetch from data.json if not found
export const loadCardsData = (): Card[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
      return [];
    }
  }

  // If no data found in localStorage, fetch from data.json
  fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
      saveCardsData(data); // Save the fetched data to localStorage
    })
    .catch((error) => console.error("Error fetching initial data:", error));

  return []; // Return empty array while waiting for fetch
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
export const addCard = (newCard: Card): void => {
  const currentData = loadCardsData();
  currentData.push(newCard);
  saveCardsData(currentData);
};

// Update an existing card
export const updateCard = (updatedCard: Card): void => {
  const currentData = loadCardsData();
  const index = currentData.findIndex(
    (card) => card.position === updatedCard.position
  );
  if (index !== -1) {
    currentData[index] = updatedCard;
    saveCardsData(currentData);
  }
};

// Delete a card from localStorage
export const deleteCard = (position: number): void => {
  const currentData = loadCardsData();
  const updatedData = currentData.filter((card) => card.position !== position);
  saveCardsData(updatedData);
};
