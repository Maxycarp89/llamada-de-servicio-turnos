import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { Store } from "@ngrx/store"
import { of, switchMap, take } from "rxjs"

export const authGuard = (type: string | number) => {
    const store = inject(Store)
    const router = inject(Router)

    return store.select('login').pipe(
        take(1),
        switchMap(loginState => {
            if (loginState.isLoggedIn && type === "Guide") return of(true)
            if (loginState.isLoggedIn && type === 'Dashboard') return of(true)
            const trueRol = loginState.rol.length > 0 ? loginState.rol.filter((e: any) => e.name === type || e.position === type) : []
            if (loginState.isLoggedIn && trueRol.length > 0) return of(true)
            router.navigateByUrl('login');
            return of(false);
        })
    )
}