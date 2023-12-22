import { Action, createReducer, on } from "@ngrx/store";
import { loginSuccess, loginFail, logoutSuccess, clearLoginState, officesSuccess, selectOffice, reloginSuccess, getAsigneeCode, geetAsigneeCodeSuccess, getPTICode, getPTICodeSuccess, updatePTIAndOfficeSuccess } from "./login.action";
import { AppInitialState } from "../AppInitialState";
import { LoginState, Offices } from "./LoginState";

const initialState: LoginState = AppInitialState.login

const reducer = createReducer(initialState,
    on(loginSuccess, (currentState, action) => {
        return {
            ...currentState,
            isLoggedIn: false,
            error: null,
            user: action.user,
            token: action.token,
            offices: [],
            officeSelected: null,
            rol: action.rol
        }
    }),
    on(loginFail, (currentState, action) => {
        return {
            ...currentState,
            isLoggedIn: false,
            error: action.error,
            token: null,
            user: null,
            offices: [],
            officeSelected: null
        }
    }),
    on(reloginSuccess, (currentState, action) => {
        return {
            ...currentState,
            token: action.token
        }
    }),
    on(logoutSuccess, currentState => {
        return {
            ...currentState,
            isLoggedIn: false,
            error: null,
            token: null,
            user: null,
            offices: [],
            officeSelected: null
        };
    }),
    on(officesSuccess, (currentState, action) => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: false,
            offices: action.offices,
            officeSelected: null
        };
    }),
    on(selectOffice, (currentState, action) => {
        const officesFiltered = currentState.offices.filter((office: Offices) => office.BPLId === action.BPLId)
        return {
            ...currentState,
            error: null,
            isLoggedIn: true,
            officeSelected: officesFiltered[0]
        };
    }),
    on(getAsigneeCode, (currentState) => {
        return {
            ...currentState,
            asigneeCode: null
        }
    }),
    on(geetAsigneeCodeSuccess, (currentState, action) => {
        return {
            ...currentState,
            asigneeCode: action.asigneeCode
        }
    }),
    on(getPTICode, (currentState) => {
        return {
            ...currentState,
            ptiCode: null
        }
    }),
    on(getPTICodeSuccess, (currentState, action) => {
        return {
            ...currentState,
            ptiCode: action.resp
        }
    }),
    on(updatePTIAndOfficeSuccess, (currentState, action) => {
        return {
            ...currentState,
            ptiCode: action.resp,
            officeSelected: action.office
        }
    }),
    on(clearLoginState, () =>
        initialState
    )
)

export function loginReducer(state: LoginState, action: Action) {
    return reducer(state, action)
}