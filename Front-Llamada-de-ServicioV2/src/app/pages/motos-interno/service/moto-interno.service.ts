import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";

@Injectable({
    providedIn: 'root'
})

export class MotoInternoService {

    constructor(private http: HttpClient) { }

    searchInternMotorbike({ NameOrCode, Chasis, Motor, Serie, WhsCode }: { NameOrCode?: string, Chasis?: string, Motor?: string, Serie?: string, WhsCode: string }) {
        if (NameOrCode) {
            return this.http.get(`${environment.apiUrl}/searchInternMotorbike`, { params: { NameOrCode, WhsCode } }).pipe((response => response))
        } else if (Chasis) {
            return this.http.get(`${environment.apiUrl}/searchInternMotorbike`, { params: { Chasis, WhsCode } }).pipe((response => response))
        } else if (Motor) {
            return this.http.get(`${environment.apiUrl}/searchInternMotorbike`, { params: { Motor, WhsCode } }).pipe((response => response))
        } else {
            return this.http.get(`${environment.apiUrl}/searchInternMotorbike`, { params: { Serie, WhsCode } }).pipe((response => response))
        }
    }

    getHistoryFromIntr({ Chasis, Type }: { Chasis: string, Type: string }) {
        return this.http.get(`${environment.apiUrl}/getHistoryFromIntr`, { params: { Chasis, Type } }).pipe((response => response))
    }

    getServiceCallInfo() {
        return this.http.get(`${environment.apiUrl}/getServicerCallIntrInfo`).pipe((response => response))
    }

    getItems({ item, searchType, warehouse }: { item: string, searchType: string, warehouse: string }) {
        return this.http.get(`${environment.apiUrl}/getItems`, { params: { item, searchType, warehouse } })
            .pipe(map((response) => response))
    }
}