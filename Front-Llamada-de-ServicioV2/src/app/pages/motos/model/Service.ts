export type Service = {
    CustomerCode: string,
    InternalSerialNum: string | null,
    ItemCode: string,
    City?: string,
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
    UpdatedTime?: string | null,
    U_FechaPedidoG?: string | null,
    U_PedidoRealizado?: string | null,
    U_CumplidoGrtia?: string | null,
    U_UsuarioGrtia?: string | null,
    U_ObservaGrtia?: string | null
}

export type Operations = {
    ItemCode: string,
    ItemName: string,
    SalesUnit: string | null,
}

export type BrandAndModel = {
    ItemCode: string,
    ItemName: string,
    U_Marca: string,
    U_Modelo: string,
    nameBrand: string,
    nameModel: string
}

export type Customer = {
    Address: string,
    CardCode: string,
    CardName: string,
    Cellullar: string,
    City: string | null,
    EmailAddress: string | null,
    FederalTaxID: string,
}

export type ItemExistInService = {
    ItemCode: string,
    ItemDescription: string,
    MeasureUnit: string,
    Quantity: number
}