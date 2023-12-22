import { Action, createReducer, on } from "@ngrx/store";
import * as warrantyAction from "./garantia-motos.action"
import { AppInitialState } from "../AppInitialState";
import { GarantiaMotoState } from "./GarantiaMotosState";
import { ItemsTransfer } from "../hogar/HogarState";

const initialState: GarantiaMotoState = AppInitialState.garantia

const reducer = createReducer(initialState,
    on(warrantyAction.search, (currentState) => {
        return {
            ...currentState,
            error: null,
            respMsg: null,
            errorRespMsg: null,
            motos: [],
        }
    }),
    on(warrantyAction.searchSuccess, (currentState, action) => {
        return {
            ...currentState,
            error: null,
            respMsg: null,
            errorRespMsg: null,
            motos: action.motos
            ,
        }
    }),
    on(warrantyAction.getSecondWarehouse, (currentState, aciton) => {
        return {
            ...currentState,
            secondWarehouse: []
        }
    }),
    on(warrantyAction.getSecondWarehouseSuccess, (currentState, action) => {
        return {
            ...currentState,
            secondWarehouse: action.resp
        }
    }),
    on(warrantyAction.searchFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            respMsg: null,
            errorRespMsg: null,
            motos: []
        }
    }),
    on(warrantyAction.warrantyCustomerHistory, (currentState) => {
        return {
            ...currentState,
            warrantyHistory: []
        }
    }),
    on(warrantyAction.warrantyCustomerHistorySuccess, (currentState, action) => {
        return {
            ...currentState,
            warrantyHistory: action.resp
        }
    }),
    on(warrantyAction.warrantyCustomerHistoryFail, (currentState, action) => {
        return {
            ...currentState,
            warrantyHistory: []
        }
    }),
    on(warrantyAction.getTransferToWarranty, (currentState) => {
        return {
            ...currentState,
            transfer: []
        }
    }),
    on(warrantyAction.getTransferToWarrantySuccess, (currentState, action) => {
        return {
            ...currentState,
            transfer: action.resp
        }
    }),
    on(warrantyAction.getItems, currentState => {
        return {
            ...currentState,
            itemsFromOperations: []
        }
    }), on(warrantyAction.getItemsSuccess, (currentState, action) => {
        return {
            ...currentState,
            itemsFromOperations: action.items
        }
    }), on(warrantyAction.getItemsFail, currentState => {
        return {
            ...currentState,
            itemsFromOperations: []
        }
    }),
    on(warrantyAction.getItemsFromExistOperations, currentState => {
        return {
            ...currentState,
            itemsExistInService: []
        }
    }), on(warrantyAction.getItemsFromExistOperationsSuccess, (currentState, action) => {
        return {
            ...currentState,
            itemsExistInService: action.resp
        }
    }),
    on(warrantyAction.clearItemsExistInService, (currentState) => {
        return {
            ...currentState,
            itemsExistInService: [],
            itemsFromOperations: [],
        }
    }),
    on(warrantyAction.getItemInStock, (currentState) => {
        return {
            ...currentState,
            items: []
        }
    }),
    on(warrantyAction.getItemInStockSuccess, (currentState, action) => {
        return {
            ...currentState,
            items: action.resp
        }
    }),
    on(warrantyAction.manageItemStockQuantity, (currentState, action) => {
        const itemsWithNewQuantity = currentState.items.map((e: ItemsTransfer) => {
            if (e.id__ === action.id) {
                return { ...e, Quantity: action.Quantity }
            } else return e
        })
        return {
            ...currentState,
            items: itemsWithNewQuantity
        }
    }),
    on(warrantyAction.getMotorbikeSeriesSuccess, (currentState, action) => {
        return {
            ...currentState,
            series: action.resp
        }
    }),
    on(warrantyAction.resetSeries, (currentState) => {
        return {
            ...currentState,
            series: []
        }
    })
)

export function warrantyReducer(state: GarantiaMotoState, action: Action) {
    return reducer(state, action)
}