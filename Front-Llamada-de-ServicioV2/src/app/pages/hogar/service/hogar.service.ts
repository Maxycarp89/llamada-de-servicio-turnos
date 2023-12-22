import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";
import { Service } from "../../motos/model/Service";

@Injectable({
    providedIn: 'root'
})

export class HogarService {

    constructor(private http: HttpClient) { }

    searchHomeItem({ NameOrCode, Client, DNI }: { NameOrCode?: string, Client?: string, DNI?: string }) {
        if (NameOrCode) return this.http.get(`${environment.apiUrl}/searchHomeItem`, { params: { NameOrCode } }).pipe(map((response: any) => response))
        else if (Client) return this.http.get(`${environment.apiUrl}/searchHomeItem`, { params: { Client } }).pipe(map((response: any) => response))
        else return this.http.get(`${environment.apiUrl}/searchHomeItem`, { params: { DNI } }).pipe(map((response: any) => response))
    }

    getServiceCallHomeInfo() {
        return this.http.get(`${environment.apiUrl}/getServiceCallHome`).pipe((response => response))
    }

    getCustomerSeller({ CardCode }: { CardCode: string }) {
        return this.http.get(`${environment.apiUrl}/getCustomerSeller`, { params: { CardCode } }).pipe((response => response))
    }

    getSecondWarehouse({ WhsCode, BPLId }: { WhsCode: string, BPLId: number }) {
        return this.http.get(`${environment.apiUrl}/getFriendsWarehouse`, { params: { WhsCode, BPLId } }).pipe((response => response))
    }

    getItemInStock({ WhsCode, NameOrCode }: { WhsCode: string, NameOrCode: string }) {
        return this.http.get(`${environment.apiUrl}/getItemInStockHA`, { params: { WhsCode, NameOrCode } }).pipe((response => response))
    }

    postServiceCallsHome(serviceBody: any) {
        return this.http.post<Service[]>(`${environment.apiUrl}/postServiceCallsHome`, serviceBody)
            .pipe(map((response: Service[]) => {
                console.log(response)
                return response
            }))
    }

    patchServiceCallsHome(serviceBody: any) {
        return this.http.patch<Service[]>(`${environment.apiUrl}/patchServiceCallsHome`, serviceBody)
            .pipe(map((response: Service[]) => {
                console.log(response)
                return response
            }))
    }

    getHistoryFromHomeService({ CustomerCode, ItemCode, Type }: { CustomerCode: string, ItemCode: string, Type: string }) {
        return this.http.get(`${environment.apiUrl}/getHistoryFromHomeService`, { params: { CustomerCode, ItemCode, Type } }).pipe(map((response) => response))
    }

    getItemExistInTransfer(ActivityCode: number) {
        return this.http.get(`${environment.apiUrl}/getItemExistInTransfer`, { params: { ActivityCode } }).pipe(map((response: any) => response))
    }
}