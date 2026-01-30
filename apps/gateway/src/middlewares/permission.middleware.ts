import type { Request, Response, NextFunction } from "express";

const permissions: Record<string, string[]> = {
  USER: ["NOTES_READ", "NOTES_WRITE"],
  ADMIN: ["NOTES_READ", "NOTES_WRITE", "NOTES_DELETE"],
};

export function permissionMiddleware(requiredPermission: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;
    if (!userRole) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const allowed = permissions[userRole]?.includes(requiredPermission);
    if (!allowed) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
}
