import { Router } from "express";
import {BpExample, Products} from '../../controllers/Bulks'
import { ValidateAndDecryptTokenBase } from "../../middlewares";

const bulkRouter = Router();

bulkRouter.post("/BP", [ValidateAndDecryptTokenBase], BpExample)
bulkRouter.post("/products", [ValidateAndDecryptTokenBase], Products)


export default bulkRouter