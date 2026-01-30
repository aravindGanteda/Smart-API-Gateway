import app from "./app.ts";
import { env } from "./config/env.ts";

app.listen(env.port, () => {
  console.log(`Gateway running on port ${env.port}`);
});
