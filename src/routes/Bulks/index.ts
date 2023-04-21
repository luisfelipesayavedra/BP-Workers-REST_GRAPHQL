import { Router } from "express";
import {BpExample, BpSupplier} from '../../controllers/Bulks'
import { ValidateAndDecryptTokenBase } from "../../middlewares";

const bulkRouter = Router();

bulkRouter.post("/BP", [ValidateAndDecryptTokenBase], BpExample)
bulkRouter.post('/suppliers', [ValidateAndDecryptTokenBase], BpSupplier);


export default bulkRouter