import { prisma } from "@repo/db";

export interface CreateNoteData {
  userId: string;
  title: string;
  content: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
}

export class NoteRepository {
  static create(data: CreateNoteData) {
    return prisma.note.create({
      data: {
        userId: data.userId,
        title: data.title,
        content: data.content,
      },
    });
  }

  static findManyByUserId(userId: string) {
    return prisma.note.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
  }

  static findById(id: string) {
    return prisma.note.findUnique({
      where: { id },
    });
  }

  static update(id: string, data: UpdateNoteData) {
    return prisma.note.update({
      where: { id },
      data: { title: data.title, content: data.content },
    });
  }

  static delete(id: string) {
    return prisma.note.delete({
      where: { id },
    });
  }
}
