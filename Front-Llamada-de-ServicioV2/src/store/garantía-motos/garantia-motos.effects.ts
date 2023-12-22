import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as warrantyAction from "./garantia-motos.action"
import { showLoading, hideLoading } from "../loading/loading.actions";
import { CustomerMotorbike } from "src/app/pages/motos/model/CustomerMotorbike";
import { ToastService } from "src/app/core/services/toast.service";
import { MatDialog } from "@angular/material/dialog";
import { WarrantyService } from "src/app/pages/garantia-motos/service/warranty.service";
import { AppState } from "../AppState";
import { Offices } from "../login/LoginState";
import { ItemExistInService } from "src/app/pages/motos/model/Service";
import { ServicesService } from "src/app/pages/motos/service/services.service";
import { ItemsTransfer } from "../hogar/HogarState";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable()

export class GarantiaMotoEffects {

    officeBPLName$!: Observable<Offices>
    office!: Offices

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private toastService: ToastService,
        private warrantyService: WarrantyService,
        private servicesService: ServicesService,
        private modalService: NgbModal
    ) {
        this.officeBPLName$ = this.store.pipe(select(state => state.login.officeSelected))
        this.officeBPLName$.subscribe(state => this.office = state)
    }

    searchWarranty = createEffect(() => this.actions$.pipe(
        ofType(warrantyAction.search),
        switchMap((payload: { DNI?: string, Client?: string, Chasis?: string, Motor?: string, ClientName?: string, Serie?: string, WhsCode: string }) => {
            this.store.dispatch(showLoading())
            return this.warrantyService.searchCustomerMotorbike({ ...payload }).pipe(
                switchMap((motos: CustomerMotorbike[]) => {
                    this.store.dispatch(hideLoading())
                    return [warrantyAction.searchSuccess({ motos })]
                }),
                catchError((error) => {
                    this.store.dispatch(hideLoading())
                    return of(warrantyAction.searchFail({
                        error: error.error.msg
                    }))
                })
            )
        })
    ))

    postWarrantyService$ = createEffect(() => this.actions$.pipe(
        ofType(warrantyAction.postWarrantyService),
        switchMap((payload: { serviceBody: any }) => {
            this.store.dispatch(showLoading())
            return this.warrantyService.postServiceWarranty(payload.serviceBody).pipe(
                switchMap((resp: any) => {
                    this.store.dispatch(hideLoading())
                    if (resp.msg) {
                        this.toastService.showWarning("Avisó", `${resp.msg}`)
                        return [warrantyAction.postWarrantyServiceSuccess({ resp })]
                    } else {
                        this.modalService.dismissAll()
                        this.toastService.showSuccess("Éxito", "Llamada de servicio por garantía cargada correctamente!.")
                        return [warrantyAction.postWarrantyServiceSuccess({ resp })]
                    }
                }),
                catchError((errorResp) => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showError("Falló", "Ocurrió un problema al intentar crear la llamada de servicio. Verifique que los datos se hayan cargado correctamente")
                    return [warrantyAction.postWarrantyServiceFail({ errorResp })]
                })
            )
        })
    ))


    historyWarranty$ = createEffect(() => this.actions$.pipe(
        ofType(warrantyAction.warrantyCustomerHistory),
        switchMap((payload: { CustomerCode: string }) => {
            this.store.dispatch(showLoading())
            return this.warrantyService.getHistoryFromWarranty({ CustomerCode: payload.CustomerCode }).pipe(
                switchMap((resp: any) => {
                    this.store.dispatch(hideLoading())
                    if (resp.length > 0) {
                        this.toastService.showSuccess("Éxito", "Historial de llamadas de servicio por garantia del cliente cargadas exitosamente!.")
                        return [warrantyAction.warrantyCustomerHistorySuccess({ resp })]
                    } else {
                        this.toastService.showWarning("Avisó", "No se encontraron service por garantía realizados anteriormente.")
                        return [warrantyAction.warrantyCustomerHistorySuccess({ resp })]
                    }
                }),
                catchError((errorResp) => {
                    this.store.dispatch(hideLoading())
                    return [warrantyAction.warrantyCustomerHistoryFail({ error: "No se encontro un historial de service perteneciente a este cliente" })]
                })
            )
        })
    ))

    getTransferToWarranty$ = createEffect(() => this.actions$.pipe(
        ofType(warrantyAction.getTransferToWarranty),
        switchMap(() => {
            return this.warrantyService.getTransferToWarranty({
                Warehouse: this.office.BPLName
            }).pipe(
                switchMap((resp) => [warrantyAction.getTransferToWarrantySuccess({ resp })])
            )
        })
    ))

    getItems$ = createEffect(() => this.actions$.pipe(
        ofType(warrantyAction.getItems),
        switchMap((payload: { item: string, searchType: string, warehouse: string }) => {
            this.store.dispatch(showLoading())
            return this.warrantyService.getItems(payload).pipe(
                switchMap((items: any) => {
                    this.store.dispatch(hideLoading())
                    if (items.message && items.message.includes("No hay")) {
                        this.toastService.showWarning("Aviso", `No hay stock disponible de ${items.itemDescrip} (${items.itemCode}).`)
                        return [warrantyAction.getItemsSuccess({ items: [] })]
                    } else if (items.length > 0) {
                        this.toastService.showSuccess("Éxito", `Items cargados exitosamente.`)
                        return [warrantyAction.getItemsSuccess({ items })]
                    } else {
                        this.toastService.showSuccess("Aviso", `No se encontraron items en el inventario.`)
                        return [warrantyAction.getItemsSuccess({ items })]
                    }
                }),
                catchError((error) => {
                    this.store.dispatch(hideLoading())
                    return of(warrantyAction.getItemsFail({
                        error: "Ocurrio un problema al cargar el cliente. Esto se puede deber a que el cliente ya se haya cargado."
                    }))
                })
            )
        }),
    ))


    getItemsFromExistOperations$ = createEffect(() => this.actions$.pipe(
        ofType(warrantyAction.getItemsFromExistOperations),
        switchMap((payload: { ActivityCode: number }) => {
            this.store.dispatch(showLoading())
            return this.servicesService.getItemsFromExistOperations(payload.ActivityCode).pipe(
                switchMap((resp: ItemExistInService[]) => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showSuccess("Éxito", "Items seleccionados para las operaciones de este service cargados con éxito")
                    return [warrantyAction.getItemsFromExistOperationsSuccess({ resp })]
                }),
                catchError((errorResp) => {
                    this.store.dispatch(hideLoading())
                    return [warrantyAction.getItemsFromExistOperationsFail({ errorResp })]
                })
            )
        })
    ))

    getSecondWarehouse$ = createEffect(() => this.actions$.pipe(
        ofType(warrantyAction.getSecondWarehouse),
        switchMap(() => {
            return this.warrantyService.getSecondWarehouse({ WhsCode: '047', BPLId: 103 }).pipe(
                switchMap((resp) => [warrantyAction.getSecondWarehouseSuccess({ resp })]),
            )
        })
    ))

    getItemInStock$ = createEffect(() => this.actions$.pipe(
        ofType(warrantyAction.getItemInStock),
        switchMap((payload: { NameOrCode: string }) => {
            this.store.dispatch(showLoading())
            return this.warrantyService.getItemInStock({ WhsCode: this.office.BPLName, NameOrCode: payload.NameOrCode }).pipe(
                switchMap((resp: any) => {
                    this.store.dispatch(hideLoading())
                    if (resp.msg) {
                        this.toastService.showWarning("Aviso", resp.msg)
                        return [warrantyAction.getItemInStockSuccess({ resp: [] })]
                    } else {
                        return [warrantyAction.getItemInStockSuccess({
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

    getMotorbikeSeries$ = createEffect(() => this.actions$.pipe(
        ofType(warrantyAction.getMotorbikeSeries),
        switchMap((payload: { ItemCode: string }) => {
            this.store.dispatch(showLoading())
            return this.warrantyService.getMotorbikeSeries({ ItemCode: payload.ItemCode, WhsCode: '047' }).pipe(
                switchMap((resp: any) => {
                    this.store.dispatch(hideLoading())
                    !resp.length ? this.toastService.showWarning("Aviso", "No se encontraron series disponibles en el express de esta moto") : this.toastService.showSuccess("Éxito", "Series cargadas exitosamente")
                    return [warrantyAction.getMotorbikeSeriesSuccess({ resp })]
                })
            )
        })
    ))

    patchWarrantyService$ = createEffect(() => this.actions$.pipe(
        ofType(warrantyAction.patchWarrantyService),
        switchMap((payload: { serviceBody: any }) => {
            this.store.dispatch(showLoading())
            return this.warrantyService.patchWarrantyService(payload.serviceBody).pipe(
                switchMap((resp) => {
                    console.log(resp)
                    this.store.dispatch(hideLoading())
                    return [warrantyAction.patchWarrantyServiceSuccess({ resp })]
                }),
                catchError((error) => {
                    console.log(error, "Error al patchear el service")
                    this.store.dispatch(hideLoading())
                    return [warrantyAction.patchWarrantyServiceFail({ error })]
                })
            )
        })
    ))
}