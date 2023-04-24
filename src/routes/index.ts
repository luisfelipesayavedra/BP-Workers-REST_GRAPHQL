import { Router } from "express";
import bulkRouter from "./Bulks";

const router = Router();

router.use("/bulks", bulkRouter)
router.use("/customer", bulkRouter)

export default router