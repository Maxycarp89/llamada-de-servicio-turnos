import { Action, createReducer, on } from "@ngrx/store";
import { showLoading, hideLoading } from "./loading.actions";
import { LoadingState } from "./LoadingState";


const initialState: LoadingState = {
    show: false
}

const reducer = createReducer(
    initialState,
    on(showLoading, () => {
        return {show: true};
    } ),
    on(hideLoading, () => {
        return {show: false};
    }));

export function loadingReducer(state: LoadingState | undefined, action: Action) {
    return reducer(state, action);
}