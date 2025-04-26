import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import { apiKeyAuth } from "../middleware/auth.middleware";
import { validateClientCreation } from "../middleware/validation.middleware";

const router = Router();
const ctrl = new ClientController();

router.post(
  "/clients",
  apiKeyAuth,
  validateClientCreation,
  ctrl.createClient.bind(ctrl)
);
router.get("/clients/:id", apiKeyAuth, ctrl.getClient.bind(ctrl));
router.get("/clients/search", apiKeyAuth, ctrl.searchClients.bind(ctrl));

// Enrollment endpoints
router.post("/clients/:id/enroll", apiKeyAuth, (req, res) =>
  ctrl.enrollClient(req, res)
);
router.get("/clients/:id/enrollments", apiKeyAuth, (req, res) =>
  ctrl.getClientEnrollments(req, res)
);

export default router;
