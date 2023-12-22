import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from "@ngrx/store"
import * as warrantyActions from "src/store/garantía-motos/garantia-motos.action"
import { Observable } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { MatDialog } from '@angular/material/dialog';
import { cities, headerService, headerWithName, headers, sales } from '../motos/data';
import { Offices } from 'src/store/login/LoginState';
import { GarantiaMotosComponentForm } from 'src/app/pages/garantia-motos/garantia-motos.component.form';
import { GarantiaMotoState } from 'src/store/garantía-motos/GarantiaMotosState';
import { CoreState } from 'src/store/core/CoreState';
import * as coreActions from 'src/store/core/core.action'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { manageMsgValidator } from './data';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
    selector: 'app-garantia-bike',
    templateUrl: './garantia-motos.component.html',
    styleUrls: ['./garantia-motos.component.scss']
})

export class GarantíaMotosComponent implements OnInit {
    searchForm!: FormGroup
    serviceForm!: FormGroup

    cities = cities
    sales = sales
    searchByName: boolean = false

    warranty$: Observable<GarantiaMotoState>
    garantiaState!: GarantiaMotoState
    core$!: Observable<CoreState>
    coreState!: CoreState
    offices$!: Observable<Offices>
    officeSelected!: Offices

    headers: string[] = headers
    headerService!: string[]


    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private modalService: NgbModal,
        private toastService: ToastService
    ) {
        this.warranty$ = this.store.pipe(select(state => state.garantia));
        this.core$ = this.store.pipe(select(state => state.core))
        this.warranty$.subscribe(motosState => this.garantiaState = motosState)
        this.core$.subscribe(state => this.coreState = state)
    }


    ngOnInit(): void {
        this.store.dispatch(coreActions.getWarrantyServiceCallInfo())
        this.searchForm = new GarantiaMotosComponentForm(this.formBuilder, this.store).createSearchForm()
        this.offices$ = this.store.pipe(select(state => state.login.officeSelected))
        this.offices$.subscribe(officeSelec => this.officeSelected = officeSelec)
    }

    searchCustomerMotorbike() {
        const { type, search } = this.searchForm.value
        this.searchByName = false
        this.headers = headers
        this.headerService = headerService
        if (type === 'Client') this.store.dispatch(warrantyActions.search({ Client: search, WhsCode: this.searchForm.value.WhsCode }))
        else if (type === 'DNI') this.store.dispatch(warrantyActions.search({ DNI: search, WhsCode: this.searchForm.value.WhsCode }))
        else if (type === 'Chasis') this.store.dispatch(warrantyActions.search({ DNI: search, WhsCode: this.searchForm.value.WhsCode }))
        else if (type === 'Motor') this.store.dispatch(warrantyActions.search({ Motor: search, WhsCode: this.searchForm.value.WhsCode }))
        else if (type === 'Serie') this.store.dispatch(warrantyActions.search({ Serie: search, WhsCode: this.searchForm.value.WhsCode }))
        else {
            this.searchByName = true
            this.headers = headerWithName
            this.store.dispatch(warrantyActions.search({ ClientName: search, WhsCode: this.searchForm.value.WhsCode }))
        }
    }

    openDialogService(service: any, dialog: TemplateRef<Component>) {
        this.serviceForm = new GarantiaMotosComponentForm(this.formBuilder, this.store).createNewService(service)
        this.modalService.open(dialog, {
            size: 'xl',
            centered: true
        })
    }


    createWarrantyService() {
        const validate: string = manageMsgValidator(this.serviceForm)
        if (!!validate === true) return this.toastService.showWarning("Aviso", validate)
        this.store.dispatch(warrantyActions.postWarrantyService({ serviceBody: this.serviceForm.value }))
    }

    dismiss() {
        this.modalService.dismissAll()
    }


    clearSubProblemType() {
        this.serviceForm.controls['ProblemSubType'].setValue('')
    }
}