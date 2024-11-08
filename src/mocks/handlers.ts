import { http, HttpResponse } from "msw";
import { loadCardsData } from "../services/storage";

const data = loadCardsData();
export const handlers = [
  http.get("/api/cards", () => {
    return HttpResponse.json(data);
  }),
];
