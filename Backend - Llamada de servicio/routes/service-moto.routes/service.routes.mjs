import { Router } from "express";

import getHistoryService from "../../controllers/service-motos/service.controller/getHistoryService.mjs";
import getServiceCallInfo from "../../controllers/service-motos/service.controller/getServiceCallInfo.mjs";
import postServiceCalls from "../../controllers/service-motos/service.controller/postServiceCalls.mjs";
import patchServiceCalls from "../../controllers/service-motos/service.controller/patchServiceCall.mjs";
import getSpecificHistoryService from "../../controllers/service-motos/service.controller/getSpecificHistory.mjs";

const serviceRoutes = Router();

serviceRoutes.post("/postServiceCalls", postServiceCalls);
serviceRoutes.patch("/patchServiceCalls", patchServiceCalls);
serviceRoutes.get("/getServiceCallInfo", getServiceCallInfo);
serviceRoutes.get("/getHistoryService", getHistoryService);
serviceRoutes.get("/getSpecificHistoryService", getSpecificHistoryService);

export default serviceRoutes;