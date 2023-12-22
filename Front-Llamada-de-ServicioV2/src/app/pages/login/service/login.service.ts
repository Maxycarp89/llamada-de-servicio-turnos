import { Injectable } from "@angular/core";
import { Observable, of, map } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environment";
import { Offices } from "src/store/login/LoginState";

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private headers!: HttpHeaders

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json')
    }

    login({ UserName, Password }: { UserName: string, Password: string }) {
        return this.http.post(`${environment.apiUrl}/login`, { UserName, Password })
            .pipe(map((response) => {
                return response
            }))
    }

    relogin({ UserName }: { UserName: string }) {
        return this.http.post(`${environment.apiUrl}/loginAgain`, { UserName })
            .pipe(map((response) => {
                return response
            }))
    }

    getOffices({ UserName }: { UserName: string }) {
        return this.http.get<any>(`${environment.apiUrl}/sucursales`, { params: { UserName } })
            .pipe(map((response: Offices[]) => {
                return response
            }))
    }

    getAsigneeCode({ UserName }: { UserName: string }) {
        return this.http.post(`${environment.apiUrl}/getAsigneeCode`, { User: UserName })
            .pipe(map((response) => {
                return response
            }))
    }

    getPTICode({ UserCode, Warehouse }: { UserCode: string, Warehouse: number }) {
        return this.http.get(`${environment.apiUrl}/usuarioPtoEmision`, { params: { UserCode, Warehouse } })
            .pipe(map((response) => {
                return response[0]
            }))
    }

    logout(): Observable<void> {
        return of(undefined);
    }
}