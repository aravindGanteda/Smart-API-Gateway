import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import * as userProxy from "../proxy/user.proxy.ts";

const router: Router = Router();

router.post("/register", userProxy.register);
router.post("/login", userProxy.login);
router.post("/refresh", userProxy.refresh);
router.get("/profile", authMiddleware, userProxy.getProfile);

export const userRoutes: Router = router;
