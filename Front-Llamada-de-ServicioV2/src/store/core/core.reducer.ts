import { Action, createReducer, on } from "@ngrx/store";
import * as coreActions from "./core.action"
import { AppInitialState } from "../AppInitialState";
import { CoreState } from "./CoreState";

const initialState: CoreState = AppInitialState.core

const reducer = createReducer(initialState,
    on(coreActions.createCustomer, (currentState) => {
        return {
            ...currentState,
            respMsg: null,
            errorRespMsg: null
        }
    }),
    on(coreActions.createCustomerSuccess, (currentState, action) => {
        return {
            ...currentState,
            respMsg: action.newClient.resp,
            errorRespMsg: null,
        }
    }),
    on(coreActions.getBussinessPartner, (currentState) => {
        return {
            ...currentState,
            customer: []
        }
    }),
    on(coreActions.getBussinessPartnerSuccess, (currentState, action) => {
        return {
            ...currentState,
            customer: action.resp
        }
    }),
    on(coreActions.createCustomerFail, (currentState, action) => {
        return {
            ...currentState,
            respMsg: null,
            errorRespMsg: action.error
        }
    }),
    on(coreActions.getServiceCallInfo, (currentState) => {
        return {
            ...currentState,
            origins: [],
            problemType: [],
            subProblemType: [],
            callTypes: [],
            employees: []
        }
    }),
    on(coreActions.getServiceCallInfoSuccess, (currentState, action) => {
        return {
            ...currentState,
            origins: action.resp.origins,
            problemType: action.resp.problemTypes,
            subProblemType: action.resp.problemSubTypes,
            callTypes: action.resp.callTypes,
            employees: action.resp.employes
        }
    }),
    on(coreActions.getServiceCallInfoIntr, (currentState) => {
        return {
            ...currentState,
            origins: [],
            problemType: [],
            subProblemType: [],
            callTypes: [],
            employees: []
        }
    }),
    on(coreActions.getServiceCallInfoIntrSuccess, (currentState, action) => {
        return {
            ...currentState,
            origins: action.resp.origins,
            problemType: action.resp.problemTypes,
            subProblemType: action.resp.problemSubTypes,
            callTypes: action.resp.callTypes,
            employees: action.resp.employes
        }
    }),
    on(coreActions.getServiceCallBikeInfo, (currentState) => {
        return {
            ...currentState,
            origins: [],
            problemType: [],
            subProblemType: [],
            callTypes: [],
            employees: []
        }
    }),
    on(coreActions.getServiceCallBikeInfoSuccess, (currentState, action) => {
        return {
            ...currentState,
            origins: action.resp.origins,
            problemType: action.resp.problemTypes,
            subProblemType: action.resp.problemSubTypes,
            callTypes: action.resp.callTypes,
            employees: action.resp.employes
        }
    }),
    on(coreActions.getWarrantyServiceCallInfo, (currentState) => {
        return {
            ...currentState,
            origins: [],
            problemType: [],
            subProblemType: [],
            callTypes: [],
            employees: []
        }
    }),
    on(coreActions.getWarrantyServiceCallInfoSuccess, (currentState, action) => {
        return {
            ...currentState,
            origins: action.resp.origins,
            problemType: action.resp.problemTypes,
            subProblemType: action.resp.problemSubTypes,
            callTypes: action.resp.callTypes,
            employees: action.resp.employes
        }
    }),
    on(coreActions.getServiceCallHomeInfo, (currentState) => {
        return {
            ...currentState,
            origins: [],
            problemType: [],
            subProblemType: [],
            callTypes: [],
            employees: []
        }
    }),
    on(coreActions.getServiceCallHomeInfoSuccess, (currentState, action) => {
        return {
            ...currentState,
            origins: action.resp.origins,
            problemType: action.resp.problemTypes,
            subProblemType: action.resp.problemSubTypes,
            callTypes: action.resp.callTypes,
            employees: action.resp.employes
        }
    }),
)

export function coreReducer(state: CoreState, action: Action) {
    return reducer(state, action)
}