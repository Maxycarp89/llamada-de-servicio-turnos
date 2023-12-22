import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as dashboardAction from "src/store/dashboard/dashboard.action"
import * as warrantyAction from "src/store/garantía-motos/garantia-motos.action"
import { AppState } from "src/store/AppState";
import { DashboardComponentForm } from "../dashboard.component.form";
import { DashboardState } from "src/store/dashboard/DashboardState";
import { GarantiaMotoState } from "src/store/garantía-motos/GarantiaMotosState";
import { Offices } from "src/store/login/LoginState";
import { Service } from "../../../pages/motos/model/Service";
import { MatDialog } from "@angular/material/dialog";
import { GarantiaMotosComponentForm } from "../../../pages/garantia-motos/garantia-motos.component.form";
import { CoreState } from "src/store/core/CoreState";
import * as coreActions from "src/store/core/core.action"
import { headerItemExist, sales } from "src/app/pages/motos/data";
import { PageEvent } from "@angular/material/paginator";
import { hideLoading, showLoading } from "src/store/loading/loading.actions";
import { ToastService } from "src/app/core/services/toast.service";
import { WarrantyService } from "../../../pages/garantia-motos/service/warranty.service";
import { ItemsTransfer } from "src/store/hogar/HogarState";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-dashboard-garantia',
    templateUrl: './dashboard-garantia.component.html',
    styleUrls: ['./dashboard-garantia.component.scss']
})

export class DashboardWarrantyComponent implements OnInit {
    rangeDate!: FormGroup
    serviceForm!: FormGroup
    searchInOperationForm!: FormGroup
    transferForm!: FormGroup
    searchItemInStock!: FormGroup

    dashboard$!: Observable<DashboardState>
    dashboardHistory!: Service[]
    garantía$!: Observable<GarantiaMotoState>
    garantiaState!: GarantiaMotoState
    offices$!: Observable<Offices>
    officeSelected!: Offices
    core$!: Observable<CoreState>
    coreState!: CoreState
    serviceSelected!: Service

    headers = ['Acción', 'ID', 'Chasis', 'Moto', 'Motivo', 'Fecha', 'Estado', 'Pedido', "Ult. Act"]
    currentPDF = null
    sales = sales
    pageIndex: number = 0
    pageEnd: number = 4
    pageSize: number = 4
    secondPageSize: number = 10
    secondPageIndex: number = 10
    thirdPageIndex: number = 0
    activeType: string = ''

    headerItemExist!: string[]


    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private warrantyService: WarrantyService,
        private toastService: ToastService,
        private modalService: NgbModal
    ) {
        this.dashboard$ = this.store.pipe(select(state => state.dashboard))
        this.garantía$ = this.store.pipe(select(state => state.garantia))
        this.core$ = this.store.pipe(select(state => state.core))
        this.dashboard$.subscribe(state => this.dashboardHistory = state.history)
        this.garantía$.subscribe(state => this.garantiaState = state)
        this.core$.subscribe(state => this.coreState = state)
    }

    ngOnInit(): void {
        this.store.dispatch(coreActions.getWarrantyServiceCallInfo())
        this.store.dispatch(warrantyAction.getTransferToWarranty())
        this.store.dispatch(warrantyAction.getSecondWarehouse())
        this.rangeDate = new DashboardComponentForm(this.formBuilder).createDateRangeForm("M-GARANTIA")
        this.store.dispatch(dashboardAction.getHistoryFromDashboard({ historyBody: this.rangeDate.value }))
        this.offices$ = this.store.pipe(select(state => state.login.officeSelected))
        this.offices$.subscribe(officeSelec => this.officeSelected = officeSelec)
    }

    searchByRange() {
        this.store.dispatch(dashboardAction.getHistoryFromDashboard({ historyBody: { ...this.rangeDate.value, frDate: this.rangeDate.value.frDate.toISOString().slice(0, 10), ltDate: this.rangeDate.value.ltDate.toISOString().slice(0, 10) } }))
    }

    clearSubProblemType() {
        this.serviceForm.controls['ProblemSubType'].setValue('')
    }

    editWarrantyService() {
        this.store.dispatch(warrantyAction.patchWarrantyService({ serviceBody: { ...this.serviceForm.value, sales: this.sales, transferBody: this.transferForm.value } }))
    }

    changeActive(type: string) {
        this.activeType = type
    }

    deleteImgCharged(value: string) {
        const oldImg = this.serviceForm.value.U_ArchivoAdj
        const withoutOldImg = oldImg.replace(`${value};;`, '')
        this.serviceForm.controls['U_ArchivoAdj'].setValue(withoutOldImg)
    }

    openDialogService(service: Service, dialog: TemplateRef<Component>) {
        this.store.dispatch(warrantyAction.clearItemsExistInService())
        this.sales = { ...sales, BPL_IDAssignedToInvoice: this.officeSelected.BPLId }
        this.serviceForm = new GarantiaMotosComponentForm(this.formBuilder, this.store).createNewService(service)
        this.transferForm = new GarantiaMotosComponentForm(this.formBuilder, this.store).transferForm()
        this.searchItemInStock = new GarantiaMotosComponentForm(this.formBuilder, this.store).searchItemInStock()
        this.searchInOperationForm = new GarantiaMotosComponentForm(this.formBuilder, this.store).searchItemsFromOperations()
        this.modalService.open(dialog, {
            size: 'xl',
            centered: true
        })
    }

    openModalViewServiceInfo(info: Service, modal: TemplateRef<Component>) {
        this.serviceSelected = info
        this.modalService.open(modal, {
            size: 'xl',
            centered: true
        })
    }

    setWarrantyInfo(info: any) {
        this.serviceForm.controls['U_NumTranferencia'].setValue(info.DocEntry)
        this.serviceForm.controls['U_FechaTransferencia'].setValue(info.DocDate)
    }

    dismiss() {
        this.modalService.dismissAll()
    }

    manageFile(file: any) {
        if (!file.target.files?.[0]) return;
        const fileBase64 = file.target.files[0];
        const base64 = new FileReader();
        base64.readAsDataURL(fileBase64);
        base64.onload = () => {
            if (typeof base64.result === "string") {
                const data = base64.result;
                if (!data) return;
                this.serviceForm.controls['U_ArchivoAdj'].setValue(`${this.serviceForm.value.U_ArchivoAdj !== null ? this.serviceForm.value.U_ArchivoAdj : ''}${data};;`)
            }
        };
    }

    activityConsult(id: number) {
        this.store.dispatch(warrantyAction.getItemsFromExistOperations({ ActivityCode: id }))
        this.headerItemExist = headerItemExist
    }

    //Función para consultar stock y en base a si hay stock agregar el item o no.
    consultStockAndAddItem(item: any) {
        this.store.dispatch(showLoading())
        this.warrantyService.getItems({ item: item.ItemCode, searchType: 'Código', warehouse: this.officeSelected.BPLName }).subscribe((haveStock: any) => {
            this.store.dispatch(hideLoading())
            if (haveStock && haveStock.message && haveStock.message.includes("No hay")) {
                return this.toastService.showError("Falló", `No hay stock disponible de ${haveStock.itemDescrip} (${haveStock.itemCode}).`)
            } else {
                if (this.sales.DocumentLines.length > 0) {
                    let existItem = this.sales.DocumentLines.filter(({ ItemCode }) => ItemCode === haveStock[0].ItemCode)
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
                                U_Tipo_Operacion: '1',
                                GroupNumber: -2
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
                            U_Tipo_Operacion: '1'
                        }]
                    }
                }
            }
        })
    }
    //Función para quitar item seleccionados para la salida de mercancia
    removeFromSale(ItemCode: string) {
        const indFinded = this.sales.DocumentLines.findIndex((val: any) => val.ItemCode === ItemCode)
        this.sales.DocumentLines = this.sales.DocumentLines.filter((item: any, index: number) => index !== indFinded)
    }
    //Funcion para manejar la cantidad de items que se mandan al realizar una salida
    changeValueQuantityFromItemInSale(ItemCode: string, event: any) {
        const indexFinded = this.sales.DocumentLines.findIndex((val: any) => val.ItemCode === ItemCode)
        this.sales.DocumentLines[indexFinded].Quantity = Number(event.target.value)
    }

    getItemsFromOperation() {
        this.pageIndex = 0
        this.store.dispatch(warrantyAction.getItems(this.searchInOperationForm.value))
    }

    getItemInStock() {
        this.pageIndex = 0
        this.store.dispatch(warrantyAction.getItemInStock({ NameOrCode: this.searchItemInStock.value.search }))
    }

    totalParsed(value: number) {
        return parseInt(value.toString())
    }
    getNewQuantityForItems(id: number, event: any) {
        this.store.dispatch(warrantyAction.manageItemStockQuantity({ id, Quantity: parseInt(event.target.value) }))
    }
    addItemForStockTransfer(item: ItemsTransfer) {
        if (item.Quantity <= 0) return this.toastService.showWarning("Aviso", "La cantidad elegida a transferir siempre debe ser mayor o igual a 1")
        if (item.Stock < item.Quantity) return this.toastService.showWarning("Aviso", "La cantidad elegida no puede ser mayor a la cantidad que hay en stock")
        const itemExist = this.transferForm.value.StockTransferLines.filter((e: any) => e.ItemCode === item.ItemCode)
        if (itemExist.length > 0) return this.toastService.showWarning("Aviso", "El item ya fue seleccionado para transferir")
        else this.transferForm.controls['StockTransferLines'].setValue([...this.transferForm.value.StockTransferLines, { ItemCode: item.ItemCode, ItemDescription: item.ItemName, Quantity: item.Quantity, WarehouseCode: this.transferForm.value.ToWarehouse, FromWarehouseCode: this.transferForm.value.FromWarehouseCode, ProjectCode: "Repuestos", SerialNumbers: [] }])
    }
    addSerialToTransfer(item: any) {
        this.transferForm.controls['StockTransferLines'].setValue([...this.transferForm.value.StockTransferLines, { ItemCode: item.ItemCode, ItemDescription: item.ItemName, Quantity: 1, WarehouseCode: this.transferForm.value.ToWarehouse, FromWarehouseCode: this.transferForm.value.FromWarehouseCode, ProjectCode: "Repuestos", SerialNumbers: [{ InternalSerialNumber: item.IntrSerial, Quantity: 1 }] }])
        this.store.dispatch(warrantyAction.resetSeries())
    }

    getSocio(event: KeyboardEvent) {
        event.key === 'Enter' && this.store.dispatch(showLoading())
        event.key === 'Enter' && this.warrantyService.getCustomerSeller({ CardCode: this.transferForm.value.CardCode }).subscribe((resp: any) => {
            this.store.dispatch(hideLoading())
            if (resp.msg) {
                this.transferForm.controls['CardName'].setValue('')
                this.transferForm.controls['Address'].setValue('')
                this.toastService.showWarning("Aviso", resp.msg)
            } else {
                this.transferForm.controls['Address'].setValue(resp[0].Address)
                this.transferForm.controls['CardName'].setValue(resp[0].CardName)
                this.toastService.showSuccess("Éxito", "Socio de negocios agregado exitosamente.")
            }
        })
    }

    removeItemSelected(ItemCode: number) {
        this.transferForm.controls['StockTransferLines'].setValue(this.transferForm.value.StockTransferLines.filter((e: any) => e.ItemCode !== ItemCode))
        this.toastService.showSuccess("Éxito", "Item quitado de la lista de a transferir.")
    }

    chargeMotorbikeSeries(ItemCode: string) {
        this.store.dispatch(warrantyAction.getMotorbikeSeries({ ItemCode }))
    }

    getWarehouseFriend(event: any) {
        this.transferForm.controls['ToWarehouse'].setValue(event.target.value)
        this.transferForm.value.StockTransferLines.length > 0 && this.transferForm.controls['StockTransferLines'].setValue(this.transferForm.value.StockTransferLines.map((e: any) => {
            return {
                ...e,
                FromWarehouseCode: this.transferForm.value.FromWarehouse,
                WarehouseCode: event.target.value
            }
        }))
    }
}