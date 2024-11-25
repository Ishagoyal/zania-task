import { http, HttpResponse } from "msw";
import { Card, loadCardsData, saveCardsData } from "../services/storage";

export const handlers = [
  // Mocked get api
  http.get("/api/cards", async () => {
    const data = await loadCardsData();
    return HttpResponse.json(data);
  }),

  // Mocked post api
  http.post("/api/cards", async ({ request }) => {
    const requestBody = await request.json();
    saveCardsData(requestBody as Card[]);
    return HttpResponse.json(requestBody, { status: 201 });
  }),

  // Mocked put api
  http.put("/api/cards", async ({ request }) => {
    const requestBody = await request.json();
    saveCardsData(requestBody as Card[]);
    return HttpResponse.json(requestBody, { status: 201 });
  }),
];
