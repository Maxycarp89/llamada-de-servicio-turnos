import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"
import { ToastsContainerComponent } from './components/toasts-container/toasts-container.component';

import { ComponentsContainer } from './app.container';

import { AppStoreModule } from 'src/store/AppStoreModule';
import { CoreModule } from './core/core.module';
import { MaterialModule } from 'src/assets/material.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthInterceptorProvider } from './interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ...ComponentsContainer
  ],
  imports: [
    ...MaterialModule,
    ...AppStoreModule,
    NgbPaginationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastsContainerComponent,
    CoreModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [ComponentsContainer[0]],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }