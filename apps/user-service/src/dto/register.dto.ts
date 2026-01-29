import type { Role } from "@repo/db";

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  role?: Role;
}
