import { env } from "./env.js";

export const serviceUrls = {
  user: env.userServiceUrl,
  notes: env.notesServiceUrl,
};
