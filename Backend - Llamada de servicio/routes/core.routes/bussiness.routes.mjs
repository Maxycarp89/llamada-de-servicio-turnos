import { Router } from "express";
import createClient from "../../controllers/core/bussiness-partner.controller/createClient.mjs";
import getBussinessPartner from "../../controllers/core/bussiness-partner.controller/getBussinessPartner.mjs";
import ownershipChange from "../../controllers/core/ownershipChange.mjs";

const bussinesRoutes = Router();

bussinesRoutes.patch("/ownershipChange", ownershipChange);
bussinesRoutes.post("/createClient", createClient);
bussinesRoutes.get("/getBussinessPartner", getBussinessPartner);

export default bussinesRoutes;
