import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import { apiKeyAuth } from "../middleware/auth.middleware";
import { validateClientCreation } from "../middleware/validation.middleware";

const router = Router();
const ctrl = new ClientController();

//register new client
router.post(
  "/clients",
  apiKeyAuth,
  validateClientCreation,
  ctrl.createClient.bind(ctrl)
);

//search for a client
router.get("/clients/search", apiKeyAuth, ctrl.searchClients.bind(ctrl));
//check if a user is registed
router.get("/clients/:id", apiKeyAuth, ctrl.getClient.bind(ctrl));

// Enrollment endpoints
router.post("/clients/:id/enroll", apiKeyAuth, (req, res) =>
  ctrl.enrollClient(req, res)
);
//check the program a user is enrolled
router.get("/clients/:id/enrollments", apiKeyAuth, (req, res) =>
  ctrl.getClientEnrollments(req, res)
);

export default router;
