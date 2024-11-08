import { http, HttpResponse } from "msw";
import { loadCardsData } from "../services/storage";

const data = loadCardsData();
export const handlers = [
  // Mocked get api
  http.get("/api/cards", () => {
    return HttpResponse.json(data);
  }),

  // Mocked post api
  http.post("api/cards", async ({ request }) => {
    const requestBody = await request.json();
    return HttpResponse.json(requestBody, { status: 201 });
  }),

  // Mocked put api
  http.put("api/cards", async ({ request }) => {
    const requestBody = await request.json();
    return HttpResponse.json(requestBody, { status: 201 });
  }),
];
