import {Router} from "express"
import getAppoinments from "../../controllers/turnos/getAppoinments";


const getAppoinmentsRoutes = Router();


getAppoinmentsRoutes.get("/getAppoinments",getAppoinments)

export default getAppoinmentsRoutes;