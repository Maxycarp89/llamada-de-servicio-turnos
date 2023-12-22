import { Router } from "express";
import getCustomerInfo from "../../controllers/service-motos/bussiness-partner.controllers/getCustomerInfo.mjs";

const bussinesRoutes = Router();

bussinesRoutes.get("/getCustomerInfo", getCustomerInfo);

export default bussinesRoutes;
