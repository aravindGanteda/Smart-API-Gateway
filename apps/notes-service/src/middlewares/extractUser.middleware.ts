import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function extractUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const userId = req.headers["x-user-id"];
  if (!userId || typeof userId !== "string" || !userId.trim()) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }
  req.userId = userId.trim();
  next();
}
