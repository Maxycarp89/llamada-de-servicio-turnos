import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";
import { CustomerMotorbike } from "../../motos/model/CustomerMotorbike";
import { Service } from "../../motos/model/Service";

@Injectable({
    providedIn: 'root'
})

export class WarrantyService {

    constructor(private http: HttpClient) { }

    searchCustomerMotorbike({ Client, DNI, Chasis, Motor, Serie, ClientName, WhsCode }: { Client?: string | undefined, DNI?: string | undefined, Chasis?: string | undefined, Motor?: string | undefined, Serie?: string | undefined, ClientName?: string | undefined, WhsCode: string }) {
        if (Client) {
            return this.http.get<CustomerMotorbike[]>(`${environment.apiUrl}/searchCustomerToWarranty`, { params: { Client, WhsCode } })
                .pipe(map((response: CustomerMotorbike[]) => response))
        } else if (DNI) {
            return this.http.get<CustomerMotorbike[]>(`${environment.apiUrl}/searchCustomerToWarranty`, { params: { DNI, WhsCode } })
                .pipe(map((response: CustomerMotorbike[]) => response))
        } else if (Chasis) {
            return this.http.get<CustomerMotorbike[]>(`${environment.apiUrl}/searchCustomerToWarranty`, { params: { Chasis, WhsCode } })
                .pipe(map((response: CustomerMotorbike[]) => response))
        } else if (Motor) {
            return this.http.get<CustomerMotorbike[]>(`${environment.apiUrl}/searchCustomerToWarranty`, { params: { Motor, WhsCode } })
                .pipe(map((response: CustomerMotorbike[]) => response))
        } else if (ClientName) {
            return this.http.get<CustomerMotorbike[]>(`${environment.apiUrl}/searchCustomerToWarranty`, { params: { ClientName, WhsCode } })
                .pipe(map((response: CustomerMotorbike[]) => response))
        } else {
            return this.http.get<CustomerMotorbike[]>(`${environment.apiUrl}/searchCustomerToWarranty`, { params: { Serie, WhsCode } })
                .pipe(map((response: CustomerMotorbike[]) => response))
        }
    }

    warrantyServiceCallInfo() {
        return this.http.get(`${environment.apiUrl}/warrantyServiceCallInfo`).pipe((response => response))
    }

    postServiceWarranty(serviceBody: any) {
        return this.http.post<Service[]>(`${environment.apiUrl}/postServiceWarranty`, serviceBody).pipe((response => response))
    }

    getHistoryFromWarranty({ CustomerCode }: { CustomerCode: string }) {
        return this.http.get(`${environment.apiUrl}/getHistoryFromWarranty`, { params: { CustomerCode } }).pipe((response => response))
    }

    getTransferToWarranty({ Warehouse }: { Warehouse: string }) {
        return this.http.get(`${environment.apiUrl}/getTransferToWarranty`, { params: { Warehouse } })
            .pipe(map((response) => response))
    }

    getItems({ item, searchType, warehouse }: { item: string, searchType: string, warehouse: string }) {
        return this.http.get(`${environment.apiUrl}/getItems`, { params: { item, searchType, warehouse } })
            .pipe(map((response) => response))
    }

    getSecondWarehouse({ WhsCode, BPLId }: { WhsCode: string, BPLId: number }) {
        return this.http.get(`${environment.apiUrl}/getFriendsWarehouse`, { params: { WhsCode, BPLId } }).pipe((response => response))
    }

    getItemInStock({ WhsCode, NameOrCode }: { WhsCode: string, NameOrCode: string }) {
        return this.http.get(`${environment.apiUrl}/getItemInStockHA`, { params: { WhsCode, NameOrCode } }).pipe((response => response))
    }

    getCustomerSeller({ CardCode }: { CardCode: string }) {
        return this.http.get(`${environment.apiUrl}/getCustomerSeller`, { params: { CardCode } }).pipe((response => response))
    }

    getMotorbikeSeries({ ItemCode, WhsCode }: { ItemCode: string, WhsCode: string }) {
        return this.http.get(`${environment.apiUrl}/getMotorbikeSeries`, { params: { ItemCode, WhsCode } }).pipe((response => response))
    }

    patchWarrantyService(serviceBody: any) {
        console.log(serviceBody)
        return this.http.patch(`${environment.apiUrl}/patchWarrantyService`, serviceBody)
            .pipe((response => {
                console.log(response)
                return response
            }))
    }
}