import { createAction, props } from '@ngrx/store';
import { NewClient } from 'src/app/pages/motos/model/NewClient';
import { CustomerMotorbike } from 'src/app/pages/motos/model/CustomerMotorbike';
import { Service, Operations, BrandAndModel, ItemExistInService } from 'src/app/pages/motos/model/Service';
import { ServiceCallInfo } from "src/app/core/model/CoreTypes";

export const search = createAction("[Search] search", props<{ DNI?: string, Client?: string, Motor?: string, Chasis?: string, ClientName?: string, Serie?: string }>())
export const searchSuccess = createAction("[Search] search success", props<{ motos: CustomerMotorbike[] }>())
export const searchFail = createAction("[Search] search fail", props<{ error: string }>())

export const createCustomer = createAction("[Customer] new", props<NewClient>())
export const createCustomerSuccess = createAction("[Customer] new success", props<{ newClient: { resp: string } }>())
export const createCustomerFail = createAction("[Customer] new fail", props<{ error: string }>())

export const getHistory = createAction("[History] get", props<{ CustomerCode: string, SpecialSearch?: string }>())
export const getHistorySuccess = createAction("[History] get success", props<{ history: Service[] }>())

export const getSpecificHistoryService = createAction("[History] get specific service", props<{ CustomerCode: string, Chasis: string }>())
export const getSpecificHistoryServiceSuccess = createAction("[History] get specific service success", props<{ history: Service[] }>())

export const getItems = createAction("[Items] searched", props<{ item: string, searchType: string, warehouse: string }>())
export const getItemsSuccess = createAction("[Items] searched success", props<{ items: Operations[] }>())
export const getItemsFail = createAction("[Items] searched fail", props<any>())

export const getServiceCallInfo = createAction("[Service] info")
export const getServiceCallInfoSuccess = createAction("[Service] info success", props<{ resp: ServiceCallInfo }>())

export const postServiceCalls = createAction("[Service] new", props<{ serviceBody: any }>())
export const postServiceCallsSuccess = createAction("[Service] new success", props<{ resp: any }>())
export const postServiceCallsFail = createAction("[Service] new fail", props<{ errorResp: any }>())

export const getMotorbikeByBrandAndModel = createAction("[Motos] get by brand and model", props<{ brand: string, model: string }>())
export const getMotorbikeByBrandAndModelSuccess = createAction("[Motos] get by brand and model success", props<{ resp: BrandAndModel[] }>())
export const getMotorbikeByBrandAndModelFail = createAction("[Motos] get by brand and model fail", props<{ errorResp: any }>())

export const getItemsFromExistOperations = createAction("[Motos] items from operation", props<{ ActivityCode: number }>())
export const getItemsFromExistOperationsSuccess = createAction("[Motos] items from operation success", props<{ resp: ItemExistInService[] }>())
export const getItemsFromExistOperationsFail = createAction("[Motos] items from operation fail", props<{ errorResp: any }>())

export const patchServiceCalls = createAction("[Motos] patch service", props<{ serviceBody: Service }>())
export const patchServiceCallsSuccess = createAction("[Motos] patch service success", props<{ resp: any }>())
export const patchServiceCallsFail = createAction("[Motos] patch service fail", props<{ errorResp: any }>())

export const clearState = createAction("[Motos] reset")
export const clearHistoryService = createAction("[History] clear")
export const clearItemsExistInService = createAction("[Motos] clear item exist in operation")

export const getCombos = createAction("[Motos] get combos", props<{ CardCode: string }>())
export const getCombosSuccess = createAction("[Motos] get combos success", props<{ resp: any }>())
export const getCombosFail = createAction("[Motos] get combos fail", props<{ error: any }>())

export const ownershipChange = createAction("[Motos] change ownership", props<{ newOwner: any }>())
export const ownershipChangeSuccess = createAction("[Motos] change ownership success", props<{ resp: any }>())
export const ownershipChangeFail = createAction("[Motos] change ownership fail", props<{ error: any }>())