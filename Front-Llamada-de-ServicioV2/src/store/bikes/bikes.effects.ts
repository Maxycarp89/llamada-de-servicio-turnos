import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, switchMap, of } from "rxjs";
import { BikeService } from "src/app/pages/bike/service/bike.service";
import { Store } from "@ngrx/store";
import * as bikeActions from "./bikes.action"
import { ToastService } from "src/app/core/services/toast.service";
import { hideLoading, showLoading } from "../loading/loading.actions";
import { ItemExistInService } from "src/app/pages/motos/model/Service";
import { MatDialog } from "@angular/material/dialog";
import { ServiceCallInfo } from "src/app/core/model/CoreTypes";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Marcas } from "./BikeState";

@Injectable()

export class BikeEffects {

    constructor(
        private actions$: Actions,
        private store: Store,
        private bikeService: BikeService,
        private toastService: ToastService,
        private modalService: NgbModal
    ) { }

    searchBike$ = createEffect(() => this.actions$.pipe(
        ofType(bikeActions.searchBikes),
        switchMap((payload: { DNI?: string, Client?: string, Serie?: string, Cuadro?: string }) => {
            this.store.dispatch(showLoading())
            return this.bikeService.searchBike({ ...payload }).pipe(
                switchMap((bikes: any) => {
                    this.store.dispatch(hideLoading())
                    return [bikeActions.searchBikesSuccess({ bikes })]
                }),
                catchError(() => {
                    this.store.dispatch(hideLoading())
                    return of(bikeActions.searchBikesFail({ error: "No se encontro dicha moto. Para corroborar que el cliente existe, se debe realizar una busqueda por DNI o C° del Cliente. Intentar buscar por algún otro dato porfavor." }));
                })
            )
        })
    ))

    getServiceCallBikeInfo$ = createEffect(() => this.actions$.pipe(
        ofType(bikeActions.getServiceCallBikeInfo),
        switchMap(() => {
            return this.bikeService.getServiceCallBikeInfo().pipe(
                switchMap((resp: ServiceCallInfo) => [bikeActions.getServiceCallInfoSuccess({ resp })])
            )
        })
    ))

    getItemsInBikes$ = createEffect(() => this.actions$.pipe(
        ofType(bikeActions.getItemsInBikes),
        switchMap((payload: { Search: string }) => {
            this.store.dispatch(showLoading())
            return this.bikeService.getItemsInBike({ Search: payload.Search }).pipe(
                switchMap((resp) => {
                    this.store.dispatch(hideLoading())
                    if (resp.length > 0) {
                        this.toastService.showSuccess("Éxito", `Item con el nombre/código: ${payload.Search} cargado con exitosamente.`)
                        return [bikeActions.getItemsInBikesSuccess({ resp })]
                    } else {
                        this.toastService.showWarning("Aviso", `No se encontraron: ${payload.Search}`)
                        return [bikeActions.getItemsInBikesSuccess({ resp })]
                    }
                }),
                catchError((error) => {
                    this.store.dispatch(hideLoading())
                    return [bikeActions.getItemsInBikesFail({ error: "No se encontro lo buscado." })]
                })
            )
        })
    ))

    getSpecificHistoryBike$ = createEffect(() => this.actions$.pipe(
        ofType(bikeActions.getSpecificHistoryBike),
        switchMap((payload: { CustomerCode: string, ItemCode: string }) => {
            this.store.dispatch(showLoading())
            return this.bikeService.getSpecificHistoryBike({ CustomerCode: payload.CustomerCode, ItemCode: payload.ItemCode }).pipe(
                switchMap((resp) => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showSuccess("Éxito", "Historial de servicios cargados exitosamente.")
                    return [bikeActions.getSpecificHistoryBikeSuccess({ resp })]
                }),
                catchError((error) => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showWarning("Aviso", "No se encontro un historial de service de la bicicleta seleccionada.")
                    this.store.dispatch(hideLoading())
                    return [bikeActions.getSpecificHistoryBikeFail({ error: "No se encontro un historial de service de la bicicleta seleccionada." })]
                })
            )
        })
    ))


    getItemsFromExistOperationsInBike$ = createEffect(() => this.actions$.pipe(
        ofType(bikeActions.getItemsFromExistOperationsInBike),
        switchMap((payload: { ActivityCode }) => {
            this.store.dispatch(showLoading())
            return this.bikeService.getItemsFromExistOperationsInBike(payload.ActivityCode).pipe(
                switchMap((resp: ItemExistInService[]) => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showSuccess("Éxito", "Items seleccionados para las operaciones de este service cargados con éxito")
                    return [bikeActions.getItemsFromExistOperationsInBikeSuccess({ resp })]
                }),
                catchError((error) => {
                    this.store.dispatch(hideLoading())
                    return [bikeActions.getItemsFromExistOperationsInBikeFail({ error })]
                })
            )
        })
    ))

    getItemsInBIke$ = createEffect(() => this.actions$.pipe(
        ofType(bikeActions.getOperationInBike),
        switchMap((payload: { item: string, searchType: string, warehouse: string }) => {
            this.store.dispatch(showLoading())
            return this.bikeService.getItems(payload).pipe(
                switchMap((items: any) => {
                    this.store.dispatch(hideLoading())
                    if (items.message && items.message.includes("No hay")) {
                        this.toastService.showWarning("Aviso", `No hay stock disponible de ${items.itemDescrip} (${items.itemCode}).`)
                        return [bikeActions.getOperationInBikeSuccess({ items: [] })]
                    } else if (items.length > 0) {
                        this.toastService.showSuccess("Éxito", `Items cargados exitosamente.`)
                        return [bikeActions.getOperationInBikeSuccess({ items })]
                    } else {
                        this.toastService.showSuccess("Aviso", `No se encontraron items en el inventario.`)
                        return [bikeActions.getOperationInBikeSuccess({ items })]
                    }
                }),
                catchError((error) => {
                    this.store.dispatch(hideLoading())
                    return of(bikeActions.getOperationInBikeFail({ error: "Ocurrio un problema al cargar el cliente. Esto se puede deber a que el cliente ya se haya cargado." }))
                })
            )
        })
    ))

    postServiceCallBike$ = createEffect(() => this.actions$.pipe(
        ofType(bikeActions.postServiceCallBike),
        switchMap((payload: { serviceBody: any }) => {
            this.store.dispatch(showLoading())
            return this.bikeService.postServiceCallsBike(payload.serviceBody).pipe(
                switchMap((resp) => {
                    this.store.dispatch(hideLoading())
                    this.modalService.dismissAll()
                    this.toastService.showSuccess("Éxito", "Llamada de servicio cargada correctamente!.")
                    return [bikeActions.postServiceCallBikeSuccess({ resp })]
                }),
                catchError((errorResp) => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showError("Falló", "Ocurrió un problema al intentar crear la llamada de servicio. Verifique que los datos se hayan cargado correctamente")
                    return [bikeActions.postServiceCallBikeFail({ errorResp })]
                })
            )
        })
    ))

    patchServiceCallBike$ = createEffect(() => this.actions$.pipe(
        ofType(bikeActions.patchServiceCallBike),
        switchMap((payload: { serviceBody: any }) => {
            this.store.dispatch(showLoading())
            return this.bikeService.patchServiceCallsBike(payload.serviceBody).pipe(
                switchMap((resp: any) => {
                    this.store.dispatch(hideLoading())
                    if (resp.msg) {
                        this.toastService.showWarning("Avisó", `${resp.msg}`)
                        return [bikeActions.patchServiceCallBikeSuccess({ resp })]
                    }
                    this.modalService.dismissAll()
                    this.toastService.showSuccess("Éxito", "Llamada de servicio cargada correctamente!.")
                    return [bikeActions.patchServiceCallBikeSuccess({ resp })]
                }),
                catchError((errorResp) => {
                    this.toastService.showError("Falló", "Ocurrió un problema al intentar crear la llamada de servicio. Verifique que los datos se hayan cargado correctamente")
                    return [bikeActions.patchServiceCallBikeFail({ errorResp })]
                })
            )
        })
    ))

    getCombos$ = createEffect(() => this.actions$.pipe(
        ofType(bikeActions.getCombos),
        switchMap((payload: { CardCode: string }) => {
            return this.bikeService.getCombos({ CardCode: payload.CardCode }).pipe(
                switchMap((resp) => {
                    if (resp.msg) {
                        this.toastService.showWarning("Aviso", "No se encontraron combos facturados a nombre del cliente.")
                        return [bikeActions.getCombosSuccess({ resp: [] })]
                    } else {
                        this.toastService.showSuccess("Éxito", "Combos del cliente cargados exitosamente")
                        return [bikeActions.getCombosSuccess({ resp })]
                    }
                })
            )
        })
    ))

    getMarcas$ = createEffect(() => this.actions$.pipe(
        ofType(bikeActions.getMarcas),
        switchMap(() => {
            this.store.dispatch(showLoading())
            return this.bikeService.getMarcas().pipe(
                switchMap((resp: Marcas[]) => {
                    this.store.dispatch(hideLoading())
                    return [bikeActions.getMarcasSuccess({ resp })]
                }),
                catchError(() => {
                    this.store.dispatch(hideLoading())
                    return []
                })
            )
        })
    ))
}