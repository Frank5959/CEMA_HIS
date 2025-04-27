import { Router } from "express";
import { ProgramController } from "../controllers/program.controller";
import { apiKeyAuth } from "../middleware/auth.middleware";
import { validateProgramCreation } from "../middleware/validation.middleware";

const router = Router();
const ctrl = new ProgramController();
//create a program
router.post(
  "/programs",
  apiKeyAuth,
  validateProgramCreation,
  ctrl.createProgram.bind(ctrl)
);
//get all available programs
router.get("/programs", apiKeyAuth, ctrl.listPrograms.bind(ctrl));
//retrieve a program by id
router.get("/programs/:id", apiKeyAuth, ctrl.getProgram.bind(ctrl));

export default router;
