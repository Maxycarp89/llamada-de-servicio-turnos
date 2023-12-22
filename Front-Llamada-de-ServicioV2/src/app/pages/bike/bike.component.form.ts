import { Observable } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/store/AppState";
import { LoginState } from "src/store/login/LoginState";

export class BikesComponentForm {
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

    createSearchForm(): FormGroup {
        return this.formBuilder.group({
            type: ['DNI', [Validators.required]],
            search: ['', [Validators.required]]
        })
    }

    createNewClient(): FormGroup {
        return this.formBuilder.group({
            CardName: ['', [Validators.required]],
            FederalTaxID: ['', [Validators.required]],
            Cellular: ['', [Validators.required]],
            Address: ['', [Validators.required]],
            EmailAddress: ['', [Validators.email, Validators.required]],
            Series: [146, [Validators.required]],
            County: ['', [Validators.required]],
            CardType: ['cCustomer'],
            City: ['', [Validators.required]],
            U_B1SYS_VATCtg: ['CF', [Validators.required]],
            ZipCode: ['', [Validators.required]]
        })
    }

    createNewService(service: any): FormGroup {
        if (service && service.ServiceCallID) {
            return this.formBuilder.group({
                ServiceCallID: [service.ServiceCallID, [Validators.required]],
                BPBillToAddress: [service.BPBillToAddress],
                BPeMail: [service.BPeMail, [Validators.required]],
                CallType: [service.CallType, [Validators.required]],
                CustomerCode: [service.CustomerCode, [Validators.required]],
                CustomerName: [service.CustomerName, [Validators.required]],
                Description: [service.Description, [Validators.required]],
                InternalSerialNum: [service.InternalSerialNum],
                ItemCode: [service.ItemCode, [Validators.required]],
                ItemDescription: [service.ItemDescription, [Validators.required]],
                Origin: [service.Origin, [Validators.required]],
                Priority: [service.Priority, [Validators.required]],
                ProblemSubType: [service.ProblemSubType, [Validators.required]],
                ProblemType: [service.ProblemType, [Validators.required]],
                Resolution: [service.Resolution !== null ? service.Resolution : null],
                ServiceBPType: [service.ServiceBPType, [Validators.required]],
                Status: [service.Status, [Validators.required]],
                Subject: [service.Subject, [Validators.required]],
                TechnicianCode: [service.TechnicianCode, [Validators.required]],
                U_Almacen: [service.U_Almacen, [Validators.required]],
                U_Chasis: [service.U_Chasis, [Validators.required]],
                U_Faltante: [service.U_Faltante, [Validators.required]],
                U_Manchado: [service.U_Manchado, [Validators.required]],
                U_Rayado: [service.U_Rayado, [Validators.required]],
                U_Rotura: [service.U_Rotura, [Validators.required]],
                ServiceCallActivities: [service.ServiceCallActivities],
                ClosingDate: [service.ClosingDate !== null ? service.ClosingDate : null],
                U_TipoOrigen: ['BIKES'],
                U_Marca: [service.U_Marca],
                U_Modelo: [service.U_Modelo]
            })
        } else {
            return this.formBuilder.group({
                CustomerCode: [service?.CardCode ? service.CardCode : service?.CustomerCode, [Validators.required]],
                CustomerName: [service?.CardName ? service.CardName : service.CustomerName, [Validators.required]],
                BPBillToAddress: [service.BPBillToAddress ? service.BPBillToAddress : service.Address ? service.Address : ""],
                BPeMail: [service.BPeMail ? service.BPeMail : service.EmailAddress ? service.EmailAddress : '', [Validators.required, Validators.email]],
                U_Almacen: [this.activeWarehouse],
                ItemCode: [service?.ItemCode ? service?.ItemCode : '', [Validators.required]],
                ItemDescription: [service?.Dscription ? service?.Dscription : service.ItemDescription ? service.ItemDescription : '', [Validators.required]],
                InternalSerialNum: [service?.InternalSerialNum ? service.InternalSerialNum : service.IntrSerial ? service?.IntrSerial : null],
                U_Chasis: [service?.U_Chasis ? service?.U_Chasis : '', [Validators.required]],
                U_Faltante: ['', [Validators.required]],
                U_Rayado: ['', [Validators.required]],
                U_Manchado: ['', [Validators.required]],
                U_Rotura: ['', [Validators.required]],
                ServiceBPType: ['srvcSales'],
                Subject: ['', [Validators.required]],
                Description: ['', [Validators.required]],
                Priority: ['', [Validators.required]],
                Status: [-3, [Validators.required]],
                CallType: ['', [Validators.required]],
                Origin: [null, [Validators.required]],
                ProblemType: ['', [Validators.required]],
                ProblemSubType: ['', [Validators.required]],
                TechnicianCode: ['', [Validators.required]],
                U_TipoOrigen: ['BIKES'],
                U_Marca: [''],
                U_Modelo: ['']
            })
        }
    }

    searchItemsFromOperations(): FormGroup {
        return this.formBuilder.group({
            item: ['', [Validators.required]],
            searchType: ['', [Validators.required]],
            warehouse: [this.activeWarehouse]
        })
    }

    searchOtherMotorbike(): FormGroup {
        return this.formBuilder.group({
            itemorcode: ['', [Validators.required]],
        })
    }
}