import { Router } from "express";
import bulkRouter from "./Bulks";

const router = Router();

router.use("/bulks", bulkRouter)

export default router