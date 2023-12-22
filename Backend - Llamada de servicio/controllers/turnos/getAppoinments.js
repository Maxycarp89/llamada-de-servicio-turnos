import { AppoinmentsModel } from "../../database/models/appoinmentsModel";

const getAppoinments = async (req, res) => {
  try {
    const { name, email } = req.params;
    const appoinments = await AppoinmentsModel.find( name, email );

    console.log("Datos recibidos de MongoDB:", appoinments);
    res.status(200).json(appoinments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los datos de MongoDB" });
  }
};

export default getAppoinments;

