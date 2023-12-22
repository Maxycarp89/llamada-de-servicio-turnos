import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, } from "rxjs/operators";
import { of } from "rxjs";
import { MotoInternoService } from "src/app/pages/motos-interno/service/moto-interno.service";
import { Store } from "@ngrx/store";
import { getHistoryFromIntr, getHistoryFromIntrSuccess, getItems, getItemsFail, getItemsFromExistOperations, getItemsFromExistOperationsFail, getItemsFromExistOperationsSuccess, getItemsSuccess, getServiceCallInfo, getServiceCallInfoSuccess, patchServiceCall, patchServiceCallFail, postServiceCallInterno, postServiceCallInternoFail, postServiceCallInternoSuccess, searchInternMotorbike, searchInternMotorbikeSuccess } from "./moto-interno.action";
import { showLoading, hideLoading } from "../loading/loading.actions";
import { ToastService } from "src/app/core/services/toast.service";
import { MotorbikeIntr } from "src/app/pages/motos-interno/model/Motorbike";
import { ItemExistInService, Service } from "src/app/pages/motos/model/Service";
import { ServiceCallInfo } from "src/app/core/model/CoreTypes";
import { ServicesService } from "src/app/pages/motos/service/services.service";
import { ServiceInternoService } from "src/app/pages/motos-interno/service/services-interno.service";
import { patchServiceCallsSuccess } from "../motos/motos.action";
import { MatDialog } from "@angular/material/dialog";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable()

export class MotoInternoEffects {

    constructor(
        private actions$: Actions,
        private store: Store,
        private toastService: ToastService,
        private motoInternoService: MotoInternoService,
        private modalService: NgbModal,
        private servicesService: ServicesService,
        private serviceInternoService: ServiceInternoService
    ) { }

    searchIntern$ = createEffect(() => this.actions$.pipe(
        ofType(searchInternMotorbike),
        switchMap((payload: { NameOrCode?: string, Chasis?: string, Motor?: string, Serie?: string, WhsCode: string }) => {
            this.store.dispatch(showLoading())
            return this.motoInternoService.searchInternMotorbike({ ...payload }).pipe(
                switchMap((resp: MotorbikeIntr[]) => {
                    this.store.dispatch(hideLoading())
                    return [searchInternMotorbikeSuccess({ resp })]
                })
            )
        })
    ))

    getHistoryFromIntr$ = createEffect(() => this.actions$.pipe(
        ofType(getHistoryFromIntr),
        switchMap((payload: { Chasis: string }) => {
            this.store.dispatch(showLoading())
            return this.motoInternoService.getHistoryFromIntr({ Chasis: payload.Chasis, Type: 'M-INTERNO' }).pipe(
                switchMap((resp: Service[]) => {
                    this.store.dispatch(hideLoading())
                    if (resp.length > 0) {
                        this.toastService.showSuccess("Éxito", "Historial cargado éxitosamente.")
                        return [getHistoryFromIntrSuccess({ resp })]
                    } else {
                        this.toastService.showWarning("Avisó", "No se encontraron service asociados a este vehículo.")
                        return [getHistoryFromIntrSuccess({ resp: [] })]
                    }
                })
            )
        })
    ))

    getServiceCallInfo$ = createEffect(() => this.actions$.pipe(
        ofType(getServiceCallInfo),
        switchMap(() => {
            return this.motoInternoService.getServiceCallInfo().pipe(
                switchMap((resp: ServiceCallInfo) => [getServiceCallInfoSuccess({ resp })])
            )
        })
    ))

    getItems$ = createEffect(() => this.actions$.pipe(
        ofType(getItems),
        switchMap((payload: { item: string, searchType: string, warehouse: string }) => {
            this.store.dispatch(showLoading())
            return this.motoInternoService.getItems(payload).pipe(
                switchMap((items: any) => {
                    this.store.dispatch(hideLoading())
                    if (items.message && items.message.includes("No hay")) {
                        this.toastService.showWarning("Aviso", `No hay stock disponible de ${items.itemDescrip} (${items.itemCode}).`)
                        return [getItemsSuccess({ items: [] })]
                    } else if (items.length > 0) {
                        this.toastService.showSuccess("Éxito", `Items cargados exitosamente.`)
                        return [getItemsSuccess({ items })]
                    } else {
                        this.toastService.showSuccess("Aviso", `No se encontraron items en el inventario.`)
                        return [getItemsSuccess({ items })]
                    }
                }),
                catchError((error) => {
                    this.store.dispatch(hideLoading())
                    return of(getItemsFail({
                        error: "Ocurrio un problema al cargar el cliente. Esto se puede deber a que el cliente ya se haya cargado."
                    }))
                })
            )
        }),
    ))

    getItemsFromExistOperations$ = createEffect(() => this.actions$.pipe(
        ofType(getItemsFromExistOperations),
        switchMap((payload: { ActivityCode: number }) => {
            this.store.dispatch(showLoading())
            return this.servicesService.getItemsFromExistOperations(payload.ActivityCode).pipe(
                switchMap((resp: ItemExistInService[]) => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showSuccess("Éxito", "Items seleccionados para las operaciones de este service cargados con éxito")
                    return [getItemsFromExistOperationsSuccess({ resp })]
                }),
                catchError((errorResp) => {
                    this.store.dispatch(hideLoading())
                    return [getItemsFromExistOperationsFail({ errorResp })]
                })
            )
        })
    ))

    postServiceCallInterno$ = createEffect(() => this.actions$.pipe(
        ofType(postServiceCallInterno),
        switchMap((payload: { serviceCallBody: any }) => {
            this.store.dispatch(showLoading())
            return this.serviceInternoService.postServiceCallsInterno(payload.serviceCallBody).pipe(
                switchMap(resp => {
                    this.store.dispatch(hideLoading())
                    this.modalService.dismissAll()
                    this.toastService.showSuccess("Éxito", "Llamada de servicio cargada correctamente!.")
                    return [postServiceCallInternoSuccess({ resp })]
                }),
                catchError((errorMsg) => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showError("Falló", "Ocurrió un problema al intentar crear la llamada de servicio. Verifique que los datos se hayan cargado correctamente")
                    return [postServiceCallInternoFail({ errorMsg })]
                })
            )
        })
    ))

    patchServiceCallInterno$ = createEffect(() => this.actions$.pipe(
        ofType(patchServiceCall),
        switchMap((payload: { serviceCallBody: any }) => {
            this.store.dispatch(showLoading())
            return this.serviceInternoService.patchServiceCallsInterno(payload.serviceCallBody).pipe(
                switchMap(resp => {
                    this.store.dispatch(hideLoading())
                    this.modalService.dismissAll()
                    this.toastService.showSuccess("Éxito", "Llamada de servicio cargada correctamente!.")
                    return [patchServiceCallsSuccess({ resp })]
                }),
                catchError((errorMsg) => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showError("Falló", "Ocurrió un problema al intentar crear la llamada de servicio. Verifique que los datos se hayan cargado correctamente")
                    return [patchServiceCallFail({ errorMsg })]
                })
            )
        })
    ))

}