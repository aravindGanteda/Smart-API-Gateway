import type { Request, Response } from "express";
import { notesServiceClient } from "../utils/httpClient.ts";

export async function listNotes(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!.userId;
    const response = await notesServiceClient.get("/notes", {
      params: { userId },
    });
    res.status(response.status).json(response.data);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "response" in err) {
      const ax = err as { response?: { status?: number; data?: unknown } };
      res.status(ax.response?.status ?? 500).json(
        ax.response?.data ?? { message: "Notes service error" }
      );
      return;
    }
    res.status(500).json({ message: "Notes service error" });
  }
}

export async function createNote(req: Request, res: Response): Promise<void> {
  try {
    const response = await notesServiceClient.post("/notes", {
      ...req.body,
      userId: req.user!.userId,
    });
    res.status(response.status).json(response.data);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "response" in err) {
      const ax = err as { response?: { status?: number; data?: unknown } };
      res.status(ax.response?.status ?? 500).json(
        ax.response?.data ?? { message: "Notes service error" }
      );
      return;
    }
    res.status(500).json({ message: "Notes service error" });
  }
}

export async function updateNote(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const response = await notesServiceClient.put(`/notes/${id}`, req.body);
    res.status(response.status).json(response.data);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "response" in err) {
      const ax = err as { response?: { status?: number; data?: unknown } };
      res.status(ax.response?.status ?? 500).json(
        ax.response?.data ?? { message: "Notes service error" }
      );
      return;
    }
    res.status(500).json({ message: "Notes service error" });
  }
}

export async function deleteNote(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const response = await notesServiceClient.delete(`/notes/${id}`);
    if (response.status === 204) {
      res.status(204).send();
      return;
    }
    res.status(response.status).json(response.data);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "response" in err) {
      const ax = err as { response?: { status?: number; data?: unknown } };
      res.status(ax.response?.status ?? 500).json(
        ax.response?.data ?? { message: "Notes service error" }
      );
      return;
    }
    res.status(500).json({ message: "Notes service error" });
  }
}
