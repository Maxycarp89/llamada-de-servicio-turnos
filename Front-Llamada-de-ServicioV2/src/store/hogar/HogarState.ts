import { Service } from "src/app/core/model/CoreTypes"

export type HogarState = {
    error: string | null,
    homeAppliance: any,
    errorRespMsg: string | null,
    historyService: Service[],
    secondWarehouse: any,
    items: ItemsTransfer[],
    itemsExistInService: any
}


export type ItemsTransfer = {
    Comprometido: number,
    EvalSystem: string,
    ItemCode: string,
    ItemName: string,
    ManSerNum: string,
    Stock: number,
    WhsCode: string,
    WhsName: string,
    Quantity: number,
    id__: number
}