import { Action, createReducer, on } from "@ngrx/store";
import { getHistoryFromIntr, getHistoryFromIntrSuccess, getServiceCallInfoSuccess, searchInternMotorbike, searchInternMotorbikeSuccess, getItems, getItemsSuccess, getItemsFail, getItemsFromExistOperations, getItemsFromExistOperationsSuccess, resetItemInInventoryExist } from "./moto-interno.action";
import { AppInitialState } from "../AppInitialState";
import { MotoInternoState } from "./MotoInternoState";

const initialState: MotoInternoState = AppInitialState.motoInterno

const reducer = createReducer(initialState,
    on(searchInternMotorbike, (currentState) => {
        return {
            ...currentState,
            motos: [],
            errorMsg: null,
            historyIntr: []
        }
    }),
    on(searchInternMotorbikeSuccess, (currentState, action) => {
        if (action.resp.length > 0) {
            return {
                ...currentState,
                motos: action.resp,
                errorMsg: null,
                historyIntr: []
            }
        } else {
            return {
                ...currentState,
                motos: [],
                errorMsg: "No se encontro dicha moto.",
                historyIntr: []
            }
        }
    }),
    on(getHistoryFromIntr, (currentState) => {
        return {
            ...currentState,
            historyIntr: [],
            historyErrorMsg: null
        }
    }),
    on(getHistoryFromIntrSuccess, (currentState, action) => {
        if (action.resp.length > 0) {
            return {
                ...currentState,
                historyIntr: action.resp,
                historyErrorMsg: null
            }
        } else {
            return {
                ...currentState,
                historyIntr: [],
                historyErrorMsg: "No se encontraron service asociados a este vehículo."
            }
        }
    }),
    on(getServiceCallInfoSuccess, (currentState, action) => {
        return {
            ...currentState,
            origins: action.resp.origins,
            problemType: action.resp.problemTypes,
            subProblemType: action.resp.problemSubTypes,
            callTypes: action.resp.callTypes,
            employees: action.resp.employes
        }
    }),
    on(getItems, currentState => {
        return {
            ...currentState,
            itemsFromOperations: []
        }
    }),
    on(getItemsSuccess, (currentState, action) => {
        return {
            ...currentState,
            itemsFromOperations: action.items
        }
    }),
    on(getItemsFail, currentState => {
        return {
            ...currentState,
            itemsFromOperations: []
        }
    }),
    on(getItemsFromExistOperations, currentState => {
        return {
            ...currentState,
            itemsExistInService: []
        }
    }),
    on(getItemsFromExistOperationsSuccess, (currentState, action) => {
        return {
            ...currentState,
            itemsExistInService: action.resp
        }
    }),
    on(resetItemInInventoryExist, (currentState) => {
        return {
            ...currentState,
            itemsExistInService: [],
            itemsFromOperations: []
        }
    })
)

export function motoInternoReducer(state: MotoInternoState, action: Action) {
    return reducer(state, action)
}