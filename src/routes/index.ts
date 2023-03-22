import { Router } from "express";
import { baseEventController } from "../controllers";

const router = Router();

router.post("/event", baseEventController)

export default router