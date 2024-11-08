import { http, HttpResponse } from "msw";
import { loadCardsData } from "../services/storage";

const data = loadCardsData();
export const handlers = [
  // Mocked
  http.get("/api/cards", () => {
    return HttpResponse.json(data);
  }),

  http.post("api/cards", async ({ request }) => {
    const requestBody = await request.json();
    return HttpResponse.json(requestBody, { status: 201 });
  }),

  http.post("api/cards", async ({ request }) => {
    const requestBody = await request.json();
    return HttpResponse.json(requestBody, { status: 201 });
  }),

  http.put("api/cards", async ({ request }) => {
    const requestBody = await request.json();
    return HttpResponse.json(requestBody, { status: 201 });
  }),
];
