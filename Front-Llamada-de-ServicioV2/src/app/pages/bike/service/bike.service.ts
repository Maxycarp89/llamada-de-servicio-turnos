import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";
import { Service } from "../../motos/model/Service";
import { Marcas } from "src/store/bikes/BikeState";

@Injectable({
    providedIn: 'root'
})

export class BikeService {

    constructor(private http: HttpClient) { }

    searchBike({ DNI, Client, Serie, Cuadro }: { DNI?: string, Client?: string, Serie?: string, Cuadro?: string }) {
        if (DNI) {
            return this.http.get(`${environment.apiUrl}/searchCustomerBike`, { params: { DNI } }).pipe(map((response: any) => response))
        } else if (Client) {
            return this.http.get(`${environment.apiUrl}/searchCustomerBike`, { params: { Client } }).pipe(map((response: any) => response))
        } else if (Serie) {
            return this.http.get(`${environment.apiUrl}/searchCustomerBike`, { params: { Serie } }).pipe(map((response: any) => response))
        } else {
            return this.http.get(`${environment.apiUrl}/searchCustomerBike`, { params: { Cuadro } }).pipe(map((response: any) => response))
        }
    }

    getServiceCallBikeInfo() {
        return this.http.get(`${environment.apiUrl}/getServiceBikeInfo`).pipe((response => response))
    }

    getItemsInBike({ Search }: { Search: string }) {
        return this.http.get(`${environment.apiUrl}/getAllItems`, { params: { Search } }).pipe(map((response: any) => response))
    }

    getSpecificHistoryBike({ CustomerCode, ItemCode }: { CustomerCode: string, ItemCode: string }) {
        return this.http.get(`${environment.apiUrl}/getSpecificHistoryBike`, { params: { CustomerCode, ItemCode } }).pipe(map((response: any) => response))
    }

    getItemsFromExistOperationsInBike(ActivityCode: number) {
        return this.http.get(`${environment.apiUrl}/getItemsFromExistOperations`, {
            params: {
                ActivityCode
            }
        }).pipe(map((response: any) => response))
    }


    getItems({ item, searchType, warehouse }: { item: string, searchType: string, warehouse: string }) {
        return this.http.get(`${environment.apiUrl}/getItems`, { params: { item, searchType, warehouse } })
            .pipe(map((response) => response))
    }

    getMarcas() {
        return this.http.get<Marcas[]>(`${environment.apiUrl}/getMarcas`)
            .pipe(map((response) => response))
    }


    postServiceCallsBike(serviceBody: Service) {
        return this.http.post<Service[]>(`${environment.apiUrl}/postServiceCallBike`, serviceBody)
            .pipe(map((response: Service[]) => {
                return response
            }))
    }

    patchServiceCallsBike(serviceBody: Service) {
        return this.http.patch<Service[]>(`${environment.apiUrl}/patchServiceCallBike`, serviceBody)
            .pipe(map((response: any) => response))
    }

    getCombos({ CardCode }: { CardCode: string }) {
        return this.http.get(`${environment.apiUrl}/getCombosFromBike`, { params: { CardCode } })
            .pipe(map((response: any) => response))
    }

    shipmentEmision({ BPLName }: { BPLName: string }) {
        return this.http.get(`${environment.apiUrl}/shipmentEmision`, { params: { BPLName } })
            .pipe(map((response: any) => response))
    }
}