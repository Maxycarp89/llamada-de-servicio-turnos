import { Action, createReducer, on } from "@ngrx/store";
import * as dashboardAction from "./dashboard.action"
import { DashboardState } from "./DashboardState";
import { AppInitialState } from "../AppInitialState";

const initialState: DashboardState = AppInitialState.dashboard

const reducer = createReducer(initialState,
    on(dashboardAction.getHistoryFromDashboard, (currentState) => {
        return {
            ...currentState,
            history: []
        }
    }),
    on(dashboardAction.getHistoryFromDashboardSuccess, (currentState, action) => {
        return {
            ...currentState,
            history: action.resp
        }
    }),
    on(dashboardAction.getHistoryFromDashboardFail, (currentState) => {
        return {
            ...currentState,
            history: []
        }
    })
)

export function dashboardReducer(state: DashboardState, action: Action) {
    return reducer(state, action)
}