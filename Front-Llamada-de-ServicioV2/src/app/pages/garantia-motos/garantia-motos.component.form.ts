import { Observable } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/store/AppState";
import { LoginState } from "src/store/login/LoginState";

export class GarantiaMotosComponentForm {
    private formBuilder: FormBuilder
    login$!: Observable<LoginState>;
    loginState!: LoginState
    activeWarehouse!: string

    constructor(
        formBuilder: FormBuilder,
        store?: Store<AppState>
    ) {
        this.formBuilder = formBuilder;
        if (store) {
            this.login$ = store.pipe(select(state => state.login));
            this.login$.subscribe(loginState => {
                this.loginState = loginState
                this.activeWarehouse = loginState.officeSelected.BPLName
            });
        }
    }

    searchItemsFromOperations(): FormGroup {
        return this.formBuilder.group({
            item: ['', [Validators.required]],
            searchType: ['', [Validators.required]],
            warehouse: [this.activeWarehouse]
        })
    }

    createSearchForm(): FormGroup {
        return this.formBuilder.group({
            type: ['DNI', [Validators.required]],
            search: ['', [Validators.required]],
            WhsCode: [this.activeWarehouse]
        })
    }

    createNewService(service: any): FormGroup {
        if (service && service.ServiceCallID) {
            return this.formBuilder.group({
                ServiceCallID: [service.ServiceCallID, [Validators.required]],
                BPBillToAddress: [service.BPBillToAddress, [Validators.required]],
                BPeMail: [service.BPeMail, [Validators.required]],
                CallType: [service.CallType, [Validators.required]],
                CustomerCode: [service.CustomerCode, [Validators.required]],
                CustomerName: [service.CustomerName, [Validators.required]],
                Description: [service.Description, [Validators.required]],
                InternalSerialNum: [service.InternalSerialNum, [Validators.required]],
                ItemCode: [service.ItemCode, [Validators.required]],
                ItemDescription: [service.ItemDescription, [Validators.required]],
                Origin: [service.Origin, [Validators.required]],
                Priority: [service.Priority, [Validators.required]],
                ProblemSubType: [service.ProblemSubType, [Validators.required]],
                ProblemType: [service.ProblemType, [Validators.required]],
                Resolution: [service.Resolution],
                ServiceBPType: [service.ServiceBPType, [Validators.required]],
                Status: [service.Status, [Validators.required]],
                Subject: [service.Subject, [Validators.required]],
                TechnicianCode: [service.TechnicianCode, [Validators.required]],
                Telephone: [service.Telephone, [Validators.required]],
                U_Alarma: [service.U_Alarma, [Validators.required]],
                U_Almacen: [service.U_Almacen, [Validators.required]],
                U_Casco: [service.U_Casco, [Validators.required]],
                U_Chasis: [service.U_Chasis, [Validators.required]],
                U_Patente: [service.U_Patente],
                U_Faltante: [service.U_Faltante, [Validators.required]],
                U_Kilometraje: [service.U_Kilometraje, [Validators.required]],
                U_Kit_Herramientas: [service.U_Kit_Herramientas, [Validators.required]],
                U_Manchado: [service.U_Manchado, [Validators.required]],
                U_Marca: [service.U_Marca],
                U_Modelo: [service.U_Modelo],
                U_Motor: [service.U_Motor, [Validators.required]],
                U_Rayado: [service.U_Rayado, [Validators.required]],
                U_Rotura: [service.U_Rotura, [Validators.required]],
                ServiceCallActivities: [service.ServiceCallActivities],
                City: [service.City],
                U_PedidoRealizado: [service.U_PedidoRealizado],
                U_NumeroPedigoG: [service.U_NumeroPedigoG],
                U_FechaPedidoG: [service.U_FechaPedidoG],
                U_CumplidoGrtia: [service.U_CumplidoGrtia],
                U_ObservaGrtia: [service.U_ObservaGrtia],
                U_UsuarioGrtia: [service.U_UsuarioGrtia],
                U_NumTranferencia: [service.U_NumTranferencia],
                U_FechaTransferencia: [service.U_FechaTransferencia],
                U_ArchivoAdj: [service.U_ArchivoAdj],
                U_EstadoGrtia: [service.U_EstadoGrtia],
                U_Nivel_Combustible: [service.U_Nivel_Combustible, [Validators.required]],
            })
        }
        return this.formBuilder.group({
            CustomerCode: [service.CardCode, [Validators.required]],
            CustomerName: [service?.CardName, [Validators.required]],
            Telephone: [service.Cellular, [Validators.required]],
            BPBillToAddress: [service?.Address, [Validators.required]],
            BPeMail: [service.E_Mail],
            U_Almacen: [this.activeWarehouse],
            ItemCode: [service.ItemCode, [Validators.required]],
            ItemDescription: [service.Dscription, [Validators.required]],
            U_Marca: [service.U_Marca],
            U_Modelo: [service.U_Modelo],
            InternalSerialNum: [service?.IntrSerial, [Validators.required]],
            U_Chasis: [service.U_Chasis, [Validators.required]],
            U_Motor: [service.U_Motor, [Validators.required]],
            City: [service?.Provincia ? service?.Provincia : !!service?.City === true ? service.City : ''],
            U_Casco: ['', [Validators.required]],
            U_Alarma: ['', [Validators.required]],
            U_Rotura: ['', [Validators.required]],
            U_Rayado: ['', [Validators.required]],
            U_Manchado: ['', [Validators.required]],
            U_Kilometraje: ['', [Validators.required]],
            U_Kit_Herramientas: ['', [Validators.required]],
            U_Faltante: ['', [Validators.required]],
            ServiceBPType: [service.CardCode === 'P30623893096' ? 'srvcPurchasing' : 'srvcSales'],
            Subject: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            Priority: ['', [Validators.required]],
            Status: [-3, [Validators.required]],
            CallType: ['', [Validators.required]],
            Origin: ['', [Validators.required]],
            ProblemType: [38, [Validators.required]],
            ProblemSubType: ['', [Validators.required]],
            TechnicianCode: ['', [Validators.required]],
            U_Nivel_Combustible: ['', [Validators.required]],
            U_TipoOrigen: ['M-GARANTIA'],
        })
    }

    transferForm(): FormGroup {
        return this.formBuilder.group({
            CardCode: ['', [Validators.required]],
            CardName: ['', [Validators.required]],
            Address: ['', [Validators.required]],
            Comments: ['', [Validators.required]],
            JournalMemo: "Suite Caja",
            PriceList: 1,
            FromWarehouse: ['047', [Validators.required]],
            BPLID: [103, [Validators.required]],
            ToWarehouse: ['001', [Validators.required]],
            PointOfIssueCode: ['0427'],
            Letter: "fLetterR",
            U_Chofer: null,
            U_Camion: null,
            Series: 27,
            U_escaneo: "",
            StockTransferLines: [[]]
        })
    }

    searchItemInStock(): FormGroup {
        return this.formBuilder.group({
            search: ['', [Validators.required]]
        })
    }
}