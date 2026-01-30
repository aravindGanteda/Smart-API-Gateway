import type { Request, Response } from "express";
import { notesServiceClient } from "../utils/httpClient.ts";

function notesHeaders(userId: string): Record<string, string> {
  return { "x-user-id": userId };
}

export async function listNotes(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!.userId;
    const response = await notesServiceClient.get("/notes", {
      headers: notesHeaders(userId),
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

export async function getNote(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const response = await notesServiceClient.get(`/notes/${id}`, {
      headers: notesHeaders(userId),
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
    const userId = req.user!.userId;
    const response = await notesServiceClient.post(
      "/notes",
      { title: req.body?.title, content: req.body?.content },
      { headers: notesHeaders(userId) }
    );
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
    const userId = req.user!.userId;
    const { id } = req.params;
    const response = await notesServiceClient.put(`/notes/${id}`, req.body, {
      headers: notesHeaders(userId),
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

export async function deleteNote(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const response = await notesServiceClient.delete(`/notes/${id}`, {
      headers: notesHeaders(userId),
    });
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
