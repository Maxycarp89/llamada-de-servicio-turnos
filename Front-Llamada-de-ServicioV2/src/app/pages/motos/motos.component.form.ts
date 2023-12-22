import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { LoginState } from 'src/store/login/LoginState';

export class MotosComponentForm {
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
            City: ['', [Validators.required]],
            U_B1SYS_VATCtg: ['CF', [Validators.required]],
            ZipCode: ['', [Validators.required]]
        })
    }

    createNewService(service: any): FormGroup {
        if (service && service.ServiceCallID) {
            return this.formBuilder.group({
                ServiceCallID: [service.ServiceCallID, [Validators.required]],
                BPBillToAddress: [service.BPBillToAddress, [Validators.required]],
                BPeMail: [service.BPeMail, [Validators.required, Validators.email]],
                CallType: [service.CallType, [Validators.required]],
                CustomerCode: [service.CustomerCode, [Validators.required]],
                CustomerName: [service.CustomerName, [Validators.required]],
                Description: [service.Description, [Validators.required]],
                InternalSerialNum: [service.InternalSerialNum],
                ItemCode: [service.ItemCode, [Validators.required]],
                ItemDescription: [service.ItemDescription, [Validators.required]],
                Origin: [service.Origin, [Validators.required]],
                Priority: [service.Priority, [Validators.required]],
                CreationDate: [service.CreationDate],
                ClosingDate: [service.ClosingDate],
                Resolution: [service.Resolution],
                ProblemSubType: [service.ProblemSubType, [Validators.required]],
                ProblemType: [service.ProblemType, [Validators.required]],
                ServiceBPType: [service.ServiceBPType, [Validators.required]],
                Status: [service.Status, [Validators.required]],
                Subject: [service.Subject, [Validators.required]],
                TechnicianCode: [service.TechnicianCode, [Validators.required]],
                Telephone: [service.Telephone],
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
                U_Nivel_Combustible: [service.U_Nivel_Combustible, [Validators.required]],
                ServiceCallActivities: [service.ServiceCallActivities],
                City: [service.City],
                U_NombColor: [service.U_NombColor],
                U_TipoOrigen: [service.ServiceBPType === 'srvcSales' ? 'MOTO' : 'M-INTERNO'],
            })
        }
        return this.formBuilder.group({
            CustomerCode: [service?.CardCode ? service.CardCode : service?.CustomerCode, [Validators.required]],
            CustomerName: [service?.CardName ? service.CardName : service.CustomerName, [Validators.required]],
            Telephone: [service?.Cellular ? service.Cellular : service.Telephone ? service.Telephone : ''],
            BPBillToAddress: [service?.AliasName ? service?.AliasName : service?.Address ? service.Address : service.BPBillToAddress, [Validators.required]],
            BPeMail: [service?.E_Mail ? service?.E_Mail : service?.EmailAddress ? service?.EmailAddress : service.BPeMail ? service.BPeMail : '', [Validators.required, Validators.email]],
            U_Almacen: [this.activeWarehouse],
            ItemCode: [service?.ItemCode ? service?.ItemCode : '', [Validators.required]],
            ItemDescription: [service?.Dscription ? service?.Dscription : service.ItemDescription ? service.ItemDescription : '', [Validators.required]],
            U_Marca: [service?.U_Marca ? service?.U_Marca : ''],
            U_Modelo: [service?.U_Modelo ? service?.U_Modelo : ''],
            InternalSerialNum: [service?.IntrSerial ? service?.IntrSerial : service.InternalSerialNum ? service.InternalSerialNum : null],
            U_Chasis: [service?.U_Chasis ? service?.U_Chasis : '', [Validators.required]],
            U_Patente: [service.U_Patente ? service.U_Patente : ''],
            U_Motor: [service?.U_Motor ? service?.U_Motor : '', [Validators.required]],
            U_Kilometraje: ['', [Validators.required]],
            City: [service?.Provincia ? service?.Provincia : !!service?.City === true ? service.City : ''],
            U_Casco: ['', [Validators.required]],
            U_Alarma: ['', [Validators.required]],
            U_Rotura: ['', [Validators.required]],
            U_Rayado: ['', [Validators.required]],
            U_Manchado: ['', [Validators.required]],
            U_Kit_Herramientas: ['', [Validators.required]],
            U_Faltante: ['', [Validators.required]],
            U_Nivel_Combustible: ['', [Validators.required]],
            ServiceBPType: ['srvcSales'],
            Subject: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            Priority: ['', [Validators.required]],
            Status: [-3, [Validators.required]],
            CallType: ['', [Validators.required]],
            Origin: [null, [Validators.required]],
            ProblemType: ['', [Validators.required]],
            ProblemSubType: ['', [Validators.required]],
            TechnicianCode: [null, [Validators.required]],
            U_NombColor: [service.Color ? service.Color : service.U_NombColor ? service.U_NombColor : null],
            U_TipoOrigen: ['MOTO'],
        })
    }

    searchOtherMotorbike(): FormGroup {
        return this.formBuilder.group({
            brand: ['', [Validators.required]],
            model: ['', [Validators.required]]
        })
    }

    searchItemsFromOperations(): FormGroup {
        return this.formBuilder.group({
            item: ['', [Validators.required]],
            searchType: ['', [Validators.required]],
            warehouse: [this.activeWarehouse]
        })
    }

    changeOwnership(motorbike: any) {
        return this.formBuilder.group({
            OldCustomerCode: [motorbike.CardCode, [Validators.required]],
            OldCustomerName: [motorbike.CardName, [Validators.required]],
            NewCustomerCode: ['', [Validators.required]],
            NewCustomerName: ['', [Validators.required]],
            ItemCode: [motorbike.ItemCode, [Validators.required]],
            ItemDescription: [motorbike.Dscription, [Validators.required]],
            InternalSerialNum: [motorbike.IntrSerial, [Validators.required]],
            ServiceBPType: ['et_Sales'],
            StatusOfSerialNumber: ['sns_Active']
        })
    }

    searchCustomer() {
        return this.formBuilder.group({
            search: ['', [Validators.required]]
        })
    }
}