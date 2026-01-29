import { Router } from "express";
import { UserController } from "../controllers/user.controller.ts";

const router: Router = Router();

router.get("/profile", (req, res, next) =>
  UserController.getProfile(req, res).catch(next)
);

export const userRoutes: Router = router;
