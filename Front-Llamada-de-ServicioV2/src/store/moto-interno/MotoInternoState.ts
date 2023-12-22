import { MotorbikeIntr } from "src/app/pages/motos-interno/model/Motorbike"
import { ItemExistInService, Operations, Service } from "src/app/pages/motos/model/Service"

export type MotoInternoState = {
    motos: MotorbikeIntr[],
    errorMsg: string | null,
    historyIntr: Service[],
    historyErrorMsg: string | null,
    itemsFromOperations: Operations[],
    itemsExistInService: ItemExistInService[]
}