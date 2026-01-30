import { NoteRepository } from "../repositories/note.repository.ts";

export class NotesService {
  static async create(userId: string, title: string, content: string) {
    return NoteRepository.create({ userId, title, content });
  }

  static async listByUser(userId: string) {
    return NoteRepository.findManyByUserId(userId);
  }

  static async getById(id: string, userId: string) {
    const note = await NoteRepository.findById(id);
    if (!note) return null;
    if (note.userId !== userId) return "forbidden" as const;
    return note;
  }

  static async update(
    id: string,
    userId: string,
    data: { title?: string; content?: string }
  ) {
    const note = await NoteRepository.findById(id);
    if (!note) return null;
    if (note.userId !== userId) return "forbidden" as const;
    return NoteRepository.update(id, data);
  }

  static async delete(id: string, userId: string) {
    const note = await NoteRepository.findById(id);
    if (!note) return null;
    if (note.userId !== userId) return "forbidden" as const;
    await NoteRepository.delete(id);
    return true;
  }
}
