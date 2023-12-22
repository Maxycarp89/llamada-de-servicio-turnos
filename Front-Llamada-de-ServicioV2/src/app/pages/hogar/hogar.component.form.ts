import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { LoginState } from 'src/store/login/LoginState';

export class HogarComponentForm {
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

    serviceManageForm(service?: any): FormGroup {
        if (service && service.ServiceCallID) {
            return this.formBuilder.group({
                ServiceCallID: [service.ServiceCallID, [Validators.required]],
                CustomerCode: [service.CustomerCode, [Validators.required]],
                CustomerName: [service.CustomerName, [Validators.required]],
                Description: [service.Description, [Validators.required]],
                BPBillToAddress: [service.BPBillToAddress, [Validators.required]],
                CallType: [service.CallType, [Validators.required]],
                ItemCode: [service.ItemCode, [Validators.required]],
                ItemDescription: [service.ItemDescription, [Validators.required]],
                Origin: [service.Origin, [Validators.required]],
                Priority: [service.Priority, [Validators.required]],
                ProblemSubType: [service.ProblemSubType, [Validators.required]],
                ProblemType: [service.ProblemType, [Validators.required]],
                ServiceBPType: [service.ServiceBPType, [Validators.required]],
                Status: [service.Status, [Validators.required]],
                Subject: [service.Subject, [Validators.required]],
                TechnicianCode: [service.TechnicianCode, [Validators.required]],
                U_Manchado: [service.U_Manchado, [Validators.required]],
                U_Rayado: [service.U_Rayado, [Validators.required]],
                U_Rotura: [service.U_Rotura, [Validators.required]],
                U_TipoOrigen: ['HOGAR'],
                ServiceCallActivities: [service.ServiceCallActivities],
                ClosingDate: [service.ClosingDate],
                Resolution: [service.Resolution],
            })
        } else {
            return this.formBuilder.group({
                CustomerCode: [service.CardCode ? service.CardCode : 'P30623893096', [Validators.required]],
                CustomerName: [service.CardName ? service.CardName : 'YUHMAK S.A.', [Validators.required]],
                Description: ['', [Validators.required]],
                BPBillToAddress: [service.Address ? service.Address : "24 SEPTIEMBRE", [Validators.required]],
                CallType: ['', [Validators.required]],
                ItemCode: [service.ItemCode, [Validators.required]],
                ItemDescription: [service.ItemName ? service.ItemName : service.Dscription, [Validators.required]],
                Origin: ['', [Validators.required]],
                Priority: ['', [Validators.required]],
                ProblemSubType: ['', [Validators.required]],
                ProblemType: ['', [Validators.required]],
                ServiceBPType: [service.CardCode ? 'srvcSales' : 'srvcPurchasing', [Validators.required]],
                Status: [-3, [Validators.required]],
                Subject: ['', [Validators.required]],
                TechnicianCode: ['', [Validators.required]],
                U_Almacen: [this.activeWarehouse],
                U_Manchado: ['', [Validators.required]],
                U_Rayado: ['', [Validators.required]],
                U_Rotura: ['', [Validators.required]],
                U_TipoOrigen: ['HOGAR']
            })
        }
    }

    transferForm(): FormGroup {
        return this.formBuilder.group({
            CardCode: ['', [Validators.required]],
            CardName: ['', [Validators.required]],
            Address: ['', [Validators.required]],
            Comments: ['', [Validators.required]],
            JournalMemo: "Suite Caja",
            PriceList: 1,
            FromWarehouse: [this.loginState.officeSelected.BPLName, [Validators.required]],
            BPLID: [this.loginState.officeSelected.BPLId, [Validators.required]],
            ToWarehouse: ['', [Validators.required]],
            PointOfIssueCode: [this.loginState.ptiCode.PTICode],
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