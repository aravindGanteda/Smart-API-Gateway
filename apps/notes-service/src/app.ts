import express, { type Express } from "express";
import { extractUser } from "./middlewares/extractUser.middleware.ts";
import { notesRoutes } from "./routes/notes.routes.ts";

const app: Express = express();

app.use(express.json());
app.use(extractUser);

app.use("/notes", notesRoutes);

export default app;
