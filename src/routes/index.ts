import { Router } from "express";
import bulkRouter from "./Bulks";

const router = Router();

router.use("/bulks", bulkRouter)
router.use("/customer", bulkRouter)
router.use("/facturas-compra", bulkRouter)

export default router