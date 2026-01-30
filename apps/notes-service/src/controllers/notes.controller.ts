import type { Request, Response } from "express";
import { NotesService } from "../services/notes.service.ts";

export class NotesController {
  static async create(req: Request, res: Response) {
    const userId = req.userId!;
    const { title, content } = req.body as { title?: string; content?: string };
    if (!title || typeof title !== "string" || !content || typeof content !== "string") {
      res.status(400).json({ message: "title and content are required" });
      return;
    }
    try {
      const note = await NotesService.create(userId, title, content);
      res.status(201).json(note);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async list(req: Request, res: Response) {
    const userId = req.userId!;
    try {
      const notes = await NotesService.listByUser(userId);
      res.json(notes);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getOne(req: Request, res: Response) {
    const userId = req.userId!;
    const { id } = req.params;
    try {
      const result = await NotesService.getById(id as string, userId);
      if (result === null) {
        res.status(404).json({ message: "Note not found" });
        return;
      }
      if (result === "forbidden") {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      res.json(result);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response) {
    const userId = req.userId!;
    const { id } = req.params;
    const { title, content } = req.body as { title?: string; content?: string };
    try {
      const result = await NotesService.update(id as string, userId, { title, content });
      if (result === null) {
        res.status(404).json({ message: "Note not found" });
        return;
      }
      if (result === "forbidden") {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      res.json(result);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async delete(req: Request, res: Response) {
    const userId = req.userId!;
    const { id } = req.params;
    try {
      const result = await NotesService.delete(id as string, userId);
      if (result === null) {
        res.status(404).json({ message: "Note not found" });
        return;
      }
      if (result === "forbidden") {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      res.status(204).send();
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
