import { Router } from "express";
import createAppoinment from "../../controllers/turnos/postAppoinment.mjs";

const postAppoinmentRoutes = Router();

postAppoinmentRoutes.post('/createAppoinment', createAppoinment)

export default postAppoinmentRoutes;