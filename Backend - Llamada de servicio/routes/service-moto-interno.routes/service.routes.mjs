import { Router } from "express";

import getHistoryFromIntr from "../../controllers/service-moto-interno/service.controllers/getHistoryFromIntr.mjs";
import getServicerCallIntrInfo from "../../controllers/service-moto-interno/service.controllers/getServiceCallIntrInfo.mjs";
import postServiceCallInterno from "../../controllers/service-moto-interno/service.controllers/postServiceCall.mjs";
import patchServiceCallsInterno from "../../controllers/service-moto-interno/service.controllers/patchServiceCall.mjs";

const serviceRoutes = Router();

serviceRoutes.get("/getServicerCallIntrInfo", getServicerCallIntrInfo);
serviceRoutes.get("/getHistoryFromIntr", getHistoryFromIntr);

serviceRoutes.post("/postServiceCallInterno", postServiceCallInterno);

serviceRoutes.patch("/patchServiceCallsInterno", patchServiceCallsInterno);

export default serviceRoutes;