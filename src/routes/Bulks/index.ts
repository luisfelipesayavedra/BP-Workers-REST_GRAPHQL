import { Router } from "express";
import {
  BpExample,
  BpSupplier,
  BpUser,
  BpNoteCredit,
} from '../../controllers/Bulks';
import { ValidateAndDecryptTokenBase } from "../../middlewares";

const bulkRouter = Router();

bulkRouter.post("/BP", [ValidateAndDecryptTokenBase], BpExample)
bulkRouter.post('/suppliers', [ValidateAndDecryptTokenBase], BpSupplier);
bulkRouter.post('/users', [ValidateAndDecryptTokenBase], BpUser);
bulkRouter.post('/note-credits', [ValidateAndDecryptTokenBase], BpNoteCredit);


export default bulkRouter