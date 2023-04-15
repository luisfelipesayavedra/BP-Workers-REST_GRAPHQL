import { Router } from "express";
import {purchaseInvoice, ProductsBulkControllers, sellInvoice, Customers, NotaCreditoBulController} from '../../controllers/Bulks'
import { ValidateAndDecryptTokenBase } from "../../middlewares";

const bulkRouter = Router();

bulkRouter.post("/PurchaseInvoice", [ValidateAndDecryptTokenBase], purchaseInvoice)
bulkRouter.post("/SellInvoice", [ValidateAndDecryptTokenBase], sellInvoice)
bulkRouter.post("/products", [ValidateAndDecryptTokenBase], ProductsBulkControllers)
bulkRouter.post("/customer", [ValidateAndDecryptTokenBase], Customers)
bulkRouter.post("/NotaCredito", [ValidateAndDecryptTokenBase], NotaCreditoBulController)

export default bulkRouter