import { Router } from "express";
import {BpExample, Products, BpSupplier, sellInvoice} from '../../controllers/Bulks'
import { ValidateAndDecryptTokenBase } from "../../middlewares";

const bulkRouter = Router();

bulkRouter.post("/BP", [ValidateAndDecryptTokenBase], BpExample)
bulkRouter.post("/products", [ValidateAndDecryptTokenBase], Products)
bulkRouter.post('/suppliers', [ValidateAndDecryptTokenBase], BpSupplier);
bulkRouter.post('/sellInvoice', [ValidateAndDecryptTokenBase], sellInvoice)


export default bulkRouter