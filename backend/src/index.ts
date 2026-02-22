import app from "./app";
import env from "./config/env";
import { pool } from "./db/client";

const start = async () => {
  try {
    // Verify database connection
    await pool.query("SELECT 1");
    console.log("✓ Database connected");

    app.listen(env.PORT, () => {
      console.log(`✓ Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    });
  } catch (err) {
    console.error("✗ Failed to start server:", err);
    process.exit(1);
  }
};

start();
