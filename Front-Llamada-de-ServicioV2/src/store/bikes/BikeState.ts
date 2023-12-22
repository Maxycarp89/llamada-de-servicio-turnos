import { ItemExistInService, Operations, Service } from "src/app/pages/motos/model/Service";

export type BikeState = {
    error: string | null,
    errorMsgHistory: string | null,
    bikes: any,
    errorRespMsg: any,
    bikesSearched: BikeSearched[],
    historyService: Service[],
    itemsFromOperations: Operations[],
    itemsExistInService: ItemExistInService[],
    combos: any,
    marcas: Marcas[],
    showMarcas: boolean
}

type BikeSearched = {
    ItemCode: string,
    ItemName: string
}

export type Marcas = {
    Name: string,
    Code: string
}