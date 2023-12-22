import { Router } from "express";

import searchCustomerBike from "../../controllers/service-bikes/bikes.controllers/searchBikesFromCustomer.mjs";
import getServiceBikeInfo from "../../controllers/service-bikes/service.controllers/getServiceBikeInfo.mjs";
import getSpecificHistoryBike from "../../controllers/service-bikes/service.controllers/getSpecificHistoryBike.mjs";
import postServiceCallBike from "../../controllers/service-bikes/service.controllers/postServiceCallBike.mjs";
import patchServiceCallBike from "../../controllers/service-bikes/service.controllers/patchServiceCallBike.mjs";

const serviceBikeRoutes = Router();

serviceBikeRoutes.post("/postServiceCallBike", postServiceCallBike);
serviceBikeRoutes.patch("/patchServiceCallBike", patchServiceCallBike);

serviceBikeRoutes.get("/searchCustomerBike", searchCustomerBike);
serviceBikeRoutes.get("/getServiceBikeInfo", getServiceBikeInfo);
serviceBikeRoutes.get("/getSpecificHistoryBike", getSpecificHistoryBike);

export default serviceBikeRoutes;
