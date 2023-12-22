import { createAction, props } from '@ngrx/store';
import { Service } from 'src/app/pages/motos/model/Service';

export const getHistoryFromDashboard = createAction("[Dashboard] history", props<{ historyBody: { frDate: string, ltDate: string, type: string } }>())
export const getHistoryFromDashboardSuccess = createAction("[Dashboard] history success", props<{ resp: Service[] }>())
export const getHistoryFromDashboardFail = createAction("[Dashboard] history fail", props<{ error: any }>())