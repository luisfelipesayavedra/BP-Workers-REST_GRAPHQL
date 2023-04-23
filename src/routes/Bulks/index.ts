import { Router } from "express";
import {BpCustomer, BpExample, BpInvoicePurchase } from '../../controllers/Bulks'
import { ValidateAndDecryptTokenBase } from "../../middlewares";

const bulkRouter = Router();

bulkRouter.post("/BP", [ValidateAndDecryptTokenBase], BpExample)
bulkRouter.post("/customer",[ValidateAndDecryptTokenBase] , BpCustomer)
bulkRouter.post("/facturas-compra", BpInvoicePurchase)


export default bulkRouter