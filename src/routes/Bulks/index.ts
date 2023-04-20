import { Router } from "express";
import {BpExample} from '../../controllers/Bulks'
import { ValidateAndDecryptTokenBase } from "../../middlewares";

const bulkRouter = Router();

bulkRouter.post("/BP", [ValidateAndDecryptTokenBase], BpExample)


export default bulkRouter