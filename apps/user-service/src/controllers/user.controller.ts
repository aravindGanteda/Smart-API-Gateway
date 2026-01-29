import type { Request, Response } from "express";
import { UserService } from "../services/user.service.ts";

export class UserController {
  static async getProfile(req: Request, res: Response) {
    const userId = req.headers["x-user-id"];
    if (typeof userId !== "string" || !userId) {
      return res.status(400).json({ message: "x-user-id header required" });
    }

    try {
      const user = await UserService.getById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
