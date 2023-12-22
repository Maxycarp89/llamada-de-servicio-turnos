import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastsContainerComponent } from '../components/toasts-container/toasts-container.component';

import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { TableComponent } from './components/table/table.component';
import { LoadingComponent } from './components/loading/loading.component';
import { WidgetComponent } from './components/widget/widget.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { HistoryServiceComponent } from './components/history-service/history-service.component';
import { ConfirmationMsgComponent } from './components/confirmation-msg/confirmation-msg.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UpperCaseDirective } from './directive/uppercase.directive';
import { ParsedDirective } from './directive/parsed.directive';

import { SubProblemFilter } from './pipe/sub-problem-type.pipe';
import { ComboFilter } from './pipe/combo-filter.pipe';
import { EmployeesFilter } from './pipe/employees.pipe';
import { WarrantyTypeFilter } from './pipe/manage-type-warranty.pipe';
import { SearchMarcaPipe } from './pipe/marca-filter.pipe';

@NgModule({
    declarations: [ErrorMessageComponent, TableComponent, LoadingComponent, WidgetComponent, CreateCustomerComponent, HistoryServiceComponent, ConfirmationMsgComponent, UpperCaseDirective, ParsedDirective, SubProblemFilter, ComboFilter, EmployeesFilter, WarrantyTypeFilter, SearchMarcaPipe],
    imports: [CommonModule, RouterModule, ToastsContainerComponent, FormsModule, ReactiveFormsModule],
    exports: [ErrorMessageComponent, TableComponent, LoadingComponent, WidgetComponent, CreateCustomerComponent, HistoryServiceComponent, ConfirmationMsgComponent, UpperCaseDirective, ParsedDirective, SubProblemFilter, ComboFilter, EmployeesFilter, WarrantyTypeFilter, SearchMarcaPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CoreModule { }