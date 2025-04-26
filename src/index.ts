import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clientRoutes from "./routes/client.routes";
import { DbHelper } from "./databasehelpers/db.helper";
import logger from "./helpers/logger.helper";
import { ApiHelper } from "./helpers/api.helper";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", clientRoutes);

// Health Check Endpoint
app.get("/health", async (req, res) => {
  const dbHealth = await DbHelper.getInstance().healthCheck();
  res.json({
    status: dbHealth ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    database: dbHealth ? "connected" : "disconnected",
  });
});

// Error Handling Middleware
app.use((err: Error, req: express.Request, res: express.Response) => {
  logger.error(`Global error handler: ${err.stack}`);
  ApiHelper.error(res, "Internal server error", 500);
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
  logger.info(`Environment: ${process.env.NODE_ENV || "development"}`);
});
