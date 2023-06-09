import { Router } from "express";
import {
  BpExample,
  Products,
  BpSupplier,
  sellInvoice,
  ProductStocks,
  CustomerPos,
} from '../../controllers/Bulks';
import {BpCustomer, BpInvoicePurchase } from '../../controllers/Bulks'
import { ValidateAndDecryptTokenBase } from "../../middlewares";

const bulkRouter = Router();

bulkRouter.post("/BP", [ValidateAndDecryptTokenBase], BpExample)
bulkRouter.post("/products", [ValidateAndDecryptTokenBase], Products)
bulkRouter.post('/suppliers', [ValidateAndDecryptTokenBase], BpSupplier);
bulkRouter.post('/sellInvoice', [ValidateAndDecryptTokenBase], sellInvoice)
bulkRouter.post('/customerPos', CustomerPos)
bulkRouter.post("/customer",[ValidateAndDecryptTokenBase] , BpCustomer)
bulkRouter.post("/facturas-compra", [ValidateAndDecryptTokenBase], BpInvoicePurchase)
bulkRouter.post("/products/stock", [ValidateAndDecryptTokenBase], ProductStocks)


export default bulkRouter