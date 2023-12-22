import { AppoinmentsModel } from "../../database/models/appoinmentsModel";

const createAppointment = async (req, res) => {
  try {
    const { name, lastName, email, cellphone, date, hour, service, moto, chasis, state } = req.body;

    // Validación de campos
    if (!name || !lastName || !email || !cellphone || !date || !hour || !service || !moto || !chasis || !state) {
      console.log("Please fill all the fields");
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    // Modificar el formato de la fecha
    const formattedDate = new Date(date);  // Crea una instancia de Date
    // Puedes personalizar el formato de salida utilizando las funciones de Date
    const formattedDateString = formattedDate.toLocaleDateString('en-GB'); // Formato: "DD/MM/YYYY"

    // Crear una nueva instancia del modelo con los datos modificados
    const appointment = new AppoinmentsModel({
      name,
      lastName,
      email,
      cellphone,
      date: formattedDateString,  // Usar la fecha formateada
      hour,
      service,
      moto,
      chasis,
      state,
    });

    // Guardar la nueva cita en la base de datos
    await appointment.save();

    console.log(appointment);
    res.status(201).json(appointment); // Responder con la nueva cita creada
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "An error occurred while creating the appointment" });
  }
};

export default createAppointment;
