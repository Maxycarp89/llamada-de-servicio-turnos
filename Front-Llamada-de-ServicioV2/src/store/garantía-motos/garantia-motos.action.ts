import { createAction, props } from '@ngrx/store';
import { CustomerMotorbike } from 'src/app/pages/motos/model/CustomerMotorbike';
import { ItemExistInService, Operations } from 'src/app/pages/motos/model/Service';

export const search = createAction("[Search] search warranty", props<{ DNI?: string, Client?: string, Motor?: string, Chasis?: string, ClientName?: string, Serie?: string, WhsCode: string }>())
export const searchSuccess = createAction("[Search] search warranty success", props<{ motos: CustomerMotorbike[] }>())
export const searchFail = createAction("[Search] search warranty fail", props<{ error: string }>())

export const postWarrantyService = createAction("[Service] new warranty", props<{ serviceBody: any }>())
export const postWarrantyServiceSuccess = createAction("[Service] new warranty success", props<{ resp: any }>())
export const postWarrantyServiceFail = createAction("[Service] new warranty fail", props<{ errorResp: any }>())

export const warrantyCustomerHistory = createAction("[Service] warranty history", props<{ CustomerCode: string }>())
export const warrantyCustomerHistorySuccess = createAction("[Service] warranty history success", props<{ resp: any }>())
export const warrantyCustomerHistoryFail = createAction("[Service] warranty history fail", props<{ error: any }>())

export const getTransferToWarranty = createAction("[Transfer] stock transfer")
export const getTransferToWarrantySuccess = createAction("[Transfer] stock transfer success", props<{ resp: any }>())


export const getItemsFromExistOperations = createAction("[Warranty] items from operation", props<{ ActivityCode: number }>())
export const getItemsFromExistOperationsSuccess = createAction("[Warranty] items from operation success", props<{ resp: ItemExistInService[] }>())
export const getItemsFromExistOperationsFail = createAction("[Warranty] items from operation fail", props<{ errorResp: any }>())

export const getItems = createAction("[Warranty] searched", props<{ item: string, searchType: string, warehouse: string }>())
export const getItemsSuccess = createAction("[Warranty] searched success", props<{ items: Operations[] }>())
export const getItemsFail = createAction("[Warranty] searched fail", props<any>())

export const clearItemsExistInService = createAction("[Warranty] clear item exist in operation")

export const getSecondWarehouse = createAction("[Warranty] get second warehouse")
export const getSecondWarehouseSuccess = createAction("[Warranty] get second warehouse success", props<{ resp: any }>())

export const getItemInStock = createAction("[Warranty] item in stock to transfer", props<{ NameOrCode: string }>())
export const getItemInStockSuccess = createAction("[Warranty] item in stock to transfer success", props<{ resp: any }>())

export const manageItemStockQuantity = createAction("[Warranty] manage quantity of item stock", props<{ id: number, Quantity: number }>())

export const getMotorbikeSeries = createAction("[Warranty] get series motos", props<{ ItemCode: string }>())
export const getMotorbikeSeriesSuccess = createAction("[Warranty] get series motos success", props<{ resp: any }>())

export const resetSeries = createAction("[Warranty] reset series")

export const patchWarrantyService = createAction("[Warranty] patch warranty service", props<{ serviceBody: any }>())
export const patchWarrantyServiceSuccess = createAction("[Warranty] patch warranty service success", props<{ resp: any }>())
export const patchWarrantyServiceFail = createAction("[Warranty] patch warranty service fail", props<{ error: any }>())

