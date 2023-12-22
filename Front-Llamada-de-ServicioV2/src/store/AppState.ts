
import { LoadingState } from "./loading/LoadingState";
import { LoginState } from "./login/LoginState";
import { MotosState } from "./motos/motosState";
import { MotoInternoState } from "./moto-interno/MotoInternoState";
import { BikeState } from "./bikes/BikeState";
import { DashboardState } from "./dashboard/DashboardState";
import { HogarState } from "./hogar/HogarState";
import { GarantiaMotoState } from "./garantía-motos/GarantiaMotosState";
import { CoreState } from "./core/CoreState";

export interface AppState {
    core: CoreState,
    loading: LoadingState,
    login: LoginState,
    motos: MotosState,
    motoInterno: MotoInternoState,
    bikes: BikeState,
    dashboard: DashboardState,
    hogar: HogarState,
    garantia: GarantiaMotoState
}