import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";
import { CustomerMotorbike } from "../model/CustomerMotorbike";

@Injectable({
    providedIn: 'root'
})

export class MotosService {

    constructor(private http: HttpClient) { }

    searchCustomerMotorbike({ Client, DNI, Chasis, Motor, Serie, ClientName }: { Client?: string | undefined, DNI?: string | undefined, Chasis?: string | undefined, Motor?: string | undefined, Serie?: string | undefined, ClientName?: string | undefined }) {
        if (Client) {
            return this.http.get<CustomerMotorbike[]>(`${environment.apiUrl}/searchCustomerMotorbike`, { params: { Client } })
                .pipe(map((response: CustomerMotorbike[]) => response))
        } else if (DNI) {
            return this.http.get<CustomerMotorbike[]>(`${environment.apiUrl}/searchCustomerMotorbike`, { params: { DNI } })
                .pipe(map((response: CustomerMotorbike[]) => response))
        } else if (Chasis) {
            return this.http.get<CustomerMotorbike[]>(`${environment.apiUrl}/searchCustomerMotorbike`, { params: { Chasis } })
                .pipe(map((response: CustomerMotorbike[]) => response))
        } else if (Motor) {
            return this.http.get<CustomerMotorbike[]>(`${environment.apiUrl}/searchCustomerMotorbike`, { params: { Motor } })
                .pipe(map((response: CustomerMotorbike[]) => response))
        } else if (ClientName) {
            return this.http.get<CustomerMotorbike[]>(`${environment.apiUrl}/searchCustomerMotorbike`, { params: { ClientName } })
                .pipe(map((response: CustomerMotorbike[]) => response))
        } else {
            return this.http.get<CustomerMotorbike[]>(`${environment.apiUrl}/searchCustomerMotorbike`, { params: { Serie } })
                .pipe(map((response: CustomerMotorbike[]) => response))
        }
    }

    getItems({ item, searchType, warehouse }: { item: string, searchType: string, warehouse: string }) {
        return this.http.get(`${environment.apiUrl}/getItems`, { params: { item, searchType, warehouse } })
            .pipe(map((response) => response))
    }

    getServiceCallInfo() {
        return this.http.get(`${environment.apiUrl}/getServiceCallInfo`)
            .pipe(map((response) => response))
    }

    getMotorbikesByBrandAndModel({ brand, model }: { brand: string, model: string }) {
        return this.http.get(`${environment.apiUrl}/searchByBrandAndModel`, { params: { brand: brand.toUpperCase(), model: model.toUpperCase() } }).pipe(map((response) => response))
    }

    getCombos({ CardCode }: { CardCode: string }) {
        return this.http.get(`${environment.apiUrl}/getCombos`, { params: { CardCode } })
            .pipe(map((response: any) => response))
    }

    shipmentEmision({ BPLName }: { BPLName: string }) {
        return this.http.get(`${environment.apiUrl}/shipmentEmision`, { params: { BPLName } })
            .pipe(map((response: any) => response))
    }
}