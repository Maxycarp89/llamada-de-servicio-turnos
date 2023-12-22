import { Router } from "express";

import searchCustomerToWarranty from "../../controllers/garantia-motos/motorbike.controllers/searchCustomerToWarranty.mjs";
import warrantyServiceCallInfo from "../../controllers/garantia-motos/service.controller/warrantyServiceCallInfo.mjs";
import postServiceWarranty from "../../controllers/garantia-motos/service.controller/postServiceWarranty.mjs";
import getHistoryFromWarranty from "../../controllers/garantia-motos/service.controller/getHistoryFromWarranty.mjs";
import patchWarrantyService from "../../controllers/garantia-motos/service.controller/patchWarrantyService.mjs";

const warrantyRoutes = Router();

warrantyRoutes.patch("/patchWarrantyService", patchWarrantyService);

warrantyRoutes.post("/postServiceWarranty", postServiceWarranty);

warrantyRoutes.get("/getHistoryFromWarranty", getHistoryFromWarranty);
warrantyRoutes.get("/searchCustomerToWarranty", searchCustomerToWarranty);
warrantyRoutes.get("/warrantyServiceCallInfo", warrantyServiceCallInfo);

export default warrantyRoutes;
