import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { SharedModule } from '../shared/shared.module';
import { AddMembersComponent } from './members/add-members/add-members.component';
import { FlatsComponent } from './flats/flats.component';
import { AddFlatsComponent } from './flats/add-flats/add-flats.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpensesComponent } from './expenses/add-expenses/add-expenses.component';
import { RecurringExpensesComponent } from './recurring-expenses/recurring-expenses.component';
import { AddRecurringExpensesComponent } from './recurring-expenses/add-recurring-expenses/add-recurring-expenses.component';
import { AllotmentComponent } from './allotment/allotment.component';
import { AddAllotmentComponent } from './allotment/add-allotment/add-allotment.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    MembersComponent,
    AddMembersComponent,
    FlatsComponent,
    AddFlatsComponent,
    ExpensesComponent,
    AddExpensesComponent,
    RecurringExpensesComponent,
    AddRecurringExpensesComponent,
    AllotmentComponent,
    AddAllotmentComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
