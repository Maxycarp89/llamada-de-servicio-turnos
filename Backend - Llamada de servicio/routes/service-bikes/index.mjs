import { Router } from "express";
import serviceBikeRoutes from "./service.routes.mjs";

const servBikeRoutes = Router()

servBikeRoutes.use("/", serviceBikeRoutes)

export default servBikeRoutes