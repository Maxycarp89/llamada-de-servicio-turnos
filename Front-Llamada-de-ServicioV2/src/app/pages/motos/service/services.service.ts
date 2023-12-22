import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";
import { Service } from "../model/Service";

@Injectable({
    providedIn: 'root'
})

export class ServicesService {

    constructor(private http: HttpClient) {
    }

    getHistoryService(CustomerCode: string, SpecialSearch?: string) {
        if (SpecialSearch) {
            return this.http.get<Service[]>(`${environment.apiUrl}/getHistoryService`, { params: { CustomerCode, SpecialSearch } })
                .pipe(map((response: Service[]) => response))
        } else {
            return this.http.get<Service[]>(`${environment.apiUrl}/getHistoryService`, { params: { CustomerCode } })
                .pipe(map((response: Service[]) => response))
        }
    }

    getSpecificHistoryService(CustomerCode: string, Chasis: string, Type: string) {
        return this.http.get<Service[]>(`${environment.apiUrl}/getSpecificHistoryService`, { params: { CustomerCode, Chasis, Type } })
            .pipe(map((response: Service[]) => response))
    }

    postServiceCalls(serviceBody: Service) {
        return this.http.post<Service[]>(`${environment.apiUrl}/postServiceCalls`, serviceBody)
            .pipe(map((response: Service[]) => response))
    }

    getItemsFromExistOperations(ActivityCode: number) {
        return this.http.get(`${environment.apiUrl}/getItemsFromExistOperations`, {
            params: {
                ActivityCode
            }
        }).pipe(map((response: any) => response))
    }

    patchServiceCalls(serviceBody: Service) {
        return this.http.patch(`${environment.apiUrl}/patchServiceCalls`, serviceBody, { params: { ID: serviceBody.ServiceCallID } })
            .pipe(map((response: Service[]) => {
                return response;
            }))
    }

    servicePDF({ DocEntry }: { DocEntry: number }) {
        return this.http.post(`${environment.apiUrl}/upPDF`, { DocEntry })
            .pipe(map((response: any) => {
                return response;
            }))
    }
}