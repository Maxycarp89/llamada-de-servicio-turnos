import { createAction, props } from "@ngrx/store";
import { MotorbikeIntr } from "src/app/pages/motos-interno/model/Motorbike";
import { ItemExistInService, Operations, Service } from "src/app/pages/motos/model/Service";
import { ServiceCallInfo } from "src/app/core/model/CoreTypes";

export const searchInternMotorbike = createAction("[M-Interno] search intern", props<{ NameOrCode?: string, Chasis?: string, Motor?: string, Serie?: string, WhsCode: string }>())
export const searchInternMotorbikeSuccess = createAction("[M-Interno] search intern success", props<{ resp: MotorbikeIntr[] }>())

export const getHistoryFromIntr = createAction("[M-Intenro] get intern history", props<{ Chasis: string }>())
export const getHistoryFromIntrSuccess = createAction("[M-Intenro] get intern history success", props<{ resp: Service[] }>())

export const getServiceCallInfo = createAction("[Service] info intr")
export const getServiceCallInfoSuccess = createAction("[Service] info intr success", props<{ resp: ServiceCallInfo }>())

export const getItemsFromExistOperations = createAction("[M-Interno] items from operation", props<{ ActivityCode: number }>())
export const getItemsFromExistOperationsSuccess = createAction("[M-Interno] items from operation success", props<{ resp: ItemExistInService[] }>())
export const getItemsFromExistOperationsFail = createAction("[M-Interno] items from operation fail", props<{ errorResp: any }>())

export const getItems = createAction("[Items M-Interno] searched", props<{ item: string, searchType: string, warehouse: string }>())
export const getItemsSuccess = createAction("[Items M-Interno] searched success", props<{ items: Operations[] }>())
export const getItemsFail = createAction("[Items M-Interno] searched fail", props<any>())

export const postServiceCallInterno = createAction("[M-Interno] post service", props<{ serviceCallBody: any }>())
export const postServiceCallInternoSuccess = createAction("[M-Interno] post service success", props<{ resp: any }>())
export const postServiceCallInternoFail = createAction("[M-Interno] post service fail", props<{ errorMsg: string }>())

export const patchServiceCall = createAction("[M-Interno] edit service", props<{ serviceCallBody: any }>())
export const patchServiceCallSuccess = createAction("[M-Interno] edit service success", props<{ resp: any }>())
export const patchServiceCallFail = createAction("[M-Interno] edit service fail", props<{ errorMsg: any }>())

export const resetItemInInventoryExist = createAction("[M-Interno] reset item in inventory exist")