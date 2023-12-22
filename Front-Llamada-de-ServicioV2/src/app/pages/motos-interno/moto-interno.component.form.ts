import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { LoginState } from 'src/store/login/LoginState';

export class MotoInternoComponentForm {
    private formBuilder: FormBuilder
    login$!: Observable<LoginState>;
    loginState!: LoginState
    activeWarehouse!: string

    constructor(formBuilder: FormBuilder, store?: Store<AppState>) {
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
            type: ['NameOrCode', [Validators.required]],
            search: ['', [Validators.required]]
        })
    }

    createNewService(service: any) {
        if (service && service.ServiceCallID) {
            return this.formBuilder.group({
                ServiceCallID: [service.ServiceCallID, [Validators.required]],
                BPBillToAddress: [service.BPBillToAddress, [Validators.required]],
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
                U_Almacen: [service.U_Almacen, [Validators.required]],
                U_Alarma: [service.U_Alarma, [Validators.required]],
                U_Casco: [service.U_Casco, [Validators.required]],
                U_Chasis: [service.U_Chasis, [Validators.required]],
                U_Faltante: [service.U_Faltante, [Validators.required]],
                U_Kit_Herramientas: [service.U_Kit_Herramientas, [Validators.required]],
                U_Manchado: [service.U_Manchado, [Validators.required]],
                U_Rayado: [service.U_Rayado, [Validators.required]],
                U_Rotura: [service.U_Rotura, [Validators.required]],
                U_Motor: [service.U_Motor, [Validators.required]],
                ServiceCallActivities: [service.ServiceCallActivities],
                U_TipoOrigen: ['M-INTERNO'],
                ClosingDate: [service.ClosingDate],
            })
        }
        return this.formBuilder.group({
            CallType: ['', [Validators.required]],
            CustomerCode: ['P30623893096', [Validators.required]],
            CustomerName: ['YUHMAK S.A.', [Validators.required]],
            Description: ['', [Validators.required]],
            BPBillToAddress: ["24 SEPTIEMBRE", [Validators.required]],
            InternalSerialNum: [service.IntrSerial, [Validators.required]],
            ItemCode: [service.ItemCode, [Validators.required]],
            ItemDescription: [service.ItemName, [Validators.required]],
            Origin: ['', [Validators.required]],
            Priority: ['', [Validators.required]],
            ProblemSubType: ['', [Validators.required]],
            ProblemType: ['', [Validators.required]],
            ServiceBPType: ['srvcPurchasing', [Validators.required]],
            Status: [-3, [Validators.required]],
            Subject: ['', [Validators.required]],
            TechnicianCode: ['', [Validators.required]],
            U_Almacen: [this.activeWarehouse],
            U_Chasis: [service.U_Chasis, [Validators.required]],
            U_Motor: [service.U_Motor, [Validators.required]],
            U_Alarma: ['', [Validators.required]],
            U_Casco: ['', [Validators.required]],
            U_Faltante: ['', [Validators.required]],
            U_Kit_Herramientas: ['', [Validators.required]],
            U_Manchado: ['', [Validators.required]],
            U_Rayado: ['', [Validators.required]],
            U_Rotura: ['', [Validators.required]],
            U_TipoOrigen: ['M-INTERNO']
        })
    }

    searchItemsFromOperations(): FormGroup {
        return this.formBuilder.group({
            item: ['', [Validators.required]],
            searchType: ['', [Validators.required]],
            warehouse: [this.activeWarehouse]
        })
    }

}