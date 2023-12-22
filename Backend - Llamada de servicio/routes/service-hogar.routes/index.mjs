import { Router } from "express";
import searchHomeItem from "../../controllers/service-hogar/searchHomeItem.mjs";
import getServiceCallHome from "../../controllers/service-hogar/getServiceCallHome.mjs";
import getItemInStockHA from "../../controllers/service-hogar/getItemInStock.mjs";
import getCustomerSeller from "../../controllers/service-hogar/getCustomerSeller.mjs";
import getFriendsWarehouse from "../../controllers/service-hogar/getFriendsWarehouse.mjs";
import getHistoryFromHomeService from "../../controllers/service-hogar/getHistoryFromHomeService.mjs";
import getItemExistInTransfer from "../../controllers/service-hogar/getItemExistInTransfer.mjs";

import postServiceCalls from "../../controllers/service-hogar/postServiceCalls.mjs";
import patchServiceCallsHome from "../../controllers/service-hogar/patchServiceCallHome.mjs";

const serviceHomeRoutes = Router();

serviceHomeRoutes.patch("/patchServiceCallsHome", patchServiceCallsHome);
serviceHomeRoutes.post("/postServiceCallsHome", postServiceCalls);
serviceHomeRoutes.get("/searchHomeItem", searchHomeItem);
serviceHomeRoutes.get("/getItemExistInTransfer", getItemExistInTransfer);
serviceHomeRoutes.get("/getServiceCallHome", getServiceCallHome);
serviceHomeRoutes.get("/getItemInStockHA", getItemInStockHA);
serviceHomeRoutes.get("/getCustomerSeller", getCustomerSeller);
serviceHomeRoutes.get("/getFriendsWarehouse", getFriendsWarehouse);
serviceHomeRoutes.get("/getHistoryFromHomeService", getHistoryFromHomeService);

export default serviceHomeRoutes;
