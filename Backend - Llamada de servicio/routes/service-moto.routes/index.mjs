import { Router } from "express";
import bussinesRoutes from "./bussiness.routes.mjs";
import motorbikeRoutes from "./motorbike.routes.mjs";
import serviceRoutes from "./service.routes.mjs";

const serviceMotosRoutes = Router()

serviceMotosRoutes.use("/", bussinesRoutes);
serviceMotosRoutes.use("/", motorbikeRoutes);
serviceMotosRoutes.use("/", serviceRoutes);

export default serviceMotosRoutes