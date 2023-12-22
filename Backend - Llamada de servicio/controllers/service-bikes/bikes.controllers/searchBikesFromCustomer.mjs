import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const searchCustomerBike = async (req, res) => {
  const cookies = req.header("Authorization");
  const { DNI, Client, Serie, Cuadro } = req.query;
  let uriDecode;
  try {
    if (DNI) {
      uriDecode = decodeURI(
        `$filter=LicTradNum eq '${DNI.toString().toUpperCase()}' and U_Rubro eq '000074' or LicTradNum eq '${DNI.toString().toUpperCase()}' and U_Rubro eq '000062'`
      );
    } else if (Client) {
      uriDecode = decodeURI(
        `$filter=CardCode eq '${Client.toString().toUpperCase()}' and U_Rubro eq '000074' or CardCode eq '${Client.toString().toUpperCase()}' and U_Rubro eq '000062'`
      );
      console.log(uriDecode);
    } else if (Serie) {
      uriDecode = decodeURI(
        `$filter=IntrSerial eq '${Serie.toString().toUpperCase()}' and U_Rubro eq '000074' or IntrSerial eq '${Serie.toString().toUpperCase()}' and U_Rubro eq '000062'`
      );
    } else if (Cuadro) {
      uriDecode = decodeURI(
        `$filter=U_Chasis eq '${Cuadro.toString().toUpperCase()}' and U_Rubro eq '000074' or U_Chasis eq '${Cuadro.toString().toUpperCase()}' and U_Rubro eq '000062'`
      );
    }
    const { data } = await clienteAxios.get(
      `/b1s/v1/sml.svc/YUH_CLIENTEYPRODASOCIADOBIKE?${uriDecode}`,
      {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    if (data.value.length > 0) {
      uriDecode = decodeURI(
        `$select=CustomerName,Resolution,ItemCode,ItemDescription,Status,U_Motor,U_Chasis,BPBillToAddress,U_Modelo,U_Patente,U_Marca,BPeMail,Telephone,U_Kilometraje,InternalSerialNum,CustomerCode,City&$filter=CustomerCode eq '${data.value[0].CardCode}' and contains(ItemCode, 'E0')&$orderby=ServiceCallID desc`
      );
      const serviceFounded = await clienteAxios.get(
        `/b1s/v1/ServiceCalls?${uriDecode}`,
        {
          headers: {
            Cookie: `${cookies}`,
            Prefer: "odata.maxpagesize=40",
          },
        }
      );
      if (!serviceFounded.data.value.length) return res.status(200).send(data.value);
      let arrayTest = []
      for (let i = 0; i < serviceFounded.data.value.length; i++) {
        for (let j = 0; j < data.value.length; j++) {
          if (data.value[j].IntrSerial === serviceFounded.data.value[i].InternalSerialNum) {
            arrayTest = [...arrayTest, { ...data.value[j], U_Chasis: serviceFounded.data.value[i].U_Chasis }]
          }
        }
      }
      if (arrayTest.length > data.value.length) return res.status(200).send(arrayTest);
      else return res.status(200).send(data.value)
    } else {
      if (DNI || Client) {
        uriDecode = DNI
          ? decodeURI(`FederalTaxID eq '${DNI.toString().toUpperCase()}'`)
          : decodeURI(`CardCode eq '${Client.toString().toUpperCase()}'`);
        const bussinessPartner = await clienteAxios.get(
          `/b1s/v1/BusinessPartners?$select=CardCode,CardName,FederalTaxID,City,Address,Cellular,EmailAddress&$filter=${uriDecode}`,
          {
            headers: {
              Cookie: `${cookies}`,
            },
          }
        );
        if (!bussinessPartner.data.value.length) {
          return res.status(200).send(bussinessPartner.data.value);
        } else {
          uriDecode = decodeURI(
            `$select=CustomerName,Resolution,ItemCode,ItemDescription,Status,U_Motor,U_Chasis,BPBillToAddress,U_Modelo,U_Patente,U_Marca,BPeMail,Telephone,U_Kilometraje,InternalSerialNum,CustomerCode,City&$filter=CustomerCode eq '${bussinessPartner.data.value[0].CardCode}' and contains(ItemCode, 'E0')&$orderby=ServiceCallID desc`
          );
          const serviceFounded = await clienteAxios.get(
            `/b1s/v1/ServiceCalls?${uriDecode}`,
            {
              headers: {
                Cookie: `${cookies}`,
                Prefer: "odata.maxpagesize=1",
              },
            }
          );
          if (!serviceFounded.data.value.length) {
            return res.status(200).send(bussinessPartner.data.value);
          } else {
            return res.status(200).send(serviceFounded.data.value);
          }
        }
      } else if (Serie) {
        uriDecode = decodeURI(
          `$select=CustomerName,Resolution,ItemCode,ItemDescription,Status,U_Motor,U_Chasis,BPBillToAddress,U_Modelo,U_Patente,U_Marca,BPeMail,Telephone,U_Kilometraje,InternalSerialNum,CustomerCode,City&$filter=InternalSerialNum eq '${Serie.toString().toUpperCase()}' and contains(ItemCode, 'E0')&$orderby=ServiceCallID desc`
        );
        const serviceFounded = await clienteAxios.get(
          `/b1s/v1/ServiceCalls?${uriDecode}`,
          {
            headers: {
              Cookie: `${cookies}`,
              Prefer: "odata.maxpagesize=1",
            },
          }
        );
        res.status(200).send(serviceFounded.data.value);
      } else {
        uriDecode = decodeURI(
          `$select=CustomerName,Resolution,ItemCode,ItemDescription,Status,U_Motor,U_Chasis,BPBillToAddress,U_Modelo,U_Patente,U_Marca,BPeMail,Telephone,U_Kilometraje,InternalSerialNum,CustomerCode,City&$filter=U_Chasis eq '${Cuadro.toString().toUpperCase()}' and contains(ItemCode, 'E0')&$orderby=ServiceCallID desc`
        );
        const serviceFounded = await clienteAxios.get(
          `/b1s/v1/ServiceCalls?${uriDecode}`,
          {
            headers: {
              Cookie: `${cookies}`,
              Prefer: "odata.maxpagesize=1",
            },
          }
        );
        res.status(200).send(serviceFounded.data.value);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export default searchCustomerBike;