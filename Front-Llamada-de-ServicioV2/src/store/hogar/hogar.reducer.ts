import { Action, createReducer, on } from "@ngrx/store";
import * as homeActions from "./hogar.action"
import { AppInitialState } from "../AppInitialState";
import { HogarState, ItemsTransfer } from "./HogarState";

const initialState: HogarState = AppInitialState.hogar

const reducer = createReducer(initialState,
    on(homeActions.searchHomeItem, (currentState) => {
        return {
            ...currentState,
            homeAppliance: [],
            error: null,
            errorRespMsg: null
        }
    }),
    on(homeActions.searchHomeItemSuccess, (currentState, action) => {
        if (action.resp.length > 0) {
            return {
                ...currentState,
                homeAppliance: action.resp,
                errorRespMsg: null,
                error: null
            }
        } else {
            return {
                ...currentState,
                homeAppliance: [],
                errorRespMsg: "No se encontro dicho item."
            }
        }
    }),
    on(homeActions.getSecondWarehouseSuccess, (currentState, action) => {
        return {
            ...currentState,
            secondWarehouse: action.resp
        }
    }),
    on(homeActions.getItemInStock, (currentState) => {
        return {
            ...currentState,
            items: []
        }
    }),
    on(homeActions.getItemInStockSuccess, (currentState, action) => {
        return {
            ...currentState,
            items: action.resp
        }
    }),
    on(homeActions.manageItemStockQuantity, (currentState, action) => {
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
    on(homeActions.getHistoryFromHomeService, (currentState) => {
        return {
            ...currentState,
            historyService: []
        }
    }),
    on(homeActions.getHistoryFromHomeServiceSuccess, (currentState, action) => {
        return {
            ...currentState,
            historyService: action.resp
        }
    }),
    on(homeActions.getItemExistInTransfer, (currentState) => {
        return {
            ...currentState,
            itemsExistInService: []
        }
    }),
    on(homeActions.getItemExistInTransferSuccess, (currentState, action) => {
        return {
            ...currentState,
            itemsExistInService: action.resp
        }
    })
)

export function hogarReducer(state: HogarState, action: Action) {
    return reducer(state, action)
}