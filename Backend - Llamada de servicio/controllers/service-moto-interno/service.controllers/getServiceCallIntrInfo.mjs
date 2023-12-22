import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const getServicerCallIntrInfo = async (req, res) => {
  const cookies = req.header("Authorization");
  try {
    const getOrigins = await clienteAxios.get(
      `/b1s/v1/ServiceCallOrigins?$filter=contains(Description, 'ACT-INT') and Active eq 'tYES'`,
      {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    const getProblemTypes = await clienteAxios.get(
      `/b1s/v1/ServiceCallProblemTypes?$filter=contains(Description, '-INT') and Active eq 'tYES'`,
      {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    const getProblemSubTypes = await clienteAxios.get(
      `/b1s/v1/ServiceCallProblemSubTypes?$filter=contains(Description, '-INT') and Active eq 'tYES'`,
      {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    const getCallTypes = await clienteAxios.get("/b1s/v1/ServiceCallTypes", {
      headers: {
        Cookie: `${cookies}`,
        Prefer: "odata.maxpagesize=0",
      },
    });
    const getEmployes = await clienteAxios.get(
      `/b1s/v1/$crossjoin(EmployeesInfo,EmployeesInfo/EmployeeRolesInfoLines)?$inlinecount=allpages&$expand=EmployeesInfo($select=EmployeeID,FirstName,LastName,Active)&$filter=EmployeesInfo/EmployeeID eq EmployeesInfo/EmployeeRolesInfoLines/EmployeeID and EmployeesInfo/EmployeeRolesInfoLines/RoleID eq -2 and EmployeesInfo/Active eq 'Y'`,
      {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    const employesMaped = getEmployes.data.value.map(
      (employe) => employe.EmployeesInfo
    );
    return res.send({
      origins: getOrigins.data.value,
      problemTypes: getProblemTypes.data.value,
      problemSubTypes: getProblemSubTypes.data.value,
      callTypes: getCallTypes.data.value,
      employes: employesMaped,
    });
  } catch (error) {
    res.send(error);
  }
};

export default getServicerCallIntrInfo;
