import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { BikesComponentForm } from 'src/app/pages/bike/bike.component.form';
import { AppState } from 'src/store/AppState';
import { BikeState } from 'src/store/bikes/BikeState';
import * as bikeActions from "src/store/bikes/bikes.action"
import { headers, manageValidator } from './data';
import { headerItemExist, headerItemsSelected, headerOperation, sales } from '../motos/data';
import { LoginState, Offices } from 'src/store/login/LoginState';
import { Service } from 'src/app/pages/motos/model/Service';
import { hideLoading, showLoading } from 'src/store/loading/loading.actions';
import { BikeService } from 'src/app/pages/bike/service/bike.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CoreState } from 'src/store/core/CoreState';
import * as coreActions from "src/store/core/core.action"
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-bike',
    templateUrl: './bike.component.html',
    styleUrls: ['./bike.component.scss']
})

export class BikeComponent implements OnInit {
    searchForm!: FormGroup
    serviceForm!: FormGroup
    searchInOperationForm!: FormGroup
    searchOtherBike!: FormGroup
    searchControl = new FormControl()

    bikes$!: Observable<BikeState>
    bikeState!: BikeState
    core$!: Observable<CoreState>
    coreState!: CoreState
    officeSelected$!: Observable<LoginState>;
    officeSelected!: Offices
    ptiCode!: any

    headers = headers
    headerItemExist = headerItemExist
    headerOperation = headerOperation
    headerItemsSelected = headerItemsSelected

    sales = sales
    lastSelectedService!: any
    comboSelected!: any
    showSelecCombo!: boolean
    pageIndex: number = 0
    pageEnd: number = 4
    pageSize: number = 4
    secondPageIndex: number = 0
    secondPageEnd: number = 4
    page: number = 0
    pageSizeForMarca: number = 4

    onPageChange(event: PageEvent) {
        this.pageIndex = event.pageIndex * event.pageSize
        this.pageEnd = this.pageIndex + event.pageSize
    }

    secondOnPageChange(event: PageEvent) {
        this.secondPageIndex = event.pageIndex * event.pageSize
        this.secondPageEnd = this.secondPageIndex + event.pageSize
    }

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private bikeService: BikeService,
        private toastService: ToastService,
        private modalService: NgbModal
    ) {
        this.core$ = this.store.pipe(select(state => state.core))
        this.bikes$ = this.store.pipe(select(state => state.bikes))
        this.bikes$.subscribe((state) => this.bikeState = state)
        this.core$.subscribe((state => this.coreState = state))
        this.searchControl.valueChanges
        .pipe(
          debounceTime(100),
          distinctUntilChanged()
        )
        .subscribe(() => {
          this.page = 1;
        });
    }

    ngOnInit(): void {
        this.searchForm = new BikesComponentForm(this.formBuilder).createSearchForm()
        this.searchOtherBike = new BikesComponentForm(this.formBuilder).searchOtherMotorbike()
        this.store.dispatch(coreActions.getServiceCallBikeInfo())
        this.officeSelected$ = this.store.pipe(select(state => state.login))
        this.officeSelected$.subscribe(state => {
            this.officeSelected = state.officeSelected
            this.ptiCode = { ...state.ptiCode, Warehouse: state.officeSelected.BPLName }
        })
    }

    searchCustomerBike() {
        const { type } = this.searchForm.value
        if (type === 'DNI') return this.store.dispatch(bikeActions.searchBikes({ DNI: this.searchForm.value.search }))
        else if (type === 'Client') return this.store.dispatch(bikeActions.searchBikes({ Client: this.searchForm.value.search }))
        else if (type === 'Serie') return this.store.dispatch(bikeActions.searchBikes({ Serie: this.searchForm.value.search }))
        else if (type === 'Cuadro') return this.store.dispatch(bikeActions.searchBikes({ Cuadro: this.searchForm.value.search }))
        else return;
    }


    openDialogService(service: any, dialog: TemplateRef<Component>) {
        this.lastSelectedService = service
        this.serviceForm = new BikesComponentForm(this.formBuilder, this.store).createNewService(service)
        this.store.dispatch(bikeActions.clearItemsExistInService())
        this.store.dispatch(bikeActions.getSpecificHistoryBike({ CustomerCode: service.CardCode ? service.CardCode : service.CustomerCode, ItemCode: service.U_Chasis }))
        this.store.dispatch(bikeActions.getCombos({ CardCode: service.CardCode ? service.CardCode : service.CustomerCode }))
        this.openDialog(dialog)
        this.sales = { ...sales, BPL_IDAssignedToInvoice: this.officeSelected.BPLId, DocumentLines: [] }
        this.searchInOperationForm = new BikesComponentForm(this.formBuilder, this.store).searchItemsFromOperations()
        this.comboSelected = null
        this.showSelecCombo = false
    }

    newServiceClicked() {
        this.serviceForm = new BikesComponentForm(this.formBuilder, this.store).createNewService(this.lastSelectedService)
        this.store.dispatch(bikeActions.clearItemsExistInService())
    }


    searchItemsInBike(action: string, bike?: any) {
        if (action === "SEARCH") {
            this.store.dispatch(bikeActions.getItemsInBikes({ Search: this.searchOtherBike.value.itemorcode }))
            this.secondPageIndex = 0
            this.secondPageEnd = 4
        } else if (action !== "SEARCH" && bike) {
            this.serviceForm.controls['ItemCode'].setValue(bike.ItemCode)
            this.serviceForm.controls['ItemDescription'].setValue(bike.ItemName)
            this.serviceForm.controls['U_Chasis'].setValue('')
            this.serviceForm.controls['InternalSerialNum'].setValue(null)
        }
    }

    selecMarca(marca: any) {
        this.serviceForm.controls['U_Marca'].setValue(`${marca.Code} - ${marca.Name}`)
        this.serviceForm.controls['ItemCode'].setValue(null)
            this.serviceForm.controls['ItemDescription'].setValue(null)
        this.toastService.showSuccess("Exito", `Marca seleccionada: ${marca.Code} - ${marca.Name}`)
    }

    chargeMarcas() {
        this.page = 0
        this.store.dispatch(bikeActions.getMarcas())
    }

    getItemsFromOperation() {
        this.headerOperation = headerOperation
        this.headerItemsSelected = headerItemsSelected
        this.pageIndex = 0
        this.pageEnd = 4
        this.store.dispatch(bikeActions.getOperationInBike(this.searchInOperationForm.value))
    }

    openDialog(dialog: TemplateRef<Component>) {
        this.modalService.open(dialog, {
            size: 'xl',
            centered: true
        });
    }

    dismiss() {
        this.modalService.dismissAll()
    }

    changeFormValues(service: any) {
        this.store.dispatch(bikeActions.clearItemsExistInService())
        const serviceFounded = this.bikeState.historyService.filter((serv: Service) => serv.ServiceCallID === parseInt(service.target.value))
        this.serviceForm = new BikesComponentForm(this.formBuilder, this.store).createNewService(serviceFounded[0])
        this.sales.DocumentLines = []
    }

    activityConsult(id: number) {
        this.store.dispatch(bikeActions.getItemsFromExistOperationsInBike({ ActivityCode: id }))
        this.headerItemExist = headerItemExist
    }

    consultStockAndAddItem(item: any) {
        this.store.dispatch(showLoading())
        this.bikeService.getItems({ item: item.ItemCode, searchType: 'Código', warehouse: this.officeSelected.BPLName }).subscribe((haveStock: any) => {
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

    changeValueQuantityFromItemInSale(ItemCode: string, event: any) {
        const indexFinded = this.sales.DocumentLines.findIndex((val: any) => val.ItemCode === ItemCode)
        this.sales.DocumentLines[indexFinded].Quantity = Number(event.target.value)
    }

    removeFromSale(ItemCode: string) {
        const indFinded = this.sales.DocumentLines.findIndex((val: any) => val.ItemCode === ItemCode)
        this.sales.DocumentLines = this.sales.DocumentLines.filter((item: any, index: number) => index !== indFinded)
    }

    createOrEditService() {
        const validate = manageValidator(this.serviceForm, this.comboSelected)
        if (!!validate === true) return this.toastService.showWarning("Aviso", validate)
        this.serviceForm.value.ServiceCallID ? this.store.dispatch(bikeActions.patchServiceCallBike({
            serviceBody: {
                ...this.serviceForm.value,
                sales: this.sales,
                invoiceBody: this.comboSelected
            }
        })) :
            this.store.dispatch(bikeActions.postServiceCallBike({
                serviceBody: {
                    ...this.serviceForm.value,
                    sales: this.sales
                }
            }))
    }

    clearSubProblemType() {
        this.serviceForm.controls['ProblemSubType'].setValue('')
    }

    openChooseCombo(status: number) {
        if (status === -1) {
            this.showSelecCombo = true
            this.serviceForm.controls['Resolution'].setValidators([Validators.required])
        } else {
            this.showSelecCombo = false
            this.comboSelected = null
            this.serviceForm.controls['Resolution'].setValidators([])
            this.serviceForm.controls['Resolution'].setValue(null)
        }
    }

    manageSubTypeP(status: number) {
        if (status === 96 || status === 97) this.comboSelected = null
    }

    selectCombo(combo: any) {
        this.showSelecCombo = false
        const invoiceBody = this.bikeState.combos.filter((e: any) => e.DocEntry === combo.DocEntry)
        this.store.dispatch(showLoading())
        return this.bikeService.shipmentEmision({ BPLName: invoiceBody[0].BPLName })
            .subscribe(response => {
                this.store.dispatch(hideLoading())
                this.comboSelected = {
                    CardCode: this.serviceForm.value.CustomerCode,
                    CardName: this.serviceForm.value.CustomerName,
                    BPLName: invoiceBody[0].BPLName,
                    PointOfIssueCode: response[0].PTICode,
                    DocumentLines: invoiceBody.map((com: any, index: number) => {
                        return {
                            ItemCode: com.ItemCode,
                            Quantity: com.id__ === combo.id__ ? 1 : 0,
                            Price: com.Price,
                            Warehouse: com.BPLName,
                            ProjectCode: "Servicio_Postventa",
                            AccountCode: "4.1.010.10.001",
                            BaseType: '13',
                            BaseEntry: com.DocEntry,
                            BaseLine: index
                        }
                    })
                }
            })
    }

    openServiceForNewBike(dialog: TemplateRef<Component>) {
        this.openDialogService({
            CardCode: this.bikeState.bikes[0].CardCode ? this.bikeState.bikes[0].CardCode : this.bikeState.bikes[0].CustomerCode,
            CardName: this.bikeState.bikes[0].CardName ? this.bikeState.bikes[0].CardName : this.bikeState.bikes[0].CustomerName,
            BPBillToAddress: this.bikeState.bikes[0].BPBillToAddress ? this.bikeState.bikes[0].BPBillToAddress : this.bikeState.bikes[0].Address,
            BPeMail: this.bikeState.bikes[0].BPeMail ? this.bikeState.bikes[0].BPeMail : this.bikeState.bikes[0].EmailAddress
        }, dialog)
    }

    showHistory(bike: any, modal: TemplateRef<Component>) {
        this.store.dispatch(bikeActions.getSpecificHistoryBike({ CustomerCode: bike.CardCode ? bike.CardCode : bike.CustomerCode, ItemCode: bike.ItemCode }))
        this.openDialog(modal)
    }
}
