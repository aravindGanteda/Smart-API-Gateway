import jwt from "jsonwebtoken";
import { env } from "../config/env.ts";

export type TokenPayload = { userId: string; role: string };

export function createAccessToken(payload: TokenPayload): string {
  return jwt.sign(
    { ...payload, type: "access" },
    env.jwtSecret,
    { expiresIn: env.accessTokenExpiry }
  );
}

export function createRefreshToken(payload: TokenPayload): string {
  return jwt.sign(
    { ...payload, type: "refresh" },
    env.jwtSecret,
    { expiresIn: env.refreshTokenExpiry }
  );
}

function verifyToken(token: string, expectedType: "access" | "refresh"): TokenPayload {
  const decoded = jwt.verify(token, env.jwtSecret) as TokenPayload & { type?: string };
  if (decoded.type !== expectedType) {
    throw new Error("Invalid token type");
  }
  return { userId: decoded.userId, role: decoded.role };
}

export function verifyAccessToken(token: string): TokenPayload {
  return verifyToken(token, "access");
}

export function verifyRefreshToken(token: string): TokenPayload {
  return verifyToken(token, "refresh");
}
