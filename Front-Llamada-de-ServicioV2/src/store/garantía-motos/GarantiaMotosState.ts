import { ItemExistInService, Operations, Service } from "src/app/pages/motos/model/Service"
import { ItemsTransfer } from "../hogar/HogarState"

export type GarantiaMotoState = {
    error: string | null,
    motos: any,
    warrantyHistory: Service[],
    respMsg: string | null,
    transfer: any,
    itemsFromOperations: Operations[],
    itemsExistInService: ItemExistInService[],
    items: ItemsTransfer[]
    series: any,
    secondWarehouse: any
}