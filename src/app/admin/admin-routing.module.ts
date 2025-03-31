import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { FlatsComponent } from './flats/flats.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { RecurringExpensesComponent } from './recurring-expenses/recurring-expenses.component';
import { AllotmentComponent } from './allotment/allotment.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'flats', component: FlatsComponent },
  { path: 'members', component: MembersComponent },
  { path: 'allotment', component: AllotmentComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'recurring-expenses', component: RecurringExpensesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
