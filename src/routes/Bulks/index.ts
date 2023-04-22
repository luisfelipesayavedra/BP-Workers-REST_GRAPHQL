import { Router } from "express";
import {BpCustomer, BpExample} from '../../controllers/Bulks'
import { ValidateAndDecryptTokenBase } from "../../middlewares";

const bulkRouter = Router();

bulkRouter.post("/BP", [ValidateAndDecryptTokenBase], BpExample)
bulkRouter.post("/customer",[ValidateAndDecryptTokenBase] , BpCustomer)


export default bulkRouter