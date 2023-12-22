import "dotenv/config";
import axios from "axios";

const upPDF = async (req, res) => {
  const { DocEntry } = req.body;
  try {
    const response = await axios.post(`https://190.2.251.208:60000/login`, {
      UserName: process.env.NODE_MASTER_USER,
      Password: process.env.NODE_MASTER_PASSWORD,
      CompanyDB: process.env.NODE_DATABASE_SAP,
    });
    const dataPDF = [
      {
        name: "idllamada",
        type: "xsd:decimal",
        value: [[DocEntry]],
      },
    ];
    const cookies = response.headers["set-cookie"][0].split(";")[0];
    const { data } = await axios.post(
      `https://190.2.251.208:60000/rs/v1/ExportPDFData?DocCode=RCRI0039`,
      dataPDF,
      {
        headers: {
          Cookie: cookies,
        },
      }
    );
    return res.status(200).send({ base64: `data:application/pdf;base64,${data}` });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export default upPDF;
