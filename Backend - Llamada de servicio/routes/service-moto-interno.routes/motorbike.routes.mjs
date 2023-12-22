import { Router } from "express";
import searchInternMotorbike from "../../controllers/service-moto-interno/motorbike.controllers/searchInternMotorbike.mjs";

const motorbikeRoutes = Router();

motorbikeRoutes.get("/searchInternMotorbike", searchInternMotorbike);

export default motorbikeRoutes;
