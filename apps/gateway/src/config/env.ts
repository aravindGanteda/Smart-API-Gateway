import "dotenv/config";

export const env = {
  port: Number(process.env["PORT"] ?? 3003),
  jwtSecret: process.env["JWT_SECRET"] ?? "",
  accessTokenExpiry: process.env["ACCESS_TOKEN_EXPIRY"] ?? "15m",
  refreshTokenExpiry: process.env["REFRESH_TOKEN_EXPIRY"] ?? "7d",
  userServiceUrl: process.env["USER_SERVICE_URL"] ?? "http://localhost:3001",
  notesServiceUrl: process.env["NOTES_SERVICE_URL"] ?? "http://localhost:3002",
};

if (!env.jwtSecret) {
  console.warn("JWT_SECRET is not set - auth will fail");
}
