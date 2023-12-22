import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { search, clearState, createCustomer, getHistory, getItems, getServiceCallInfo, postServiceCalls, getMotorbikeByBrandAndModel, getItemsFromExistOperations, clearItemsExistInService, patchServiceCalls, getSpecificHistoryService } from 'src/store/motos/motos.action';
import { Observable } from 'rxjs';
import { MotosState } from 'src/store/motos/motosState';
import { MotosComponentForm } from '../motos/motos.component.form'
import { headers, headerWithName, headerNewMotorbike, headerOperation, headerItemsSelected, cities, options, sales, headerItemExist, headerService } from './data';
import { MatDialog } from "@angular/material/dialog"
import { MotosService } from '../motos/service/motos.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { hideLoading, showLoading } from 'src/store/loading/loading.actions';
import { Offices } from 'src/store/login/LoginState';
import { Service } from '../motos/model/Service';


@Component({
selector: 'app-landing-service',
  templateUrl: './landing-service.component.html',
  styleUrls: ['./landing-service.component.scss'],
  
})
export class LandingServiceComponent implements OnInit {
  searchForm!: FormGroup
  newClientForm!: FormGroup
  newServiceForm!: FormGroup
  cities = cities
  options = options.YESORNO
  searchOtherMotorbike!: FormGroup
  searchInOperationForm!: FormGroup
  sales = sales

  motos$: Observable<MotosState>
  motosState!: MotosState
  headers: string[] = headers
  headerService!: string[]
  headerNewMotorbike!: string[]
  headerOperation!: string[]
  headerItemsSelected!: string[]
  headerItemExist!: string[]
  officeSelected$!: Observable<Offices>;
  officeSelected!: Offices
  searchByName: boolean = false

    constructor(
      private formBuilder: FormBuilder,
      private store: Store<AppState>,
      private dialogService: MatDialog,
      private motosService: MotosService,
      private toastService: ToastService
    ) {
      this.motos$ = this.store.pipe(select(state => state.motos));
    this.officeSelected$ = this.store.pipe(select(state => state.login.officeSelected))
    this.motos$.subscribe(motosState => {
      console.log(motosState)
      this.motosState = motosState
    })
     }

  ngOnInit(): void {
    this.searchForm = new MotosComponentForm(this.formBuilder).createSearchForm()
    this.newClientForm = new MotosComponentForm(this.formBuilder).createNewClient()
    this.searchOtherMotorbike = new MotosComponentForm(this.formBuilder).searchOtherMotorbike()
    this.store.dispatch(getServiceCallInfo())
    this.officeSelected$.subscribe(officeSelec => this.officeSelected = officeSelec)
  
  }

  clearState() {
    this.store.dispatch(clearState())
  }
  //Función para dar de alta un nuevo cliente.
  createCustomer() {
    let infoManaged = this.newClientForm.value.U_B1SYS_VATCtg === 'RI' || this.newClientForm.value.U_B1SYS_VATCtg === "EX" || this.newClientForm.value.U_B1SYS_VATCtg === "MT" ? { ...this.newClientForm.value, U_B1SYS_FiscIdType: "80" } : { ...this.newClientForm.value, U_B1SYS_FiscIdType: "96" }
    this.store.dispatch(createCustomer(infoManaged))
  }

  //Fucnion para traer el historial.
  getHistory(CustomerCode: string, historyDialog?: TemplateRef<Component>) {
    historyDialog && this.openDialog(historyDialog, '800px', '95%')
    this.store.dispatch(getHistory({ CustomerCode }))
  }

  //Función para abrir el dialog-modal para crear un nuevo servicio
  openDialogService(plan: any, dialog: TemplateRef<Component>, width: string, height: string) {
    this.headerNewMotorbike = headerNewMotorbike
    this.store.dispatch(getSpecificHistoryService({ CustomerCode: plan.CardCode ? plan.CardCode : plan.CustomerCode, Chasis: plan.U_Chasis }))
    this.store.dispatch(clearItemsExistInService())
    this.newServiceForm = new MotosComponentForm(this.formBuilder, this.store).createNewService(plan)
    this.openDialog(dialog, width, height)
    this.sales = { ...sales, BPL_IDAssignedToInvoice: this.officeSelected.BPLId }
    this.searchInOperationForm = new MotosComponentForm(this.formBuilder, this.store).searchItemsFromOperations()
  }

  //Funcion para manejar la edición de service
  changeFormValues(service: string) {
    const serviceFounded = this.motosState.historyService.filter((serv: Service) => serv.ServiceCallID === parseInt(service))
    this.newServiceForm = new MotosComponentForm(this.formBuilder, this.store).createNewService(serviceFounded[0])
    if (serviceFounded[0].ServiceCallActivities.length > 0) {
      this.store.dispatch(getItemsFromExistOperations({ ActivityCode: serviceFounded[0].ServiceCallActivities[0].ActivityCode }))
      this.headerItemExist = headerItemExist
      this.sales.DocumentLines = []
    }
  }

  createOrEditService() {
    this.newServiceForm.value.ServiceCallID ? this.store.dispatch(patchServiceCalls({ serviceBody: { ...this.newServiceForm.value, sales: this.sales } })) :
      this.store.dispatch(postServiceCalls({ serviceBody: { ...this.newServiceForm.value, sales: this.sales } }))
  }

  //Función para buscar motos y agregar una nueva moto
  getMotorbikesByBrandAndModel(action: string, motorbike?: any) {
    if (action === "SEARCH") {
      this.store.dispatch(getMotorbikeByBrandAndModel(this.searchOtherMotorbike.value))
    } else if (action !== "SEARCH" && motorbike) {
      this.newServiceForm.controls['ItemCode'].setValue(motorbike.ItemCode)
      this.newServiceForm.controls['ItemDescription'].setValue(motorbike.ItemName)
      this.newServiceForm.controls['U_Marca'].setValue(motorbike.U_Marca)
      this.newServiceForm.controls['U_Modelo'].setValue(motorbike.U_Modelo)
      this.newServiceForm.controls['U_Chasis'].setValue('')
      this.newServiceForm.controls['U_Motor'].setValue('')
    }
  }
  //Función para buscar los items en las operaciones(salidas de mercancía)
  getItemsFromOperation() {
    this.headerOperation = headerOperation
    this.headerItemsSelected = headerItemsSelected
    this.store.dispatch(getItems(this.searchInOperationForm.value))
  }
  //Función para consultar stock y en base a si hay stock agregar el item o no.
  consultStockAndAddItem(item: any) {
    this.store.dispatch(showLoading())
    this.motosService.getItems({ item: item.ItemCode, searchType: 'Código', warehouse: this.officeSelected.BPLName }).subscribe((haveStock: any) => {
      this.store.dispatch(hideLoading())
      if (haveStock && haveStock.message && haveStock.message.includes("No hay")) {
        return this.toastService.showError("Falló", `No hay stock disponible de ${haveStock.itemDescrip} (${haveStock.itemCode}).`)
      } else {
        if (this.sales.DocumentLines.length > 0) {
          let existItem = sales.DocumentLines.filter(({ ItemCode }) => ItemCode === haveStock[0].ItemCode)
          if (!existItem.length) {
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
  //Función para quitar item de la salida
  removeFromSale(ItemCode: string) {
    const indFinded = this.sales.DocumentLines.findIndex((val: any) => val.ItemCode === ItemCode)
    this.sales.DocumentLines = this.sales.DocumentLines.filter((item: any, index: number) => index !== indFinded)
  }
  //Funcion para manejar la cantidad de items que se mandan al realizar una salida
  changeValueQuantityFromItemInSale(ItemCode: string, event: any) {
    const indexFinded = this.sales.DocumentLines.findIndex((val: any) => val.ItemCode === ItemCode)
    this.sales.DocumentLines[indexFinded].Quantity = Number(event.target.value)
  }
  //Función reutilizable para abrir el modal
  openDialog(dialog: TemplateRef<Component>, width: string, height: string) {
    this.dialogService.open(dialog, {
      width: width,
      height: height,
      maxWidth: '90vw'
    })
  }

  //Funcion para cerrar el dialog-modal y resetear el formulario
  dismiss() {
    this.newClientForm.reset()
    this.dialogService.closeAll()
  }
  searchCustomerMotorbike() {
   
    this.headers = headers
    this.headerService = headerService
    if (this.searchForm.value.type === 'Client') {
      this.store.dispatch(search({ Client: this.searchForm.value.search }))
    } else if (this.searchForm.value.type === 'DNI') {
      this.store.dispatch(search({ DNI: this.searchForm.value.search }))
    } else if (this.searchForm.value.type === 'Chasis') {
      this.store.dispatch(search({ Chasis: this.searchForm.value.search }))
    } else if (this.searchForm.value.type === 'Motor') {
      this.store.dispatch(search({ Motor: this.searchForm.value.search }))
    } else if (this.searchForm.value.type === 'ClientName') {
      this.searchByName = true
      this.headers = headerWithName
      this.store.dispatch(search({ ClientName: this.searchForm.value.search }))
    } else {
      this.store.dispatch(search({ Serie: this.searchForm.value.search }))
    }
  }
}

