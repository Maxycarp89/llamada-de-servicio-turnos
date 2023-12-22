import { Router } from "express";

import historyServiceInDashboard from "../../controllers/dashboard/historyServiceInDashboard.mjs";
import getTransferToWarranty from "../../controllers/dashboard/getTransferToWarranty.mjs";

const dashboardRoutes = Router();

dashboardRoutes.get("/getTransferToWarranty", getTransferToWarranty);
dashboardRoutes.post("/historyServiceInDashboard", historyServiceInDashboard);

export default dashboardRoutes;
