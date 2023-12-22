import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LoginState } from "src/store/login/LoginState";
import { AppState } from "src/store/AppState";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    store: Store<AppState> = inject(Store)
    loginState!: LoginState

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.store.select('login').subscribe((loginState) => this.loginState = loginState)
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') })
        request = request.clone({ headers: request.headers.set('Authorization', `${this.loginState.token}`) })
        return next.handle(request)
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}