import { Action, createReducer, on } from "@ngrx/store";
import * as bikeActions from "./bikes.action"
import { AppInitialState } from "../AppInitialState";
import { BikeState } from "./BikeState";

const initialState: BikeState = AppInitialState.bikes

const reducer = createReducer(initialState,
    on(bikeActions.searchBikes, (currentState) => {
        return {
            ...currentState,
            error: null,
            errorRespMsg: null,
        }
    }),
    on(bikeActions.searchBikesSuccess, (currentState, action) => {
        if (!action.bikes.length) {
            return {
                ...currentState,
                error: "No se encontro dicha bicicleta. Para corroborar que el cliente existe, se debe realizar una busqueda por DNI o C° del Cliente. Intentar buscar por algún otro dato porfavor.",
                bikes: [],
                errorRespMsg: null
            }
        } else {
            return {
                ...currentState,
                error: null,
                errorRespMsg: null,
                bikes: action.bikes
            }
        }
    }),
    on(bikeActions.searchBikesFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            bikes: [],
            errorRespMsg: null
        }
    }),
    on(bikeActions.getServiceCallInfoSuccess, (currentState, action) => {
        return {
            ...currentState,
            origins: action.resp.origins,
            problemType: action.resp.problemTypes,
            subProblemType: action.resp.problemSubTypes,
            callTypes: action.resp.callTypes,
            employees: action.resp.employes
        }
    }),
    on(bikeActions.getItemsInBikes, (currentState) => {
        return {
            ...currentState,
            bikesSearched: []
        }
    }),
    on(bikeActions.getItemsInBikesSuccess, (currentState, action) => {
        if (action.resp.length > 0) {
            return {
                ...currentState,
                bikesSearched: action.resp
            }
        } else {
            return {
                ...currentState,
                bikesSearched: [],
                showMarcas: true
            }
        }
    }),
    on(bikeActions.getSpecificHistoryBike, (currentState) => {
        return {
            ...currentState,
            historyService: [],
            errorMsgHistory: null
        }
    }),
    on(bikeActions.getSpecificHistoryBikeSuccess, (currentState, action) => {
        if (action.resp.length > 0) {
            return {
                ...currentState,
                historyService: action.resp,
                errorMsgHistory: null
            }
        } else {
            return {
                ...currentState,
                historyService: [],
                errorMsgHistory: "No se encontraron services pertenecientes a este cliente y a esta bicicleta."
            }
        }
    }),
    on(bikeActions.getSpecificHistoryBikeFail, (currentState) => {
        return {
            ...currentState,
            historyService: []
        }
    }),
    on(bikeActions.getItemsFromExistOperationsInBike, (currentState) => {
        return {
            ...currentState,
            itemsExistInService: []
        }
    }),
    on(bikeActions.getItemsFromExistOperationsInBikeSuccess, (currentState, action) => {
        return {
            ...currentState,
            itemsExistInService: action.resp
        }
    }),
    on(bikeActions.getItemsFromExistOperationsInBikeFail, (currentState) => {
        return {
            ...currentState,
            itemsExistInService: []
        }
    }),
    on(bikeActions.getOperationInBike, (currentState) => {
        return {
            ...currentState,
            itemsFromOperations: []
        }
    }),
    on(bikeActions.getOperationInBikeSuccess, (currentState, action) => {
        return {
            ...currentState,
            itemsFromOperations: action.items
        }
    }),
    on(bikeActions.getOperationInBikeFail, (currentState) => {
        return {
            ...currentState,
            itemsFromOperations: []
        }
    }),
    on(bikeActions.clearItemsExistInService, (currentState) => {
        return {
            ...currentState,
            itemsExistInService: [],
            itemsFromOperations: [],
            bikesSearched: [],
            marcas: [],
            showMarcas: false
        }
    }),
    on(bikeActions.getCombos, (currentState) => {
        return {
            ...currentState,
            combos: []
        }
    }),
    on(bikeActions.getCombosSuccess, (currentState, action) => {
        return {
            ...currentState,
            combos: action.resp
        }
    }),
    on(bikeActions.getMarcas, (currentState, action) => {
        return {
            ...currentState,
            marcas: []
        }
    }),
    on(bikeActions.getMarcasSuccess, (currentState, action) => {
        return {
            ...currentState,
            marcas: action.resp,
            showMarcas: false
        }
    })
)

export function bikesReducer(state: BikeState, action: Action) {
    return reducer(state, action)
}