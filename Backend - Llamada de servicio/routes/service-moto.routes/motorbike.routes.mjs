import { Router } from "express";
import searchCustomerMotorbike from "../../controllers/service-motos/motorbike.controllers/searchCustomerMotorbike.mjs";
import searchByBrandAndModel from "../../controllers/service-motos/motorbike.controllers/searchByBrandAndModel.mjs";

const motorbikeRoutes = Router();

motorbikeRoutes.get("/searchCustomerMotorbike", searchCustomerMotorbike);
motorbikeRoutes.get("/searchByBrandAndModel", searchByBrandAndModel);

export default motorbikeRoutes;