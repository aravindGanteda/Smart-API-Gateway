import "dotenv/config";
import app from "./app.ts";

const PORT = process.env["PORT"] ?? 3001;

app.listen(Number(PORT), () => {
  console.log(`User service running on port ${PORT}`);
});