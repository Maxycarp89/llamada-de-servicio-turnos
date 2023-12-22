import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { search, clearState, getHistory, getItems, postServiceCalls, getMotorbikeByBrandAndModel, getItemsFromExistOperations, clearItemsExistInService, patchServiceCalls, getSpecificHistoryService, getCombos } from 'src/store/motos/motos.action';
import { Observable } from 'rxjs';
import { MotosState } from 'src/store/motos/motosState';
import { MotosComponentForm } from 'src/app/pages/motos/motos.component.form';
import { headers, headerNewMotorbike, sales, headerItemExist, headerService } from './data';
import { MotosService } from 'src/app/pages/motos/service/motos.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { hideLoading, showLoading } from 'src/store/loading/loading.actions';
import { LoginState, Offices } from 'src/store/login/LoginState';
import { Service } from 'src/app/pages/motos/model/Service';
import { CoreState } from 'src/store/core/CoreState';
import * as coreActions from "src/store/core/core.action"
import { manageMsgValidator } from './data/manageMsgValidator';
import * as intrAction from "src/store/moto-interno/moto-interno.action"
import { ServicesService } from 'src/app/pages/motos/service/services.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationMsgComponent } from 'src/app/core/components/confirmation-msg/confirmation-msg.component';

@Component({
  selector: 'app-motos',
  templateUrl: './motos.component.html',
  styleUrls: ['./motos.component.scss']
})

export class MotosComponent implements OnInit {
  searchForm!: FormGroup
  serviceForm!: FormGroup
  searchOtherMotorbike!: FormGroup
  searchInOperationForm!: FormGroup
  changeOwnershipForm!: FormGroup
  searchCustomer!: FormGroup

  sales = sales
  comboSelected!: any
  showSelecCombo!: boolean
  searchByName: boolean = false
  currentPDF: any = null

  motos$: Observable<MotosState>
  motosState!: MotosState
  core$!: Observable<CoreState>
  coreState!: CoreState
  login$!: Observable<LoginState>;
  officeSelected!: Offices
  ptiCode!: any

  headers: string[] = headers
  headerService!: string[]
  headerNewMotorbike!: string[]
  headerItemExist!: string[]
  lastSelectedService!: any
  pageIndex: number = 0
  pageSize: number = 4  
  secondPageIndex: number = 0

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private motosService: MotosService,
    private toastService: ToastService,
    private serviceServices: ServicesService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {
    this.motos$ = this.store.pipe(select(state => state.motos));
    this.core$ = this.store.pipe(select(state => state.core))
    this.motos$.subscribe(motosState => this.motosState = motosState)
    this.core$.subscribe(state => this.coreState = state)
  }

  newServiceClicked() {
    this.serviceForm = new MotosComponentForm(this.formBuilder, this.store).createNewService(this.lastSelectedService)
    this.currentPDF = null
    this.sales.DocumentLines = []
    this.store.dispatch(clearItemsExistInService())
  }

  ngOnInit(): void {
    this.store.dispatch(coreActions.getServiceCallInfo())
    this.searchForm = new MotosComponentForm(this.formBuilder).createSearchForm()
    this.searchOtherMotorbike = new MotosComponentForm(this.formBuilder).searchOtherMotorbike()
    this.login$ = this.store.pipe(select(state => state.login))
    this.login$.subscribe(login => {
      this.officeSelected = login.officeSelected
      this.ptiCode = { ...login.ptiCode, Warehouse: login.officeSelected.BPLName }
    })
  }

  //Función para buscar motos asociadas a un cliente o a un cliente para realizarle la carga de una moto
  searchCustomerMotorbike() {
    const { type } = this.searchForm.value
    this.searchByName = false
    this.headers = headers
    this.headerService = headerService
    type === 'Chasis' ? this.store.dispatch(search({ Chasis: this.searchForm.value.search })) : type === 'DNI' ? this.store.dispatch(search({ DNI: this.searchForm.value.search })) : type === 'Client' ? this.store.dispatch(search({ Client: this.searchForm.value.search })) : type === 'Motor' ? this.store.dispatch(search({ Motor: this.searchForm.value.search })) : this.store.dispatch(search({ Serie: this.searchForm.value.search }))
  }

  //Función para traer el historial.
  getHistory(CustomerCode: string, historyDialog?: TemplateRef<Component>, SpecialSearch?: string) {
    historyDialog && this.openDialog(historyDialog)
    !SpecialSearch ? this.store.dispatch(getHistory({ CustomerCode })) : this.store.dispatch(getHistory({ CustomerCode, SpecialSearch }))
  }


  //? Funciones para manejo de creación y edición de servicios
  //Función para abrir el dialog-modal para crear o editar un service
  openDialogService(service: any, dialog: TemplateRef<Component>) {
    this.headerNewMotorbike = headerNewMotorbike
    this.lastSelectedService = service
    this.currentPDF = null
    this.store.dispatch(getSpecificHistoryService({ CustomerCode: service.CardCode ? service.CardCode : service.CustomerCode, Chasis: service.U_Chasis }))
    this.store.dispatch(getCombos({ CardCode: service.CardCode ? service.CardCode : service.CustomerCode }))
    this.store.dispatch(clearItemsExistInService())
    this.serviceForm = new MotosComponentForm(this.formBuilder, this.store).createNewService(service)
    this.openDialog(dialog)
    this.sales = { ...sales, BPL_IDAssignedToInvoice: this.officeSelected.BPLId }
    this.searchInOperationForm = new MotosComponentForm(this.formBuilder, this.store).searchItemsFromOperations()
    this.comboSelected = null
    this.showSelecCombo = false
  }
  //Funcion para manejar la edición de service al seleccionar uno del historial
  changeFormValues(service: any) {
    this.currentPDF = null
    this.store.dispatch(showLoading())
    const serviceFounded = this.motosState.historyService.filter((serv: Service) => serv.ServiceCallID === parseInt(service.target.value))
    this.store.dispatch(getCombos({ CardCode: serviceFounded[0].CustomerCode }))
    this.serviceServices.servicePDF({ DocEntry: serviceFounded[0].ServiceCallID }).subscribe(resp => {
      const byteCharacters = atob(resp.base64.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const urlPDF = URL.createObjectURL(blob);
      this.currentPDF = this.sanitizer.bypassSecurityTrustResourceUrl(urlPDF)
      this.toastService.showSuccess("Éxito", "PDF cargado exitosamente!")
      this.serviceForm = new MotosComponentForm(this.formBuilder, this.store).createNewService(serviceFounded[0])
      this.showSelecCombo = false
      this.comboSelected = null
      this.sales.DocumentLines = []
      this.store.dispatch(clearItemsExistInService())
      !serviceFounded[0].ServiceCallActivities.length && this.store.dispatch(hideLoading())
      serviceFounded[0].ServiceCallActivities.length > 0 && this.activityConsult(serviceFounded[0].ServiceCallActivities[0].ActivityCode)
    })
  }
  //Función para crear o editar un service
  createOrEditService() {
    const validate = manageMsgValidator(this.serviceForm, this.comboSelected, this.sales)
    if (!!validate === true) return this.toastService.showWarning("Aviso", validate)
    if (this.sales.DocumentLines.length > 0) {
      const modalRef = this.modalService.open(ConfirmationMsgComponent, {
        size: 'lg'
      });
      modalRef.componentInstance.title = "Confirmación de salida de mercancías"
      modalRef.componentInstance.sales = this.sales.DocumentLines
      modalRef.result.then((result) => {
        if (result) {
          if (this.serviceForm.value.ServiceBPType === "srvcSales") {
            this.serviceForm.value.ServiceCallID ? this.store.dispatch(patchServiceCalls({ serviceBody: { ...this.serviceForm.value, sales: this.sales, invoiceBody: this.comboSelected } })) :
              this.store.dispatch(postServiceCalls({ serviceBody: { ...this.serviceForm.value, sales: this.sales } }))
          } else this.store.dispatch(intrAction.patchServiceCall({ serviceCallBody: { ...this.serviceForm.value, sales: this.sales } }))
        }
      });
    } else {
      if (this.serviceForm.value.ServiceBPType === "srvcSales") {
        this.serviceForm.value.ServiceCallID ? this.store.dispatch(patchServiceCalls({ serviceBody: { ...this.serviceForm.value, sales: this.sales, invoiceBody: this.comboSelected } })) :
          this.store.dispatch(postServiceCalls({ serviceBody: { ...this.serviceForm.value, sales: this.sales } }))
      } else this.store.dispatch(intrAction.patchServiceCall({ serviceCallBody: { ...this.serviceForm.value, sales: this.sales } }))
    }
  }
  //? <!--- Fin de las funciones relacionadas al manejo de creación y edición de service  --->







  //! Función relacionada a la creación del remito
  //Funcion para seleccionar el service que se encuentra en el combo y armar el body para poder generar el remito
  selectCombo(combo: any) {
    this.showSelecCombo = false
    const invoiceBody = this.motosState.combos.filter((e: any) => e.DocNum === combo.DocNum)
    this.store.dispatch(showLoading())
    return this.motosService.shipmentEmision({ BPLName: invoiceBody[0].BPLName })
      .subscribe(response => {
        this.store.dispatch(hideLoading())
        this.comboSelected = {
          CardCode: this.serviceForm.value.CustomerCode,
          CardName: this.serviceForm.value.CustomerName,
          BPLName: invoiceBody[0].BPLName,
          PointOfIssueCode: response[0].PTICode,
          DocumentLines: invoiceBody.map((com: any) => {
            return {
              ItemCode: com.ItemCode,
              Quantity: com.id__ === combo.id__ ? 1 : 0,
              Price: com.Price,
              Warehouse: com.BPLName,
              ProjectCode: "Servicio_Postventa",
              AccountCode: "4.1.010.10.001",
              BaseType: '13',
              BaseEntry: com.DocEntry,
              BaseLine: com.LineNum
            }
          })
        }
      })
  }
  //! <!--- Fin de las funciones relacionadas a la creación del remito  --->







  //? Funciones para manejar los datos de la llamada
  //Función para buscar motos y agregar una nueva moto
  getMotorbikesByBrandAndModel(action: string, motorbike?: any) {
    if (action === "SEARCH") {
      this.store.dispatch(getMotorbikeByBrandAndModel(this.searchOtherMotorbike.value))
      this.secondPageIndex = 0
    } else if (action !== "SEARCH" && motorbike) {
      this.serviceForm.controls['ItemCode'].setValue(motorbike.ItemCode)
      this.serviceForm.controls['ItemDescription'].setValue(motorbike.ItemName)
      this.serviceForm.controls['U_Marca'].setValue(motorbike.U_Marca)
      this.serviceForm.controls['U_Modelo'].setValue(motorbike.U_Modelo)
      this.serviceForm.controls['U_Chasis'].setValue('')
      this.serviceForm.controls['U_Motor'].setValue('')
      this.serviceForm.controls['InternalSerialNum'].setValue(null)
    }
  }
  //Funcion para elegir los combos pertenecientes al cliente al momento de cerrar el service
  openChooseCombo(status: string) {
    if (parseInt(status) === -1) {
      this.showSelecCombo = true
      this.serviceForm.controls['Resolution'].setValidators([Validators.required])
    } else {
      this.showSelecCombo = false
      this.comboSelected = null
      this.serviceForm.controls['Resolution'].setValidators([])
      this.serviceForm.controls['Resolution'].setValue(null)
    }
  }
  //Función paral impiar el subtipo de problema ya ingresado en caos de que se cambie el tipo de problema principal
  clearSubProblemType(status: string) {
    this.serviceForm.controls['ProblemSubType'].setValue('')
    if (parseInt(status) !== 34 && parseInt(status) !== 37) this.comboSelected = null
    else this.showSelecCombo = true
  }
  //? <!--- Fin de las funciones relacionadas al manejo de datos de la llamada  --->



  //! Funciones relacionadas a las salidas de mercancías
  //Función para buscar los items en las operaciones(salidas de mercancía)
  getItemsFromOperation() {
    this.pageIndex = 0
    this.store.dispatch(getItems(this.searchInOperationForm.value))
  }
  //Función para consultar la salida de mercancía realizada
  activityConsult(id: number) {
    this.store.dispatch(getItemsFromExistOperations({ ActivityCode: id }))
    this.headerItemExist = headerItemExist
  }
  //Función para consultar stock y en base a si hay stock agregar el item o no.
  consultStockAndAddItem(item: any) {
    this.store.dispatch(showLoading())
    this.motosService.getItems({ item: item.ItemCode, searchType: 'Código', warehouse: this.officeSelected.BPLName }).subscribe((haveStock: any) => {
      this.store.dispatch(hideLoading())
      if (haveStock && haveStock.message && haveStock.message.includes("No hay")) return this.toastService.showError("Falló", `No hay stock disponible de ${haveStock.itemDescrip} (${haveStock.itemCode}).`)
      else {
        if (this.sales.DocumentLines.length > 0) {
          let existItem = this.sales.DocumentLines.filter(({ ItemCode }) => ItemCode === haveStock[0].ItemCode)
          if (existItem.length > 0) return this.toastService.showWarning("Aviso", "Ya existe el item que intentas seleccionar")
          else this.sales = {
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
        } else this.sales = {
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
    })
  }
  //Función para quitar item seleccionados para la salida de mercancia
  removeFromSale(ItemCode: string) {
    const indFinded = this.sales.DocumentLines.findIndex((val: any) => val.ItemCode === ItemCode)
    this.sales.DocumentLines = this.sales.DocumentLines.filter((item: any, index: number) => index !== indFinded)
  }
  //Funcion para manejar la cantidad de items que se mandan al realizar una salida
  changeValueQuantityFromItemInSale(ItemCode: string, event: any) {
    console.log(ItemCode, event)
    const indexFinded = this.sales.DocumentLines.findIndex((val: any) => val.ItemCode === ItemCode)
    this.sales.DocumentLines[indexFinded].Quantity = Number(event.target.value)
  }
  //! <!--- Fin de las funciones relacionadas a las salidas de mercancías  --->







  //? Funciones reutilizables
  //Función reutilizable para abrir el modal
  openDialog(dialog: TemplateRef<Component>) {
    this.modalService.open(dialog, {
      size: 'xl',
      centered: true
    });
  }
  //Funcion para cerrar el dialog-modal y resetear el formulario
  dismiss() {
    this.modalService.dismissAll()
  }
  //Función para limpiar el estado global del service de motos cuando se cambie el filtro de busqueda
  clearState() {
    this.store.dispatch(clearState())
  }
  //? <!--- Fin de las funciones reutilizables  --->
}
