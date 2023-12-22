import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, } from "rxjs/operators";
import { of } from "rxjs";
import { MotosService } from "src/app/pages/motos/service/motos.service";
import { CustomerService } from "src/app/pages/motos/service/customer.service";
import { ServicesService } from "src/app/pages/motos/service/services.service";
import { Store } from "@ngrx/store";
import { search, searchSuccess, searchFail, createCustomer, createCustomerSuccess, createCustomerFail, getHistory, getHistorySuccess, clearHistoryService, getItems, getItemsSuccess, getItemsFail, getServiceCallInfo, getServiceCallInfoSuccess, postServiceCalls, postServiceCallsSuccess, postServiceCallsFail, getMotorbikeByBrandAndModel, getMotorbikeByBrandAndModelSuccess, getMotorbikeByBrandAndModelFail, getItemsFromExistOperations, getItemsFromExistOperationsSuccess, getItemsFromExistOperationsFail, patchServiceCalls, patchServiceCallsSuccess, patchServiceCallsFail, getSpecificHistoryService, getSpecificHistoryServiceSuccess, getCombos, getCombosSuccess, ownershipChange, ownershipChangeSuccess, ownershipChangeFail } from "./motos.action";
import { showLoading, hideLoading } from "../loading/loading.actions";
import { CustomerMotorbike } from "src/app/pages/motos/model/CustomerMotorbike";
import { ToastService } from "src/app/core/services/toast.service";
import { BrandAndModel, ItemExistInService, Service } from "src/app/pages/motos/model/Service";
import { ServiceCallInfo } from "src/app/core/model/CoreTypes";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable()

export class MotosEffects {

    constructor(
        private actions$: Actions,
        private store: Store,
        private motosService: MotosService,
        private customerService: CustomerService,
        private servicesService: ServicesService,
        private toastService: ToastService,
        private modalService: NgbModal
    ) { }

    search$ = createEffect(() => this.actions$.pipe(
        ofType(search),
        switchMap((payload: { DNI?: string, Client?: string, Chasis?: string, Motor?: string, ClientName?: string, Serie?: string }) => {
            this.store.dispatch(showLoading())
            return this.motosService.searchCustomerMotorbike({ ...payload }).pipe(
                switchMap((motos: CustomerMotorbike[]) => {
                    this.store.dispatch(hideLoading())
                    return [searchSuccess({ motos })]
                }),
                catchError(() => {
                    this.store.dispatch(hideLoading())
                    return of(searchFail({ error: "No se encontro dicha moto. Para corroborar que el cliente existe, se debe realizar una busqueda por DNI o C° del Cliente. Intentar buscar por algún otro dato porfavor." }));
                })
            )
        })
    ))

    createCustomer$ = createEffect(() => this.actions$.pipe(
        ofType(createCustomer),
        switchMap((payload) => {
            this.store.dispatch(showLoading())
            return this.customerService.createCustomer(payload).pipe(
                switchMap(newClient => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showSuccess("Éxito", "Cliente cargado exitosamente!.")
                    this.modalService.dismissAll()
                    return [createCustomerSuccess({ newClient })]
                }),
                catchError(() => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showError("Falló", "Ocurrió un problema al cargar el cliente. Controle que los datos esten bien cargados")
                    return of(createCustomerFail({
                        error: "Ocurrio un problema al cargar el cliente. Esto se puede deber a que el cliente ya se haya cargado."
                    }))
                })
            )

        })
    ))

    getHistory$ = createEffect(() => this.actions$.pipe(
        ofType(getHistory),
        switchMap((payload: { CustomerCode: string, SpecialSearch?: string }) => {
            this.store.dispatch(showLoading())
            this.store.dispatch(clearHistoryService())
            if (!payload.SpecialSearch) {
                return this.servicesService.getHistoryService(payload.CustomerCode).pipe(
                    switchMap((history: Service[]) => {
                        this.store.dispatch(hideLoading())
                        this.toastService.showSuccess("Éxito", "Historial cargado correctamente!.")
                        return [getHistorySuccess({ history })]
                    }),
                )
            } else {
                return this.servicesService.getHistoryService(payload.CustomerCode, payload.SpecialSearch).pipe(
                    switchMap((history: Service[]) => {
                        this.store.dispatch(hideLoading())
                        this.toastService.showSuccess("Éxito", "Historial cargado correctamente!.")
                        return [getHistorySuccess({ history })]
                    }),
                )
            }
        })
    ))

    getSpecificHistoryService$ = createEffect(() => this.actions$.pipe(
        ofType(getSpecificHistoryService),
        switchMap((payload: { CustomerCode: string, Chasis: string }) => {
            this.store.dispatch(showLoading())
            this.store.dispatch(clearHistoryService())
            return this.servicesService.getSpecificHistoryService(payload.CustomerCode, payload.Chasis, 'MOTO').pipe(
                switchMap((history: Service[]) => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showSuccess("Éxito", "Historial cargado correctamente!.")
                    return [getSpecificHistoryServiceSuccess({ history })]
                }),
            )
        })
    ))

    getItems$ = createEffect(() => this.actions$.pipe(
        ofType(getItems),
        switchMap((payload: { item: string, searchType: string, warehouse: string }) => {
            this.store.dispatch(showLoading())
            return this.motosService.getItems(payload).pipe(
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

    getServiceCallInfo$ = createEffect(() => this.actions$.pipe(
        ofType(getServiceCallInfo),
        switchMap(() => {
            return this.motosService.getServiceCallInfo().pipe(
                switchMap((resp: ServiceCallInfo) => [getServiceCallInfoSuccess({ resp })])
            )
        })
    ))

    postServiceCall$ = createEffect(() => this.actions$.pipe(
        ofType(postServiceCalls),
        switchMap((payload: { serviceBody: any }) => {
            this.store.dispatch(showLoading())
            return this.servicesService.postServiceCalls(payload.serviceBody).pipe(
                switchMap((resp: any) => {
                    this.store.dispatch(hideLoading())
                    if (resp.msg) {
                        this.toastService.showWarning("Avisó", `${resp.msg}`)
                        return [postServiceCallsSuccess({ resp })]
                    } else {
                        this.modalService.dismissAll()
                        this.toastService.showSuccess("Éxito", "Llamada de servicio cargada correctamente!.")
                        return [postServiceCallsSuccess({ resp })]
                    }
                }),
                catchError((errorResp) => {
                    this.store.dispatch(hideLoading())
                    this.toastService.showError("Falló", "Ocurrió un problema al intentar crear la llamada de servicio. Verifique que los datos se hayan cargado correctamente")
                    return [postServiceCallsFail({ errorResp })]
                })
            )
        })
    ))

    getMotorbikeByBrandAndModel$ = createEffect(() => this.actions$.pipe(
        ofType(getMotorbikeByBrandAndModel),
        switchMap((payload: { brand: string, model: string }) => {
            this.store.dispatch(showLoading())
            return this.motosService.getMotorbikesByBrandAndModel({ brand: payload.brand, model: payload.model }).pipe(
                switchMap((resp: BrandAndModel[]) => {
                    this.store.dispatch(hideLoading())
                    if (resp.length > 0) {
                        this.toastService.showSuccess("Éxito", `Motos con la marca ${payload.brand} y el modelo ${payload.model} cargadas exitosamente.`)
                        return [getMotorbikeByBrandAndModelSuccess({ resp })]
                    } else {
                        this.toastService.showWarning("Aviso", "No se encontraron motos con esa marca y modelo")
                        return [getMotorbikeByBrandAndModelSuccess({ resp: [] })]
                    }
                }),
                catchError((errorResp) => {
                    this.store.dispatch(hideLoading())
                    return [getMotorbikeByBrandAndModelFail({ errorResp })]
                })
            )
        })
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

    patchServiceCalls$ = createEffect(() => this.actions$.pipe(
        ofType(patchServiceCalls),
        switchMap((payload: { serviceBody: Service }) => {
            this.store.dispatch(showLoading())
            return this.servicesService.patchServiceCalls(payload.serviceBody).pipe(
                switchMap((resp: any) => {
                    this.store.dispatch(hideLoading())
                    if (resp.msg) {
                        this.toastService.showWarning("Avisó", `${resp.msg}`)
                        return [patchServiceCallsSuccess({ resp })]
                    }
                    this.modalService.dismissAll()
                    this.toastService.showSuccess("Éxito", `Service con el ID ${payload.serviceBody.ServiceCallID} editado exitosamente.`)
                    return [patchServiceCallsSuccess({ resp })]
                }),
                catchError((errorResp) => {
                    this.store.dispatch(hideLoading())
                    return [patchServiceCallsFail({ errorResp })]
                })
            )
        })
    ))

    getCombos$ = createEffect(() => this.actions$.pipe(
        ofType(getCombos),
        switchMap((payload: { CardCode: string }) => {
            return this.motosService.getCombos({ CardCode: payload.CardCode }).pipe(
                switchMap((resp) => {
                    if (resp.msg) {
                        this.toastService.showWarning("Aviso", "No se encontraron combos facturados a nombre del cliente.")
                        return [getCombosSuccess({ resp: [] })]
                    } else {
                        this.toastService.showSuccess("Éxito", "Combos del cliente cargados exitosamente")
                        return [getCombosSuccess({ resp })]
                    }
                })
            )
        })
    ))

    ownershipChange$ = createEffect(() => this.actions$.pipe
        (
            ofType(ownershipChange),
            switchMap((payload: { newOwner: any }) => {
                this.store.dispatch(showLoading())
                return this.customerService.ownershipChange(payload.newOwner).pipe(
                    switchMap((resp) => {
                        this.store.dispatch(hideLoading())
                        console.log(resp)
                        return [ownershipChangeSuccess({ resp })]
                    }),
                    catchError((error) => {
                        console.log(error)
                        this.store.dispatch(hideLoading())
                        return [ownershipChangeFail({ error })]
                    })
                )
            })
        ))
}