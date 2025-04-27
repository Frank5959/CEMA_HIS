import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clientRoutes from "./routes/client.routes";
import programRoutes from "./routes/program.routes";
import { ApiHelper } from "./helpers/api.helper";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Parse JSON bodies only for methods with payloads
app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return express.json()(req, res, next);
  }
  next();
});

// Serve static assets (presentations, mockups, etc.)
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/api/v1", clientRoutes);
app.use("/api/v1", programRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Global error:", err);
    ApiHelper.error(res, "Internal server error");
  }
);

app.listen(port, () => console.log(`Server running on port ${port}`));
