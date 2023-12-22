import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, switchMap, of, Observable } from "rxjs";
import { DashboardService } from "src/app/pages/dashboard/service/dashboard.service";
import { Store, select } from "@ngrx/store";
import * as dashboardActions from "./dashboard.action"
import { showLoading, hideLoading } from "../loading/loading.actions";
import { AppState } from "../AppState";
import { Service } from "src/app/pages/motos/model/Service";
import { ToastService } from "src/app/core/services/toast.service";

@Injectable()

export class DashboardEffects {
    asigneeCode$!: Observable<number>
    assigneeCode!: number

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private dashboardService: DashboardService,
        private toastService: ToastService
    ) {
        this.asigneeCode$ = this.store.pipe(select(state => state.login.asigneeCode))
        this.asigneeCode$.subscribe(state => this.assigneeCode = state)
    }


    getHistoryFromDashboard$ = createEffect(() => this.actions$.pipe(
        ofType(dashboardActions.getHistoryFromDashboard),
        switchMap((payload: { historyBody: { frDate: string, ltDate: string, type: string } }) => {
            this.store.dispatch(showLoading())
            return this.dashboardService.historyServiceInDashboard({ ...payload.historyBody, asigneeCode: this.assigneeCode }).pipe(
                switchMap((resp: Service[]) => {
                    this.store.dispatch(hideLoading())
                    if (!resp.length) {
                        this.toastService.showWarning("Aviso", "No se encontraron service en ese rango de fechas.")
                        return [dashboardActions.getHistoryFromDashboardSuccess({ resp: [] })]
                    } else {
                        this.toastService.showSuccess("Éxito", "Service cargados exitosamente.")
                        return [dashboardActions.getHistoryFromDashboardSuccess({ resp })]
                    }
                }),
                catchError((error) => {
                    this.store.dispatch(hideLoading())
                    return [dashboardActions.getHistoryFromDashboardFail({ error })]
                })
            )
        })
    ))

}