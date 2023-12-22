import { createAction, props } from '@ngrx/store';
import { ItemExistInService, Operations } from 'src/app/pages/motos/model/Service';
import { ServiceCallInfo } from "src/app/core/model/CoreTypes";
import { Marcas } from './BikeState';

export const searchBikes = createAction("[Search] search bike", props<{ DNI?: string, Client?: string, Serie?: string, Cuadro?: string }>())
export const searchBikesSuccess = createAction("[Search] search bike success", props<{ bikes: any }>())
export const searchBikesFail = createAction("[Search] search bike fail", props<{ error: string }>())

export const getServiceCallBikeInfo = createAction("[Service] info bike")
export const getServiceCallInfoSuccess = createAction("[Service] info bike success", props<{ resp: ServiceCallInfo }>())

export const getItemsInBikes = createAction("[Service] get items in bike", props<{ Search: string }>())
export const getItemsInBikesSuccess = createAction("[Service] get items in bike success", props<{ resp: any }>())
export const getItemsInBikesFail = createAction("[Service] get items in bike fail", props<{ error: string }>())

export const getSpecificHistoryBike = createAction("[Service] get history specific bike", props<{ CustomerCode: string, ItemCode: string }>())
export const getSpecificHistoryBikeSuccess = createAction("[Service] get history specific bike success", props<{ resp: any }>())
export const getSpecificHistoryBikeFail = createAction("[Service] get history specific bike fail", props<{ error: string }>())

export const getItemsFromExistOperationsInBike = createAction("[Bike] get item from operation", props<{ ActivityCode: number }>())
export const getItemsFromExistOperationsInBikeSuccess = createAction("[Bike] get item from operation success", props<{ resp: ItemExistInService[] }>())
export const getItemsFromExistOperationsInBikeFail = createAction("[Bike] get item from operation fail", props<{ error: string }>())

export const getOperationInBike = createAction("[Items] searched in bike", props<{ item: string, searchType: string, warehouse: string }>())
export const getOperationInBikeSuccess = createAction("[Items] searched in bike success", props<{ items: Operations[] }>())
export const getOperationInBikeFail = createAction("[Items] searched in bike", props<any>())

export const postServiceCallBike = createAction("[Service] new in bike", props<{ serviceBody: any }>())
export const postServiceCallBikeSuccess = createAction("[Service] new in bike success", props<{ resp: any }>())
export const postServiceCallBikeFail = createAction("[Service] new in bike fail", props<{ errorResp: any }>())

export const patchServiceCallBike = createAction("[Service] edit an exist service in bike", props<{ serviceBody: any }>())
export const patchServiceCallBikeSuccess = createAction("[Service] edit an exist service in bike success", props<{ resp: any }>())
export const patchServiceCallBikeFail = createAction("[Service] edit an exist service in bike fail", props<{ errorResp: any }>())


export const clearItemsExistInService = createAction("[Bike] clear item exist in operation")

export const getCombos = createAction("[Bikes] get combos", props<{ CardCode: string }>())
export const getCombosSuccess = createAction("[Bikes] get combos success", props<{ resp: any }>())
export const getCombosFail = createAction("[Bikes] get combos fail", props<{ error: any }>())

export const getMarcas = createAction("[BIKES] get marcas")
export const getMarcasSuccess = createAction("[BIKES] get marcas success", props<{ resp: Marcas[] }>())