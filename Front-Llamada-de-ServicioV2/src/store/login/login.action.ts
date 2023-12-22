import { createAction, props } from '@ngrx/store';
import { Offices } from './LoginState';

export const login = createAction("[Login]", props<{ UserName: string, Password: string }>())
export const loginSuccess = createAction("[Login] success", props<{ user: string, token: string | null, rol: any }>());
export const loginFail = createAction("[Login] fail", props<{ error: string }>());

export const relogin = createAction("[Login] relogin", props<{ UserName: string }>())
export const reloginSuccess = createAction("[Login] relogin success", props<{ token: string | null }>())
export const reloginFail = createAction("[Login] relogin fail")

export const logout = createAction("[logout]");
export const logoutSuccess = createAction("[logout] success");
export const logoutFail = createAction("[logout] fail", props<{ error: any }>());

export const offices = createAction("[Offices]", props<{ UserName: string }>())
export const officesSuccess = createAction("[Offices] success", props<{ offices: Offices[] }>())

export const getAsigneeCode = createAction("[Offices] get asignee code", props<{ User: string }>())
export const geetAsigneeCodeSuccess = createAction("[Offices] get asignee code success", props<{ asigneeCode: number }>())

export const selectOffice = createAction("[Offices] select", props<{ BPLId: number }>())

export const getPTICode = createAction("[Office] get PTI Code")
export const getPTICodeSuccess = createAction("[Office] get PTI Code success", props<{ resp: any }>())

export const updatePTIAndOffice = createAction("[Office] update office and pti", props<{ office: Offices }>())
export const updatePTIAndOfficeSuccess = createAction("[Office] update office and pti success", props<{ office: Offices, resp: any }>())

export const clearLoginState = createAction("[clear] login state");