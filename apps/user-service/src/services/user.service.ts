import { UserRepository } from "../repositories/user.repository.ts";

export class UserService {
  static async getById(userId: string) {
    return UserRepository.findById(userId);
  }
}
