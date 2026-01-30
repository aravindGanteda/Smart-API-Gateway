import type { Request, Response } from "express";
import { userServiceClient } from "../utils/httpClient.ts";
import { env } from "../config/env.ts";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/tokens.ts";

export async function register(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const response = await userServiceClient.post("/auth/register", req.body);
    res.status(response.status).json(response.data);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "response" in err) {
      const ax = err as { response?: { status?: number; data?: unknown } };
      res.status(ax.response?.status ?? 500).json(
        ax.response?.data ?? { message: "User service error" }
      );
      return;
    }
    res.status(500).json({ message: "User service error" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const response = await userServiceClient.post<{
      userId: string;
      role: string;
    }>("/auth/login", req.body);

    const { userId, role } = response.data;
    const payload = { userId, role };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    res.json({
      accessToken,
      refreshToken,
      expiresIn: env.accessTokenExpiry,
    });
  } catch (err: unknown) {
    if (err && typeof err === "object" && "response" in err) {
      const ax = err as { response?: { status?: number; data?: unknown } };
      res.status(ax.response?.status ?? 401).json(
        ax.response?.data ?? { message: "Invalid credentials" }
      );
      return;
    }
    res.status(500).json({ message: "User service error" });
  }
}

export async function refresh(req: Request, res: Response): Promise<void> {
  try {
    const refreshToken =
      (req.body as { refreshToken?: string }).refreshToken ??
      req.headers.authorization?.replace(/^Bearer\s+/i, "").trim();

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token required" });
      return;
    }

    const payload = verifyRefreshToken(refreshToken);
    const accessToken = createAccessToken(payload);
    const newRefreshToken = createRefreshToken(payload);

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: env.accessTokenExpiry,
    });
  } catch {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
}

export async function getProfile(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!.userId;
    const response = await userServiceClient.get("/users/profile", {
      headers: { "x-user-id": userId },
    });
    res.status(response.status).json(response.data);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "response" in err) {
      const ax = err as { response?: { status?: number; data?: unknown } };
      res.status(ax.response?.status ?? 500).json(
        ax.response?.data ?? { message: "User service error" }
      );
      return;
    }
    res.status(500).json({ message: "User service error" });
  }
}
