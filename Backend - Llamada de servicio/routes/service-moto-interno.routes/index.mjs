import { Router } from "express";
import motorbikeRoutes from "./motorbike.routes.mjs";
import serviceRoutes from "./service.routes.mjs";

const serviceIntrRoutes = Router()

serviceIntrRoutes.use("/", motorbikeRoutes);
serviceIntrRoutes.use("/", serviceRoutes);

export default serviceIntrRoutes