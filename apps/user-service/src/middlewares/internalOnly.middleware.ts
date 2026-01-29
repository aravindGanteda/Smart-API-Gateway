import type { Request, Response, NextFunction } from "express";

export function internalOnly(req: Request, res: Response, next: NextFunction) {
  if (req.headers["x-internal-request"] !== "true") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}
