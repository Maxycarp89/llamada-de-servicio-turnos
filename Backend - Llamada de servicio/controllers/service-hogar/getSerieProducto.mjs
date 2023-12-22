import { clienteAxios } from "../../utils/clienteAxios.mjs";

const getSerieProducto = async (req, res) => {
  const cookies = req.header("Authorization");
  try {
    
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export default getSerieProducto;
