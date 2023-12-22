import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { searchInternMotorbike, getHistoryFromIntr, getItems, postServiceCallInterno, patchServiceCall, getItemsFromExistOperations, resetItemInInventoryExist } from 'src/store/moto-interno/moto-interno.action';
import { Observable } from 'rxjs';
import { MotoInternoState } from 'src/store/moto-interno/MotoInternoState';
import { MotoInternoComponentForm } from 'src/app/pages/motos-interno/moto-interno.component.form';
import { headers, manageValidator } from './data';
import { headerItemExist, headerItemsSelected, headerOperation, sales } from '../motos/data';
import { Offices } from 'src/store/login/LoginState';
import { hideLoading, showLoading } from 'src/store/loading/loading.actions';
import { MotoInternoService } from 'src/app/pages/motos-interno/service/moto-interno.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Service } from 'src/app/pages/motos/model/Service';
import { CoreState } from 'src/store/core/CoreState';
import * as coreActions from "src/store/core/core.action"
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-motos-interno',
    templateUrl: './motos-interno.component.html',
    styleUrls: ['./motos-interno.component.scss']
})

export class MotosInternoComponent implements OnInit {
    searchForm!: FormGroup
    serviceForm!: FormGroup
    searchInOperationForm!: FormGroup

    sales = sales

    headers: string[] = headers
    headerItemsSelected!: string[]
    headerItemExist!: string[]
    headerOperation!: string[]

    officeSelected$!: Observable<Offices>;
    officeSelected!: Offices
    core$!: Observable<CoreState>
    coreState!: CoreState
    motoInterno$!: Observable<MotoInternoState>
    motoInternoState!: MotoInternoState
    activeWarehouse$!: Observable<string>
    activeWarehouse!: string

    pageIndex: number = 0
    pageEnd: number = 4
    pageSize: number = 4
    lastSelectedService!: any

    onPageChange(event: PageEvent) {
        this.pageIndex = event.pageIndex * event.pageSize
        this.pageEnd = this.pageIndex + event.pageSize
    }

    newServiceClicked() {
        this.serviceForm = new MotoInternoComponentForm(this.formBuilder, this.store).createNewService(this.lastSelectedService)
        this.sales.DocumentLines = []
        this.store.dispatch(resetItemInInventoryExist())
    }

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private motoInternoService: MotoInternoService,
        private toastService: ToastService,
        private modalService: NgbModal
    ) {
        this.motoInterno$ = this.store.pipe(select(state => state.motoInterno))
        this.core$ = this.store.pipe(select(state => state.core))
        this.motoInterno$.subscribe(motoInternoState => this.motoInternoState = motoInternoState)
        this.core$.subscribe(state => this.coreState = state)
    }

    ngOnInit(): void {
        this.store.dispatch(coreActions.getServiceCallInfoIntr())
        this.searchForm = new MotoInternoComponentForm(this.formBuilder).createSearchForm()
        this.searchInOperationForm = new MotoInternoComponentForm(this.formBuilder, this.store).searchItemsFromOperations()
        this.activeWarehouse$ = this.store.pipe(select(state => state.login.officeSelected.BPLName))
        this.officeSelected$ = this.store.pipe(select(state => state.login.officeSelected))
        this.activeWarehouse$.subscribe(warehouse => this.activeWarehouse = warehouse)
        this.officeSelected$.subscribe(officeSelec => this.officeSelected = officeSelec)
    }

    searchMotorbike() {
        const { type } = this.searchForm.value
        if (type === 'NameOrCode') this.store.dispatch(searchInternMotorbike({ NameOrCode: this.searchForm.value.search, WhsCode: this.activeWarehouse }))
        else if (type === 'Chasis') this.store.dispatch(searchInternMotorbike({ Chasis: this.searchForm.value.search, WhsCode: this.activeWarehouse }))
        else if (type === 'Motor') this.store.dispatch(searchInternMotorbike({ Motor: this.searchForm.value.search, WhsCode: this.activeWarehouse }))
        else if (type === 'Serie') this.store.dispatch(searchInternMotorbike({ Serie: this.searchForm.value.search, WhsCode: this.activeWarehouse }))
    }

    openDialogService(moto: any, modal: TemplateRef<Component>) {
        this.lastSelectedService = moto
        this.getHistory(moto.U_Chasis)
        this.serviceForm = new MotoInternoComponentForm(this.formBuilder, this.store).createNewService(moto)
        this.sales = { ...sales, BPL_IDAssignedToInvoice: this.officeSelected.BPLId }
        this.store.dispatch(resetItemInInventoryExist())
        this.modalService.open(modal, {
            size: 'xl',
            centered: true
        });
    }

    getHistory(Chasis: string) {
        this.store.dispatch(getHistoryFromIntr({ Chasis }))
    }

    getItemsFromOperation() {
        this.headerOperation = headerOperation
        this.headerItemsSelected = headerItemsSelected
        this.pageIndex = 0
        this.pageEnd = 4
        this.store.dispatch(getItems(this.searchInOperationForm.value))
    }

    changeValueQuantityFromItemInSale(ItemCode: string, event: any) {
        const indexFinded = this.sales.DocumentLines.findIndex((val: any) => val.ItemCode === ItemCode)
        this.sales.DocumentLines[indexFinded].Quantity = Number(event.target.value)
    }

    removeFromSale(ItemCode: string) {
        const indFinded = this.sales.DocumentLines.findIndex((val: any) => val.ItemCode === ItemCode)
        this.sales.DocumentLines = this.sales.DocumentLines.filter((item: any, index: number) => index !== indFinded)
    }

    activityConsult(id: number) {
        this.store.dispatch(getItemsFromExistOperations({ ActivityCode: id }))
    }

    showHistory(moto: any, modal: TemplateRef<Component>) {
        this.getHistory(moto.U_Chasis)
        this.modalService.open(modal, {
            size: 'xl',
            centered: true
        });
    }

    consultStockAndAddItem(item: any) {
        this.store.dispatch(showLoading())
        this.motoInternoService.getItems({ item: item.ItemCode, searchType: 'Código', warehouse: this.officeSelected.BPLName }).subscribe((haveStock: any) => {
            this.store.dispatch(hideLoading())
            if (haveStock && haveStock.message && haveStock.message.includes("No hay")) {
                return this.toastService.showError("Falló", `No hay stock disponible de ${haveStock.itemDescrip} (${haveStock.itemCode}).`)
            } else {
                if (this.sales.DocumentLines.length > 0) {
                    let existItem = sales.DocumentLines.filter(({ ItemCode }) => ItemCode === haveStock[0].ItemCode)
                    if (existItem.length > 0) {
                        this.toastService.showWarning("Aviso", "Ya existe el item que intentas seleccionar")
                    } else {
                        this.sales = {
                            ...this.sales, DocumentLines: [...this.sales.DocumentLines, {
                                ItemCode: haveStock[0].ItemCode,
                                ItemName: haveStock[0].ItemName,
                                MeasureUnit: haveStock.SalesUnit,
                                Quantity: 1,
                                UseBaseUnits: haveStock[0].SalesUnit === "LITROS" ? "tNO" : "tYES",
                                ProjectCode: "Servicio_Postventa",
                                WarehouseCode: this.officeSelected.BPLName,
                                AccountCode: "4.4.020.10.463",
                            }]
                        }
                    }
                } else {
                    this.sales = {
                        ...this.sales, DocumentLines: [...sales.DocumentLines, {
                            ItemCode: haveStock[0].ItemCode,
                            ItemName: haveStock[0].ItemName,
                            MeasureUnit: haveStock[0].SalesUnit,
                            Quantity: 1,
                            UseBaseUnits: haveStock[0].SalesUnit === "LITROS" ? "tNO" : "tYES",
                            ProjectCode: "Servicio_Postventa",
                            WarehouseCode: this.officeSelected.BPLName,
                            AccountCode: "4.4.020.10.463",
                        }]
                    }
                }
            }
        })
    }

    createOrEditService() {
        const validate = manageValidator(this.serviceForm)
        if (!!validate === true) return this.toastService.showWarning("Aviso", validate)
        this.serviceForm.value.ServiceCallID ? this.store.dispatch(patchServiceCall({ serviceCallBody: { ...this.serviceForm.value, sales: this.sales } }))
            :
            this.store.dispatch(postServiceCallInterno({ serviceCallBody: { ...this.serviceForm.value, sales: this.sales } }))
    }

    dismiss() {
        this.modalService.dismissAll()
    }

    changeFormValues(service: any) {
        this.store.dispatch(resetItemInInventoryExist())
        const serviceFounded = this.motoInternoState.historyIntr.filter((serv: Service) => serv.ServiceCallID === parseInt(service.target.value))
        this.serviceForm = new MotoInternoComponentForm(this.formBuilder, this.store).createNewService(serviceFounded[0])
        if (serviceFounded[0].ServiceCallActivities.length > 0) {
            this.store.dispatch(getItemsFromExistOperations({ ActivityCode: serviceFounded[0].ServiceCallActivities[0].ActivityCode }))
            this.headerItemExist = headerItemExist
            this.sales.DocumentLines = []
        }
    }


    clearSubProblemType() {
        this.serviceForm.controls['ProblemSubType'].setValue('')
    }
}
