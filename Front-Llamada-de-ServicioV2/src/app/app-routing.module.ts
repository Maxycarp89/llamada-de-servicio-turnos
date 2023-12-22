import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoadingComponent } from './core/components/loading/loading.component';
import { MotosComponent } from './pages/motos/motos.component';
import { MotosInternoComponent } from './pages/motos-interno/motos-interno.component';
import { HogarComponent } from './pages/hogar/hogar.component';
import { BikeComponent } from './pages/bike/bike.component';
import { GarantíaMotosComponent } from './pages/garantia-motos/garantia-motos.component';
import { DashboardWarrantyComponent } from './features/dashboard/dashboard-garantia/dashboard-garantia.component';
import {TurnosComponent} from './pages/turnos/turnos.component'
import { LandingServiceComponent } from './pages/landing-service/landing-service.component';

import { GuideComponent } from './pages/guide/guide.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [() => authGuard('Dashboard')],
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'guide',
    canActivate: [() => authGuard('Guide')],
    component: GuideComponent,
    data: { title: 'Guía básica' }
  },
  {
    path: 'motos',
    canActivate: [() => authGuard('Motos')],
    component: MotosComponent,
    data: { title: 'Motos' }
  },
  {
    path: 'motos-interno',
    canActivate: [() => authGuard('Motos')],
    component: MotosInternoComponent,
    data: { title: 'Motos Interno' }
  },
  {
    path: 'hogar',
    canActivate: [() => authGuard('Hogar')],
    component: HogarComponent,
    data: { title: 'Hogar' }
  },
  {
    path: 'bikes',
    canActivate: [() => authGuard('Bikes')],
    component: BikeComponent,
    data: { title: 'Bikes' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'loading',
    component: LoadingComponent,
    data: { title: 'Loading' }
  },
  {
    path: 'dashboard-garantia',
    canActivate: [() => authGuard('Motos')],
    component: DashboardWarrantyComponent,
    data: { title: 'Dashboard - Garantía' }
  },
  {
    path: "garantia-motos",
    canActivate: [() => authGuard('Motos')],
    component: GarantíaMotosComponent,
    data: { title: "Garantía - Motos" }
  },

  {
    path:"turnos",
    canActivate:[authGuard],
    component:TurnosComponent,
    data: {title:"Dashboard - Turnos"}
  },
  {
      path:"landing-service",
      component:LandingServiceComponent,
      data: {title:"Landing Service"}
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
