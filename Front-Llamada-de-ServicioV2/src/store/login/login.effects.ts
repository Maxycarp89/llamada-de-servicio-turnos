import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginSuccess, loginFail, offices, officesSuccess, logout, logoutSuccess, logoutFail, clearLoginState, relogin, reloginSuccess, getAsigneeCode, geetAsigneeCodeSuccess, getPTICode, getPTICodeSuccess, updatePTIAndOffice, updatePTIAndOfficeSuccess } from "./login.action";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of, from, Observable } from "rxjs";
import { Router } from "@angular/router";
import { hideLoading, showLoading } from "../loading/loading.actions";
import { Store, select } from "@ngrx/store";
import { LoginService } from "src/app/pages/login/service/login.service";
import { LoginState, Offices } from "./LoginState";
import { AppState } from "../AppState";
import { ToastService } from "src/app/core/services/toast.service";
import { MatDialog } from "@angular/material/dialog";

@Injectable()

export class LoginEffects {

    userName$!: Observable<LoginState>
    userName!: string
    office!: Offices

    constructor(
        private actions$: Actions,
        private router: Router,
        private store: Store<AppState>,
        private loginService: LoginService,
        private toastService: ToastService,
        private dialogService: MatDialog
    ) {
        this.userName$ = this.store.pipe(select(state => state.login))
        this.userName$.subscribe(login => {
            this.userName = login.user
            this.office = login.officeSelected
        })
    }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            switchMap((payload: { UserName: string, Password: string }) => {
                this.store.dispatch(showLoading());
                return this.loginService.login(payload).pipe(
                    switchMap((resp: any) => [loginSuccess({ user: payload.UserName, token: resp.session, rol: resp.rol })]),
                    catchError(() => {
                        this.store.dispatch(hideLoading())
                        this.router.navigate(['login']);
                        this.toastService.showWarning("Aviso", "Usuario o contraseña incorrectas.")
                        return of(loginFail({ error: "Fallo al iniciar sesión" }));
                    })
                )
            }),
            tap((action) => {
                if (action.type === '[Login] success') {
                    setTimeout(() => {
                        this.store.dispatch(offices({ UserName: this.userName }))
                    }, 2000);
                }
            })
        )
    );

    relogin$ = createEffect(() => this.actions$.pipe(
        ofType(relogin),
        switchMap((payload: { UserName: string }) => {
            return this.loginService.relogin({ UserName: payload.UserName }).pipe(
                switchMap((resp: any) => {
                    return [reloginSuccess({ token: resp["set-cookie"][0] })]
                }),
                catchError(() => {
                   // this.store.dispatch(logout())
                    return []
                })
            )
        })
    ))

    offices$ = createEffect(() =>
        this.actions$.pipe(
            ofType(offices),
            switchMap((payload: { UserName: string }) => {
                return this.loginService.getOffices(payload).pipe(
                    switchMap((offices: Offices[]) => {
                        this.store.dispatch(hideLoading())
                        return [
                            officesSuccess({ offices }),
                        ]
                    }
                    ),
                );
            }),
            tap((action) => {
                if (action.type === '[Offices] success') {
                    this.store.dispatch(getAsigneeCode({ User: this.userName }))
                }
            })
        ))

    getAsigneeCode$ = createEffect(() => this.actions$.pipe(
        ofType(getAsigneeCode),
        switchMap((payload: { User: string }) => {
            return this.loginService.getAsigneeCode({ UserName: payload.User }).pipe(
                switchMap((resp: { asigneeCode: number }) => [geetAsigneeCodeSuccess({ asigneeCode: resp.asigneeCode })])
            )
        })
    ))

    getPTICode = createEffect(() => this.actions$.pipe(
        ofType(getPTICode),
        switchMap(() => {
            return this.loginService.getPTICode({ UserCode: this.userName, Warehouse: this.office.BPLId }).pipe(
                switchMap((resp) => [getPTICodeSuccess({ resp })])
            )
        })
    ))

    updateOfficeAndPTICode$ = createEffect(() => this.actions$.pipe(
        ofType(updatePTIAndOffice),
        switchMap((payload: { office: Offices }) => {
            this.store.dispatch(showLoading())
            return this.loginService.getPTICode({ UserCode: this.userName, Warehouse: payload.office.BPLId }).pipe(
                switchMap((resp) => {
                    this.toastService.showSuccess("Éxito", "Sucursal y POI cambiados exitosamente")
                    this.store.dispatch(hideLoading())
                    this.dialogService.closeAll()
                    return [updatePTIAndOfficeSuccess({ office: payload.office, resp })]
                })
            )
        }),
        tap((action) => {
            if (action.type === "[Office] update office and pti success") {
                window.location.reload()
            }
        })
    ))

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            switchMap(() =>
                from(this.loginService.logout()).pipe(
                    map(() => logoutSuccess()),
                    catchError(error => of(logoutFail({ error }))),
                    tap(() => {
                        this.store.dispatch(clearLoginState());
                        this.router.navigate(['/login'])
                        window.location.reload()
                    })
                )
            )
        )
    );
}