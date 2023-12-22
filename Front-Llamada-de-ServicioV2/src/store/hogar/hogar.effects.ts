import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, switchMap, of, Observable, subscribeOn } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as homeActions from "./hogar.action"
import { ToastService } from "src/app/core/services/toast.service";
import { hideLoading, showLoading } from "../loading/loading.actions";
import { MatDialog } from "@angular/material/dialog";
import { HogarService } from "src/app/pages/hogar/service/hogar.service";
import { AppState } from "../AppState";
import { Offices } from "../login/LoginState";
import { ItemsTransfer } from "./HogarState";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Injectable()

export class HogarEffects {

    private office$!: Observable<Offices>
    private office!: Offices

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private toastService: ToastService,
        private modalService: NgbModal,
        private hogarService: HogarService
    ) {
        this.office$ = this.store.pipe(select(state => state.login.officeSelected))
        this.office$.subscribe(state => this.office = state)
    }

    searchItemHogar$ = createEffect(() => this.actions$.pipe(
        ofType(homeActions.searchHomeItem),
        switchMap((payload: { NameOrCode?: string, Client?: string, DNI?: string }) => {
            this.store.dispatch(showLoading())
            return this.hogarService.searchHomeItem({ ...payload }).pipe(
                switchMap((resp) => {
                    this.store.dispatch(hideLoading())
                    return [homeActions.searchHomeItemSuccess({ resp })]
                }),
                catchError(() => {
                    this.store.dispatch(hideLoading())
                    return of(homeActions.searchHomeItemFail({ error: "No se encontro un item perteneciente a hogar con ese nombre." }))
                })
            )
        })
    ))


    getSecondWarehouse$ = createEffect(() => this.actions$.pipe(
        ofType(homeActions.getSecondWarehouse),
        switchMap(() => {
            return this.hogarService.getSecondWarehouse({ WhsCode: this.office.BPLName, BPLId: this.office.BPLId }).pipe(
                switchMap((resp) => [homeActions.getSecondWarehouseSuccess({ resp })]),
            )
        })
    ))


    postServiceCallsHome$ = createEffect(() => this.actions$.pipe(
        ofType(homeActions.postServiceCallsHome),
        switchMap((payload: { serviceBody: any }) => {
            this.store.dispatch(showLoading())
            return this.hogarService.postServiceCallsHome(payload.serviceBody).pipe(
                switchMap((resp: any) => {
                    this.store.dispatch(hideLoading())
                    if (resp.msg) {
                        this.toastService.showWarning("Aviso", resp.msg)
                        return []
                    } else {
                        this.modalService.dismissAll()
                        this.toastService.showSuccess("Exito", "Service creado exitosamente")
                        return [homeActions.postServiceCallsHomeSuccess({ resp })]
                    }
                }),
                catchError((error) => {
                    console.log(error)
                    this.store.dispatch(hideLoading())
                    this.toastService.showWarning("Aviso", "Ocurrió un problema al intentar editar el servicio.")
                    return [homeActions.postServiceCallsHomeFail({ error })]
                })
            )
        })
    ))

    patchServiceCallsHome$ = createEffect(() => this.actions$.pipe(
        ofType(homeActions.patchServiceCallsHome),
        switchMap((payload: { serviceBody: any }) => {
            this.store.dispatch(showLoading())
            return this.hogarService.patchServiceCallsHome(payload.serviceBody).pipe(
                switchMap((resp: any) => {
                    this.store.dispatch(hideLoading())
                    if (resp.msg) {
                        this.toastService.showWarning("Aviso", resp.msg)
                        return []
                    } else {
                        this.modalService.dismissAll()
                        this.toastService.showSuccess("Exito", "Service editado exitosamente")
                        return [homeActions.patchServiceCallsHomeSuccess({ resp })]
                    }
                }),
                catchError((error) => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showWarning("Aviso", "Ocurrió un problema al intentar editar el servicio.")
                    console.log(error)
                    return [homeActions.patchServiceCallsHomeFail({ error })]
                })
            )
        })
    ))

    getItemInStock$ = createEffect(() => this.actions$.pipe(
        ofType(homeActions.getItemInStock),
        switchMap((payload: { NameOrCode: string }) => {
            this.store.dispatch(showLoading())
            return this.hogarService.getItemInStock({ WhsCode: this.office.BPLName, NameOrCode: payload.NameOrCode }).pipe(
                switchMap((resp: any) => {
                    this.store.dispatch(hideLoading())
                    if (resp.msg) {
                        this.toastService.showWarning("Aviso", resp.msg)
                        return [homeActions.getItemInStockSuccess({ resp: [] })]
                    } else {
                        return [homeActions.getItemInStockSuccess({
                            resp: resp.map((e: ItemsTransfer) => {
                                return {
                                    ...e,
                                    Quantity: 1
                                }
                            })
                        })]
                    }
                })
            )
        })
    ))

    getHistoryFromHomeService$ = createEffect(() => this.actions$.pipe(
        ofType(homeActions.getHistoryFromHomeService),
        switchMap((payload: { CustomerCode: string, ItemCode: string }) => {
            this.store.dispatch(showLoading())
            return this.hogarService.getHistoryFromHomeService({ CustomerCode: payload.CustomerCode, ItemCode: payload.ItemCode, Type: 'HOGAR' }).pipe(
                switchMap((resp: any) => {
                    this.store.dispatch(hideLoading())
                    resp.length > 0 ? this.toastService.showSuccess("Éxito", `Historial del item con el código ${payload.ItemCode} cargado exitosamente`) : this.toastService.showWarning("Aviso", "No se encontro service previamente creados para los items con este código")
                    return [homeActions.getHistoryFromHomeServiceSuccess({ resp })]
                }),
                catchError(() => {
                    this.store.dispatch(hideLoading())
                    return []
                })
            )
        })
    ))

    getItemExistInTransfer$ = createEffect(() => this.actions$.pipe(
        ofType(homeActions.getItemExistInTransfer),
        switchMap((payload: { ActivityCode: number }) => {
            this.store.dispatch(showLoading())
            return this.hogarService.getItemExistInTransfer(payload.ActivityCode).pipe(
                switchMap((resp) => {
                    this.store.dispatch(hideLoading())
                    return [homeActions.getItemExistInTransferSuccess({ resp })]
                })
            )
        })
    ))
}