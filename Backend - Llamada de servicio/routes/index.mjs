import { Router } from "express";
import serviceMotosRoutes from "./service-moto.routes/index.mjs";
import serviceIntrRoutes from "./service-moto-interno.routes/index.mjs";
import coreRoutes from "./core.routes/index.mjs";
import servBikeRoutes from "./service-bikes/index.mjs";
import dashboardRoutes from "./dashboard.routes/index.mjs";
import warrantyRoutes from "./garantia-motos.routes/index.mjs";
import appoinmentsRoutes from "./turnos.routes/index.mjs";
import serviceHomeRoutes from "./service-hogar.routes/index.mjs";

const routes = Router();

routes.use("/", coreRoutes);
routes.use("/", serviceMotosRoutes);
routes.use("/", serviceIntrRoutes);
routes.use("/", servBikeRoutes);
routes.use("/", dashboardRoutes);
routes.use("/", warrantyRoutes);
routes.use("/",appoinmentsRoutes)
routes.use("/", serviceHomeRoutes);

export default routes;
