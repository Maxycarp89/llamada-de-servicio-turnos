import { Service, Operations, BrandAndModel, ItemExistInService } from "src/app/pages/motos/model/Service"

export type MotosState = {
    error: string | null,
    motos: any,
    respMsg: string | null,
    errorRespMsg: string | null,
    customer: any,
    combos: any,
    historyService: Service[],
    failMsgHistory: string | null,
    motorbikeByBrandAndModel: BrandAndModel[],
    itemsFromOperations: Operations[],
    itemsExistInService: ItemExistInService[]
}