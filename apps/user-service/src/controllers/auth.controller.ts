import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.ts";
import type { LoginDto } from "../dto/login.dto.ts";
import type { RegisterDto } from "../dto/register.dto.ts";
import { z } from "zod";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      //validate the body
      const result = z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }).safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ message: result.error.issues[0]?.message });
      }

      const user = await AuthService.verifyCredentials(result.data as LoginDto);
      res.json(user);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid credentials";
      res.status(401).json({ message });
    }
  }

  static async register(req: Request, res: Response) {
    try {
        //validate the body
      const result = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1),
      }).safeParse(req.body);


      if (!result.success) {
        return res.status(400).json({ message: result.error.issues[0]?.message });
      }

      const user = await AuthService.register(result.data as RegisterDto);

      res.status(201).json(user);
 
    } catch (err: unknown) {
      if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
        return res.status(409).json({ message: "Email already registered" });
      }
      const message = err instanceof Error ? err.message : "Registration failed";
      res.status(400).json({ message });
    }
  }
}
