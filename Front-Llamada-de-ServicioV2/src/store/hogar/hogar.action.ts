import { createAction, props } from "@ngrx/store";
export const searchHomeItem = createAction("[Search] search home item", props<{ NameOrCode?: string, Client?: string, DNI?: string }>())
export const searchHomeItemSuccess = createAction("[Search] search home item success", props<{ resp: any }>())
export const searchHomeItemFail = createAction("[Search] search home item fail", props<{ error: string }>())

export const getSecondWarehouse = createAction("[Home] get second warehouse")
export const getSecondWarehouseSuccess = createAction("[Home] get second warehouse success", props<{ resp: any }>())

export const getItemInStock = createAction("[Home] item in stock to transfer", props<{ NameOrCode: string }>())
export const getItemInStockSuccess = createAction("[Home] item in stock to transfer success", props<{ resp: any }>())

export const manageItemStockQuantity = createAction("[Home] manage quantity of item stock", props<{ id: number, Quantity: number }>())

export const postServiceCallsHome = createAction("[Home] post service", props<{ serviceBody: any }>())
export const postServiceCallsHomeSuccess = createAction("[Home] post service success", props<{ resp: any }>())
export const postServiceCallsHomeFail = createAction("[Home] post service fail", props<{ error: any }>())

export const getHistoryFromHomeService = createAction("[Home] get service history of home item", props<{ CustomerCode, ItemCode: string }>())
export const getHistoryFromHomeServiceSuccess = createAction("[Home] get service history of home item success", props<{ resp: any }>())

export const getItemExistInTransfer = createAction("[Home] get item selected in transfer", props<{ ActivityCode: number }>())
export const getItemExistInTransferSuccess = createAction("[Home] get item selected in transfer success", props<{ resp: string }>())

export const patchServiceCallsHome = createAction("[Home] patch service", props<{ serviceBody: any }>())
export const patchServiceCallsHomeSuccess = createAction("[Home] patch service success", props<{ resp: any }>())
export const patchServiceCallsHomeFail = createAction("[Home] patch service fail", props<{ error: any }>())