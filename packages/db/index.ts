import { config } from "dotenv";
import { join } from "node:path";
import { PrismaClient } from "./prisma/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

// Load packages/db/.env so DATABASE_URL is set when any app imports @repo/db (e.g. turbo run from root).
config({ path: join(import.meta.dir, ".env") });

const connectionString = process.env["DATABASE_URL"];
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
export type { PrismaClient };
export type { Role } from "./prisma/generated/prisma/client.ts";
