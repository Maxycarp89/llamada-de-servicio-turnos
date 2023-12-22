import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";
import { Service } from "../../motos/model/Service";

@Injectable({
    providedIn: 'root'
})

export class ServiceInternoService {

    constructor(private http: HttpClient) {

    }

    postServiceCallsInterno(serviceBody: any) {
        return this.http.post<Service[]>(`${environment.apiUrl}/postServiceCallInterno`, serviceBody)
            .pipe(map((response: Service[]) => response))
    }

    patchServiceCallsInterno(serviceBody: any) {
        return this.http.patch(`${environment.apiUrl}/patchServiceCallsInterno`, serviceBody)
            .pipe(map((response: Service[]) => response))
    }
}