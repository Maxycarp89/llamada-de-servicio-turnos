import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const getCustomerInfo = async (req, res) => {
  const cookies = req.header("Authorization");
  const { CustomerCode } = req.query;
  try {
    let uriDecode = decodeURI(
      `$select=FederalTaxID,CardCode,CardName,Address,FederalTaxID,Cellular,City,Country,EmailAddress&$filter=CardCode eq '${CustomerCode}'`
    );
    const getCustomer = await clienteAxios.get(
      `/b1s/v1/BusinessPartners?${uriDecode}`,
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    res.send(getCustomer.data.value[0]);
  } catch (error) {
    res.send(error);
  }
};

export default getCustomerInfo