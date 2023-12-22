import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { HogarState, ItemsTransfer } from 'src/store/hogar/HogarState';
import * as hogarAction from "src/store/hogar/hogar.action"
import { Observable } from 'rxjs';
import { HogarComponentForm } from 'src/app/pages/hogar/hogar.component.form';
import { Service } from 'src/app/core/model/CoreTypes';
import { CoreState } from 'src/store/core/CoreState';
import { getServiceCallHomeInfo } from 'src/store/core/core.action';
import { HogarService } from 'src/app/pages/hogar/service/hogar.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { hideLoading, showLoading } from 'src/store/loading/loading.actions';
import { Offices } from 'src/store/login/LoginState';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { manageHomeMsgValidator } from './data';

@Component({
    selector: 'app-hogar',
    templateUrl: './hogar.component.html',
    styleUrls: ['./hogar.component.scss']
})
export class HogarComponent implements OnInit {
    searchForm!: FormGroup
    serviceForm!: FormGroup
    transferForm!: FormGroup
    searchItemInStock!: FormGroup

    hogar$!: Observable<HogarState>
    hogarState!: HogarState
    core$!: Observable<CoreState>
    coreState!: CoreState
    office$!: Observable<Offices>
    office!: Offices

    lastSelectedService!: any
    pageIndex: number = 0
    pageEnd: number = 4
    pageSize: number = 4

    pageChange(event: PageEvent) {
        this.pageIndex = event.pageIndex * event.pageSize
        this.pageEnd = this.pageIndex + event.pageSize
    }

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private homeService: HogarService,
        private toastService: ToastService,
        private modalService: NgbModal
    ) {
        this.hogar$ = this.store.pipe(select(state => state.hogar))
        this.hogar$.subscribe((state) => this.hogarState = state)
    }

    ngOnInit(): void {
        this.store.dispatch(getServiceCallHomeInfo())
        this.store.dispatch(hogarAction.getSecondWarehouse())
        this.searchForm = new HogarComponentForm(this.formBuilder).createSearchForm()
        this.core$ = this.store.pipe(select(state => state.core))
        this.core$.subscribe(state => this.coreState = state)
        this.office$ = this.store.pipe(select(state => state.login.officeSelected))
        this.office$.subscribe(state => this.office = state)
    }

    searchHomItem() {
        const { type, search } = this.searchForm.value
        if (type === 'NameOrCode') this.store.dispatch(hogarAction.searchHomeItem({ NameOrCode: search }))
        else if (type === 'Client') this.store.dispatch(hogarAction.searchHomeItem({ Client: search }))
        else if (type === 'DNI') this.store.dispatch(hogarAction.searchHomeItem({ DNI: search }))
    }

    changeFormValues(service: any) {
        const serviceFounded = this.hogarState.historyService.filter((serv: Service) => serv.ServiceCallID === parseInt(service.target.value))
        this.serviceForm = new HogarComponentForm(this.formBuilder).serviceManageForm(serviceFounded[0])
        this.transferForm = new HogarComponentForm(this.formBuilder, this.store).transferForm()
    }

    newServiceClicked() {
        this.serviceForm = new HogarComponentForm(this.formBuilder).serviceManageForm(this.lastSelectedService)
        this.transferForm = new HogarComponentForm(this.formBuilder, this.store).transferForm()
    }

    openDialogService(service: any, dialog: TemplateRef<Component>) {
        this.lastSelectedService = service
        this.store.dispatch(hogarAction.getHistoryFromHomeService({ CustomerCode: service.CardCode ? service.CardCode : 'P30623893096', ItemCode: service.ItemCode }))
        this.serviceForm = new HogarComponentForm(this.formBuilder, this.store).serviceManageForm(service)
        this.transferForm = new HogarComponentForm(this.formBuilder, this.store).transferForm()
        this.searchItemInStock = new HogarComponentForm(this.formBuilder).searchItemInStock()
        this.modalService.open(dialog, {
            size: 'xl',
            centered: true
        });
    }



    dismiss() {
        this.modalService.dismissAll()
    }
    clearSubProblemType() {
        this.serviceForm.controls['ProblemSubType'].setValue('')
    }

    getSocio(event: KeyboardEvent) {
        event.key === 'Enter' && this.store.dispatch(showLoading())
        event.key === 'Enter' && this.homeService.getCustomerSeller({ CardCode: this.transferForm.value.CardCode }).subscribe((resp: any) => {
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

    getItemInStock() {
        this.pageIndex = 0
        this.pageEnd = 4
        this.store.dispatch(hogarAction.getItemInStock({ NameOrCode: this.searchItemInStock.value.search }))
    }

    totalParsed(value: number) {
        return parseInt(value.toString())
    }

    getNewQuantityForItems(id: number, event: any) {
        this.store.dispatch(hogarAction.manageItemStockQuantity({ id, Quantity: parseInt(event.target.value) }))
    }

    addItemForStockTransfer(item: ItemsTransfer) {
        if (item.Quantity <= 0) return this.toastService.showWarning("Aviso", "La cantidad elegida a transferir siempre debe ser mayor o igual a 1")
        if (item.Stock < item.Quantity) return this.toastService.showWarning("Aviso", "La cantidad elegida no puede ser mayor a la cantidad que hay en stock")
        const itemExist = this.transferForm.value.StockTransferLines.filter((e: any) => e.ItemCode === item.ItemCode)
        if (itemExist.length > 0) return this.toastService.showWarning("Aviso", "El item ya fue seleccionado para transferir")
        else this.transferForm.controls['StockTransferLines'].setValue([...this.transferForm.value.StockTransferLines, { ItemCode: item.ItemCode, ItemDescription: item.ItemName, Quantity: item.Quantity, WarehouseCode: this.transferForm.value.ToWarehouse, FromWarehouseCode: this.transferForm.value.FromWarehouseCode, ProjectCode: "Hogar", SerialNumbers: [] }])
    }

    removeItemSelected(ItemCode: number) {
        this.transferForm.controls['StockTransferLines'].setValue(this.transferForm.value.StockTransferLines.filter((e: any) => e.ItemCode !== ItemCode))
        this.toastService.showSuccess("Éxito", "Item quitado de la lista de a transferir.")
    }

    activityConsult(id: number) {
        this.store.dispatch(hogarAction.getItemExistInTransfer({ ActivityCode: id }))
    }

    editOrCreateService() {
        const validate = manageHomeMsgValidator(this.serviceForm, this.transferForm)
        if (!!validate === true) return this.toastService.showWarning("Aviso", validate)
        !!this.serviceForm.value.ServiceCallID === false ? this.store.dispatch(hogarAction.postServiceCallsHome({ serviceBody: { ...this.serviceForm.value, transferBody: this.transferForm.value } })) : this.store.dispatch(hogarAction.patchServiceCallsHome({ serviceBody: { ...this.serviceForm.value, transferBody: this.transferForm.value } }))
    }

}
