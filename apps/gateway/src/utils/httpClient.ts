import axios from "axios";
import { serviceUrls } from "../config/services.ts";

export const userServiceClient = axios.create({
  baseURL: serviceUrls.user,
  timeout: 5000,
});

export const notesServiceClient = axios.create({
  baseURL: serviceUrls.notes,
  timeout: 5000,
});
