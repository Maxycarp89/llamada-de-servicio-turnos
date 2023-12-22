import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    constructor(private http: HttpClient) { }

    historyServiceInDashboard({ frDate, ltDate, type, asigneeCode }: { frDate: string, ltDate: string, type: string, asigneeCode: number }) {
        return this.http.post(`${environment.apiUrl}/historyServiceInDashboard`, { frDate, ltDate, type, asigneeCode })
            .pipe(map((response) => response))
    }

}