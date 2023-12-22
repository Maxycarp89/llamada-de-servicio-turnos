import { Action, createReducer, on } from "@ngrx/store";
import { search, searchSuccess, searchFail, createCustomer, createCustomerSuccess, createCustomerFail, clearState, getHistory, getHistorySuccess, clearHistoryService, getServiceCallInfoSuccess, getMotorbikeByBrandAndModel, getMotorbikeByBrandAndModelSuccess, getItems, getItemsSuccess, getItemsFail, getItemsFromExistOperations, getItemsFromExistOperationsSuccess, clearItemsExistInService, getSpecificHistoryService, getSpecificHistoryServiceSuccess, getCombos, getCombosSuccess } from "./motos.action";
import { AppInitialState } from "../AppInitialState";
import { MotosState } from "./motosState";

const initialState: MotosState = AppInitialState.motos

const reducer = createReducer(initialState,
    on(search, (currentState) => {
        return {
            ...currentState,
            error: null,
            respMsg: null,
            errorRespMsg: null,
            motos: [],
            customer: [],
            motosSelected: {},
            historyService: [],
            failMsgHistory: null,
            motorbikeByBrandAndModel: [],
            itemsExistInService: []
        }
    }),
    on(searchSuccess, (currentState, action) => {
        if (action.motos.length <= 0) {
            return {
                ...currentState,
                error: "No se encontro dicha moto. Para corroborar que el cliente existe, se debe realizar una busqueda por DNI o C° del Cliente. Intentar buscar por algún otro dato porfavor.",
                motos: [],
                customer: [],
                motosSelected: {},
                respMsg: null,
                errorRespMsg: null,
                historyService: [],
                failMsgHistory: null,
                motorbikeByBrandAndModel: []
            }
        } else {
            if (!!action.motos[0].ItemCode === true) {
                return {
                    ...currentState,
                    error: null,
                    motos: action.motos,
                    motosSelected: {},
                    respMsg: null,
                    errorRespMsg: null,
                    customer: [],
                    historyService: [],
                    failMsgHistory: null,
                    motorbikeByBrandAndModel: []
                }
            } else {
                return {
                    ...currentState,
                    error: null,
                    motos: [],
                    motosSelected: {},
                    respMsg: null,
                    errorRespMsg: null,
                    customer: action.motos,
                    historyService: [],
                    failMsgHistory: null,
                    motorbikeByBrandAndModel: []
                }
            }
        }
    }),
    on(searchFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            motos: [],
            motosSelected: {},
            respMsg: null,
            historyService: [],
            failMsgHistory: null,
        }
    }),
    on(createCustomer, (currentState) => {
        return {
            ...currentState,
            motorbikeByBrandAndModel: []
        }
    }),
    on(createCustomerSuccess, (currentState, action) => {
        return {
            ...currentState,
            respMsg: action.newClient.resp,
            error: null,
            motos: [],
            motosSelected: {},
            errorRespMsg: null,
            historyService: [],
            failMsgHistory: null,
        }
    }),
    on(createCustomerFail, (currentState, action) => {
        return {
            ...currentState,
            respMsg: null,
            error: null,
            motos: [],
            motosSelected: {},
            errorRespMsg: action.error,
            historyService: [],
            failMsgHistory: null,
        }
    }),
    on(getHistory, (currentState) => {
        return {
            ...currentState,
            historyService: [],
            failMsgHistory: null,
            motorbikeByBrandAndModel: []
        }
    }),
    on(getHistorySuccess, (currentState, action) => {
        if (action.history.length > 0) {
            return {
                ...currentState,
                historyService: action.history,
                failMsgHistory: null,
            }
        } else {
            return {
                ...currentState,
                historyService: [],
                failMsgHistory: "No se encontraron services pertenecientes a este cliente.",
            }
        }
    }),
    on(getSpecificHistoryService, (currentState) => {
        return {
            ...currentState,
            historyService: [],
            failMsgHistory: null,
            motorbikeByBrandAndModel: []
        }
    }),
    on(getSpecificHistoryServiceSuccess, (currentState, action) => {
        return {
            ...currentState,
            historyService: action.history,
            failMsgHistory: null,
        }
    }),
    on(clearHistoryService, (currentState) => {
        return {
            ...currentState,
            historyService: [],
            failMsgHistory: null,
        }
    }), on(getServiceCallInfoSuccess, (currentState, action) => {
        return {
            ...currentState,
            origins: action.resp.origins,
            problemType: action.resp.problemTypes,
            subProblemType: action.resp.problemSubTypes,
            callTypes: action.resp.callTypes,
            employees: action.resp.employes
        }
    }), on(getMotorbikeByBrandAndModel, (currentState) => {
        return {
            ...currentState,
            motorbikeByBrandAndModel: []
        }
    }), on(getMotorbikeByBrandAndModelSuccess, (currentState, action) => {
        return {
            ...currentState,
            motorbikeByBrandAndModel: action.resp
        }
    }), on(getItems, currentState => {
        return {
            ...currentState,
            itemsFromOperations: []
        }
    }), on(getItemsSuccess, (currentState, action) => {
        return {
            ...currentState,
            itemsFromOperations: action.items
        }
    }), on(getItemsFail, currentState => {
        return {
            ...currentState,
            itemsFromOperations: []
        }
    }), on(getItemsFromExistOperations, currentState => {
        return {
            ...currentState,
            itemsExistInService: []
        }
    }), on(getItemsFromExistOperationsSuccess, (currentState, action) => {
        return {
            ...currentState,
            itemsExistInService: action.resp
        }
    }),
    on(clearState, (currentState) => {
        return {
            ...currentState,
            error: null,
            respMsg: null,
            errorRespMsg: null,
            motos: [],
            customer: [],
            motosSelected: {},
            historyService: [],
            failMsgHistory: null,
            motorbikeByBrandAndModel: [],
            itemsExistInService: []
        }
    }), on(clearItemsExistInService, (currentState) => {
        return {
            ...currentState,
            itemsExistInService: [],
            itemsFromOperations: [],
            motorbikeByBrandAndModel: []
        }
    }), on(getCombos, (currentState) => {
        return {
            ...currentState,
            combos: []
        }
    }), on(getCombosSuccess, (currentState, action) => {
        return {
            ...currentState,
            combos: action.resp
        }
    })
)

export function motosReducer(state: MotosState, action: Action) {
    return reducer(state, action)
}