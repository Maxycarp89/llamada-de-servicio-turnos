import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { MotosComponentForm } from "src/app/pages/motos/motos.component.form";
import { cities } from "src/app/pages/motos/data";
import { AppState } from "src/store/AppState";
import { createCustomer } from "src/store/motos/motos.action";
import { MotosState } from "src/store/motos/motosState";

@Component({
    selector: 'app-create-customer',
    templateUrl: './create-customer.component.html',
    styleUrls: ['./create-customer.component.scss']
})

export class CreateCustomerComponent implements OnInit {
    newClientForm!: FormGroup
    cities = cities
    motos$!: Observable<MotosState>
    motosState!: MotosState

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private dialogService: MatDialog,
        private modalService: NgbModal
    ) {
        this.motos$ = this.store.pipe(select(state => state.motos))
        this.motos$.subscribe(state => this.motosState = state)
    }

    ngOnInit(): void {
        this.newClientForm = new MotosComponentForm(this.formBuilder).createNewClient()
    }

    createCustomer() {
        let infoManaged = this.newClientForm.value.U_B1SYS_VATCtg === 'RI' || this.newClientForm.value.U_B1SYS_VATCtg === "EX" || this.newClientForm.value.U_B1SYS_VATCtg === "MT" ? { ...this.newClientForm.value, U_B1SYS_FiscIdType: "80" } : { ...this.newClientForm.value, U_B1SYS_FiscIdType: "96" }
        this.store.dispatch(createCustomer(infoManaged))
    }

    dismiss() {
        this.newClientForm.reset()
        this.modalService.dismissAll()
        this.dialogService.closeAll()
    }
}