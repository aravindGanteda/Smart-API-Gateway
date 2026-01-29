import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.ts";

const router: Router = Router();

router.post("/login", (req, res, next) =>
  AuthController.login(req, res).catch(next)
);
router.post("/register", (req, res, next) =>
  AuthController.register(req, res).catch(next)
);

export const authRoutes: Router = router;
