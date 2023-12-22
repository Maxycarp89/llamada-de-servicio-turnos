import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, switchMap } from "rxjs";
import { of } from "rxjs";
import { Store } from "@ngrx/store";
import * as coreActions from "./core.action"
import { showLoading, hideLoading } from "../loading/loading.actions";
import { ToastService } from "src/app/core/services/toast.service";
import { ServiceCallInfo } from "src/app/core/model/CoreTypes";
import { CustomerService } from "src/app/pages/motos/service/customer.service";
import { MatDialog } from "@angular/material/dialog";
import { MotosService } from "src/app/pages/motos/service/motos.service";
import { MotoInternoService } from "src/app/pages/motos-interno/service/moto-interno.service";
import { BikeService } from "src/app/pages/bike/service/bike.service";
import { WarrantyService } from "src/app/pages/garantia-motos/service/warranty.service";
import { HogarService } from "src/app/pages/hogar/service/hogar.service";

@Injectable()

export class CoreEffects {

    constructor(
        private actions$: Actions,
        private store: Store,
        private toastService: ToastService,
        private customerService: CustomerService,
        private dialogService: MatDialog,
        private motosService: MotosService,
        private motoInternoService: MotoInternoService,
        private bikeService: BikeService,
        private warrantyService: WarrantyService,
        private homeService: HogarService
    ) { }

    createCustomer$ = createEffect(() => this.actions$.pipe(
        ofType(coreActions.createCustomer),
        switchMap((payload) => {
            this.store.dispatch(showLoading())
            return this.customerService.createCustomer(payload).pipe(
                switchMap(newClient => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showSuccess("Éxito", "Cliente cargado exitosamente!.")
                    this.dialogService.closeAll()
                    return [coreActions.createCustomerSuccess({ newClient })]
                }),
                catchError(() => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showError("Falló", "Ocurrió un problema al cargar el cliente. Controle que los datos esten bien cargados")
                    return of(coreActions.createCustomerFail({
                        error: "Ocurrio un problema al cargar el cliente. Esto se puede deber a que el cliente ya se haya cargado."
                    }))
                })
            )

        })
    ))

    getBussinessPartner$ = createEffect(() => this.actions$.pipe(
        ofType(coreActions.getBussinessPartner),
        switchMap((payload: { Search: string }) => {
            this.store.dispatch(showLoading())
            return this.customerService.getBussinessPartner(payload.Search).pipe(
                switchMap((resp) => {
                    this.store.dispatch(hideLoading())
                    return [coreActions.getBussinessPartnerSuccess({ resp })]
                })
            )
        })
    ))

    getServiceCallInfo$ = createEffect(() => this.actions$.pipe(
        ofType(coreActions.getServiceCallInfo),
        switchMap(() => {
            return this.motosService.getServiceCallInfo().pipe(
                switchMap((resp: ServiceCallInfo) => [coreActions.getServiceCallInfoSuccess({ resp })])
            )
        })
    ))

    getServiceCallInfoIntr$ = createEffect(() => this.actions$.pipe(
        ofType(coreActions.getServiceCallInfoIntr),
        switchMap(() => {
            return this.motoInternoService.getServiceCallInfo().pipe(
                switchMap((resp: ServiceCallInfo) => [coreActions.getServiceCallInfoIntrSuccess({ resp })])
            )
        })
    ))

    getServiceCallBikeInfo$ = createEffect(() => this.actions$.pipe(
        ofType(coreActions.getServiceCallBikeInfo),
        switchMap(() => {
            return this.bikeService.getServiceCallBikeInfo().pipe(
                switchMap((resp: ServiceCallInfo) => [coreActions.getServiceCallBikeInfoSuccess({ resp })])
            )
        })
    ))

    getWarrantyServiceInfo$ = createEffect(() => this.actions$.pipe(
        ofType(coreActions.getWarrantyServiceCallInfo),
        switchMap(() => {
            return this.warrantyService.warrantyServiceCallInfo().pipe(
                switchMap((resp: ServiceCallInfo) => [coreActions.getWarrantyServiceCallInfoSuccess({ resp })])
            )
        })
    ))

    getServiceCallHomeInfo$ = createEffect(() => this.actions$.pipe(
        ofType(coreActions.getServiceCallHomeInfo),
        switchMap(() => {
            return this.homeService.getServiceCallHomeInfo().pipe(
                switchMap((resp: ServiceCallInfo) => [coreActions.getServiceCallHomeInfoSuccess({ resp })])
            )
        })
    ))
}