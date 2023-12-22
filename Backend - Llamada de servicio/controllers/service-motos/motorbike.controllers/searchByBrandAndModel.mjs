import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const searchByBrandAndModel = async (req, res) => {
  const cookies = req.header("Authorization");
  const { brand, model } = req.query;
  try {
    if (!!brand === false || !!model === false) {
      res
        .status(400)
        .send("Porfavor cargar marca y modelo para poder buscar un vehículo");
    } else {
      let arrayMotorbikes = [];
      const queryStringVehicles =
        "$crossjoin(MARCAS,Items,MODELOS)?$expand=MARCAS($select=Code,Name),MODELOS($select=Code,Name),Items($select=ItemCode,ItemName)" +
        decodeURI(
          `&$filter=(MARCAS/Code eq MODELOS/U_Marca and MARCAS/Code eq Items/U_Marca) and Items/U_Modelo eq MODELOS/Code and contains(MARCAS/Name, '${brand}') and (contains(MODELOS/Name, '${model}') or contains(MODELOS/Name, '${brand.toLowerCase()}')) and (contains(Items/ItemName, '${brand}') and contains(Items/ItemName, '${model}'))`
        );
      const vehiclesResult = await clienteAxios.get(
        `/b1s/v1/${queryStringVehicles}`,
        {
          headers: {
            Cookie: `${cookies}`,
            Prefer: "odata.maxpagesize=0",
          },
        }
      );
      const formatResult = vehiclesResult.data.value.map(
        ({ MARCAS, MODELOS, Items }) => {
          const { Code, Name } = MARCAS;
          const { ItemCode, ItemName } = Items;
          return {
            U_Marca: Code,
            ItemCode,
            ItemName,
            nameBrand: Name,
            U_Modelo: MODELOS.Code,
            nameModel: MODELOS.Name,
          };
        }
      );
      res.status(200).send([...arrayMotorbikes, ...formatResult]);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export default searchByBrandAndModel;
