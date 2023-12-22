import { Router } from "express";
import getSucu from "../../controllers/core/sucursales.controller/getSucursales.mjs";

const sucursalesRoutes = Router();

//* GET
sucursalesRoutes.get("/sucursales", getSucu);

export default sucursalesRoutes;
