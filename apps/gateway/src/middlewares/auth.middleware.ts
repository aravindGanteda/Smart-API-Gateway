import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken, type TokenPayload } from "../utils/tokens.ts";

export type JwtPayload = TokenPayload;

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired access token" });
  }
}
