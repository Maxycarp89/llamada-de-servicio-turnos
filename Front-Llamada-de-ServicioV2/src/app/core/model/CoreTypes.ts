export type Service = {
    CustomerCode: string,
    InternalSerialNum: string | null,
    ItemCode: string,
    ItemDescription: string,
    Resolution: string,
    ServiceCallID: number,
    Status: number,
    ClosingDate: string | null,
    U_Chasis: string | null,
    U_Motor: string | null,
    BPBillToAddress: string | null,
    BPeMail: string | null,
    CallType: number,
    CustomerName: string,
    Description: string,
    Origin: number,
    Priority: string,
    ProblemSubType: number,
    ProblemType: number,
    ServiceBPType: string,
    Subject: string,
    TechnicianCode: number,
    Telephone: string,
    U_Alarma: string,
    U_Almacen: string,
    ServiceCallActivities: any,
    U_Casco: string,
    U_Faltante: string,
    U_Kilometraje: number,
    U_Kit_Herramientas: string,
    U_Patente: string | null,
    U_Manchado: string,
    U_Marca: string,
    U_Modelo: string,
    U_Rayado: string,
    U_Rotura: string,
    CreationDate?: string,
    U_EstadoGrtia?: string | null,
    U_NumeroPedigoG?: string | null,
    UpdateDate?: string | null,
    UpdatedTime?: string | null
}

export type NewClient = {
    CardName: string,
    FederalTaxID: string,
    Cellular: string,
    Address: string,
    EmailAddress: string,
    Series: number,
    County: string,
    City: string,
    U_B1SYS_VATCtg: string,
    ZipCode: string,
    U_B1SYS_FiscIdType: string,
}

export type ServiceCallInfo = {
    callTypes: CallType[],
    employes: Employees[],
    origins: Origin[],
    problemSubTypes: SubProblemType[],
    problemTypes: ProblemType[]
}


export type StatusCall = {
    name: string,
    value: number
}

export type Priority = {
    name: string,
    value: string
}

export type Origin = {
    Active: string,
    Description: string,
    Name: string,
    OriginID: number
}

export type ProblemType = {
    Active: string,
    Description: string,
    Name: string,
    ProblemTypeID: number
}

export type SubProblemType = {
    Active: string,
    Description: string,
    Name: string,
    ProblemSubTypeID: number
}

export type CallType = {
    Active: string,
    CallTypeID: number,
    Description: null,
    Name: string
}

export type Employees = {
    Active: string,
    EmployeeID: number,
    FirstName: string,
    LastName: string
}
