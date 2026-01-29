import { UserRepository } from "../repositories/user.repository.ts";
import { comparePassword, hashPassword } from "../utils/password.util.ts";
import type { LoginDto } from "../dto/login.dto.ts";
import type { RegisterDto } from "../dto/register.dto.ts";

const INVALID_CREDENTIALS = "Invalid credentials";

export class AuthService {
  static async verifyCredentials(body: LoginDto) {
    const user = await UserRepository.findByEmail(body.email);
    if (!user || !user.isActive) {
      throw new Error(INVALID_CREDENTIALS);
    }

    const valid = await comparePassword(body.password, user.password);
    if (!valid) {
      throw new Error(INVALID_CREDENTIALS);
    }

    return {
      userId: user.id,
      role: user.role,
    };
  }

  static async register(data: RegisterDto) {
    const hashed = await hashPassword(data.password);
    return UserRepository.create({
      ...data,
      password: hashed,
    });
  }
}
