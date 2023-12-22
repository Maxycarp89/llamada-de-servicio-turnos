import {Router} from 'express';
import getAppoinmentsRoutes from "./appoinments.routes.mjs"
import postAppoinmentRoutes from './postAppoinments.routes.mjs';

const appoinmentsRoutes = Router();

appoinmentsRoutes.use("/", getAppoinmentsRoutes);
appoinmentsRoutes.use("/", postAppoinmentRoutes);

export default appoinmentsRoutes;