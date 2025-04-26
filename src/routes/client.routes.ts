import express from "express";
import { ClientController } from "../controllers/client.controller";
import { apiKeyAuth } from "../middleware/auth.middleware";
import { validateClientCreation } from "../middleware/validation.middleware";

const router = express.Router();
const clientController = new ClientController();

router.post(
  "/clients",
  apiKeyAuth,
  validateClientCreation,
  clientController.createClient
);

router.get("/clients/:id", apiKeyAuth, clientController.getClient);

router.get("/clients/search", apiKeyAuth, clientController.searchClients);

export default router;
