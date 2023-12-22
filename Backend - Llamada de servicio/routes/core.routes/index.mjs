import { Router } from "express";
import bussinesRoutes from "./bussiness.routes.mjs";
import itemsRoutes from "./items.routes.mjs";
import sucursalesRoutes from "./sucursales.routes.mjs";
import usersRoutes from "./users.routes.mjs";

const coreRoutes = Router()

coreRoutes.use("/", usersRoutes);
coreRoutes.use("/", itemsRoutes);
coreRoutes.use("/", sucursalesRoutes);
coreRoutes.use("/", bussinesRoutes);

export default coreRoutes;