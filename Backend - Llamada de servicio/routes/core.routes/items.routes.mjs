import { Router } from "express";
import getItems from "../../controllers/core/items.controller/getItems.mjs";
import getItemsFromExistOperations from "../../controllers/core/items.controller/getItemsFromExistOperation.mjs";
import getAllItems from "../../controllers/core/items.controller/getAllItems.mjs";
import getCombos from "../../controllers/core/getCombos.mjs";
import usuarioPtoEmision from "../../controllers/core/usuarioPtoEmision.mjs";
import getCombosFromBike from "../../controllers/core/getCombosFromBIke.mjs";
import shipmentEmision from "../../controllers/core/shipmentEmision.mjs";
import getMotorbikeSeries from "../../controllers/core/items.controller/getMotorbikeSeries.mjs";
import upPDF from "../../controllers/core/upPDF.mjs";
import getMarcas from "../../controllers/core/getMarcas.mjs";

const itemsRoutes = Router();

itemsRoutes.post("/upPDF", upPDF);
itemsRoutes.get("/getItems", getItems);
itemsRoutes.get("/getMarcas", getMarcas);
itemsRoutes.get("/getMotorbikeSeries", getMotorbikeSeries);
itemsRoutes.get("/usuarioPtoEmision", usuarioPtoEmision);
itemsRoutes.get("/shipmentEmision", shipmentEmision);
itemsRoutes.get("/getCombos", getCombos);
itemsRoutes.get("/getCombosFromBike", getCombosFromBike);
itemsRoutes.get("/getAllItems", getAllItems);
itemsRoutes.get("/getItemsFromExistOperations", getItemsFromExistOperations);

export default itemsRoutes;
