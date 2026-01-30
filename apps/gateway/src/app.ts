import express, { type Express } from "express";
import type { Request, Response } from "express";
import { userRoutes } from "./routes/user.routes.ts";
import { notesRoutes } from "./routes/notes.routes.ts";

const app: Express = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("API Gateway - Phase 1");
});

app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

export default app;