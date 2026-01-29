import express, { type Express } from "express";
import { internalOnly } from "./middlewares/internalOnly.middleware.ts";
import { authRoutes } from "./routes/auth.routes.ts";
import { userRoutes } from "./routes/user.routes.ts";

const app: Express = express();

app.use(express.json());
// app.use(internalOnly);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default app;