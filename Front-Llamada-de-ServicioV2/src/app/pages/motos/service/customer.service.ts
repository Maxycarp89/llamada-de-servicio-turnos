import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment";
import { NewClient } from "../model/NewClient";

@Injectable({
    providedIn: 'root'
})

export class CustomerService {

    constructor(private http: HttpClient) {
    }

    createCustomer(customerBody: NewClient) {
        return this.http.post<{ resp: string }>(`${environment.apiUrl}/createClient`, customerBody)
            .pipe(map((response: { resp: string }) => response))
    }

    getBussinessPartner(Search: string) {
        return this.http.get(`${environment.apiUrl}/getBussinessPartner`, { params: { Search } })
            .pipe(map((response: any) => response))
    }
    ownershipChange(newOwner: any) {
        return this.http.patch(`${environment.apiUrl}/ownershipChange`, newOwner)
            .pipe(map((response: any) => response))
    }
}
