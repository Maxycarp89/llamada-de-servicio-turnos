import { createAction, props } from '@ngrx/store';
import { ServiceCallInfo, NewClient, Service } from 'src/app/core/model/CoreTypes';

export const createCustomer = createAction("[Customer] new", props<NewClient>())
export const createCustomerSuccess = createAction("[Customer] new success", props<{ newClient: { resp: string } }>())
export const createCustomerFail = createAction("[Customer] new fail", props<{ error: string }>())

export const getBussinessPartner = createAction("[Customer] search customer", props<{ Search: string }>())
export const getBussinessPartnerSuccess = createAction("[Customer] search customer success", props<{ resp: any }>())

export const getHistory = createAction("[History] get", props<{ CustomerCode: string }>())
export const getHistorySuccess = createAction("[History] get success", props<{ history: Service[] }>())

export const getServiceCallInfo = createAction("[Service] info")
export const getServiceCallInfoSuccess = createAction("[Service] info success", props<{ resp: ServiceCallInfo }>())

export const getServiceCallInfoIntr = createAction("[Service] info intr")
export const getServiceCallInfoIntrSuccess = createAction("[Service] info intr success", props<{ resp: ServiceCallInfo }>())

export const getServiceCallBikeInfo = createAction("[Service] info bike")
export const getServiceCallBikeInfoSuccess = createAction("[Service] info bike success", props<{ resp: ServiceCallInfo }>())

export const getWarrantyServiceCallInfo = createAction("[Service] info warranty")
export const getWarrantyServiceCallInfoSuccess = createAction("[Service] info warranty success", props<{ resp: ServiceCallInfo }>())

export const getServiceCallHomeInfo = createAction("[Service] info home")
export const getServiceCallHomeInfoSuccess = createAction("[Service] info home success", props<{ resp: ServiceCallInfo }>())