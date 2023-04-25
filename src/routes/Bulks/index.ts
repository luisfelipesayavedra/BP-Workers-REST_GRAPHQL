import { Router } from "express";
import {
  BpCustomer,
  BpExample,
  BpInvoicePurchase,
  BpNoteDebitPurchase,
} from '../../controllers/Bulks';
import { ValidateAndDecryptTokenBase } from "../../middlewares";

const bulkRouter = Router();

bulkRouter.post("/BP", [ValidateAndDecryptTokenBase], BpExample)
bulkRouter.post("/customer",[ValidateAndDecryptTokenBase] , BpCustomer)
bulkRouter.post("/facturas-compra", [ValidateAndDecryptTokenBase], BpInvoicePurchase)
bulkRouter.post(
  '/debit-notes',
  [ValidateAndDecryptTokenBase],
  BpNoteDebitPurchase
);


export default bulkRouter