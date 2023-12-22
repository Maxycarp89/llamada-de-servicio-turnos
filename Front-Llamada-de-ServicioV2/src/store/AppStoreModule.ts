import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from "ngrx-store-localstorage";
import { EffectsModule } from '@ngrx/effects';

//? --- Reducers:
import { coreReducer } from './core/core.reducer';
import { loginReducer } from './login/login.reducer';
import { loadingReducer } from './loading/loading.reducers';
import { motosReducer } from './motos/motos.reducer';
import { motoInternoReducer } from './moto-interno/moto-interno.reducer';
import { bikesReducer } from './bikes/bikes.reducer';
import { dashboardReducer } from './dashboard/dashboard.reducer';
import { hogarReducer } from './hogar/hogar.reducer';
import { warrantyReducer } from './garantía-motos/garantia-motos.reducer';

//? -- Effects:
import { CoreEffects } from './core/core.effects';
import { LoginEffects } from './login/login.effects';
import { MotosEffects } from './motos/motos.effects';
import { MotoInternoEffects } from './moto-interno/moto-interno.effects';
import { BikeEffects } from './bikes/bikes.effects';
import { DashboardEffects } from './dashboard/dashboard.effects';
import { HogarEffects } from './hogar/hogar.effects';
import { GarantiaMotoEffects } from './garantía-motos/garantia-motos.effects';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: ["login"], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<any>[] = [
    localStorageSyncReducer
];

export const AppStoreModule = [
    StoreModule.forRoot({}, { metaReducers }),
    StoreModule.forFeature("core", coreReducer),
    StoreModule.forFeature("login", loginReducer),
    StoreModule.forFeature("loading", loadingReducer),
    StoreModule.forFeature("motos", motosReducer),
    StoreModule.forFeature("motoInterno", motoInternoReducer),
    StoreModule.forFeature("bikes", bikesReducer),
    StoreModule.forFeature("dashboard", dashboardReducer),
    StoreModule.forFeature("hogar", hogarReducer),
    StoreModule.forFeature("garantia", warrantyReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([CoreEffects, LoginEffects, MotosEffects, MotoInternoEffects, BikeEffects, DashboardEffects, HogarEffects, GarantiaMotoEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
];