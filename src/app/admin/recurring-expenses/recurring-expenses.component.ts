import { ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { recurringExpenses } from '../models/expenses';
import { RecurringExpensesService } from '../service/recurring-expenses.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRecurringExpensesComponent } from './add-recurring-expenses/add-recurring-expenses.component';

@Component({
  selector: 'app-recurring-expenses',
  standalone: false,
  templateUrl: './recurring-expenses.component.html',
  styleUrl: './recurring-expenses.component.scss',
})
export class RecurringExpensesComponent {
  displayedColumns: string[] = [
    'sr_no',
    'recurring_type',
    'next_due_date',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<recurringExpenses>();
  expensesData: recurringExpenses[] = [];
  constructor(
    private recurringExpensesService: RecurringExpensesService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getMonthlyExpense();
  }

  // ✅ Calculate total expenses
  // calculateTotalAmount(): number {
  //   return this.expensesData.reduce((total, expense) => {
  //     const amount = Number(expense.amount);
  //     return total + (isNaN(amount) ? 0 : amount);
  //   }, 0);
  // }

  // ✅ Get status class for styling
  getStatusClass(status: string): string {
    return status.toLowerCase() === 'paid' ? 'status-paid' : 'status-pending';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRecurringExpensesComponent, {
      maxHeight: '90vh',
      width: '65%',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMonthlyExpense();
      }
    });
  }

  editMonthlyExpense(monthlyExpenses?: recurringExpenses): void {
    const dialogRef = this.dialog.open(AddRecurringExpensesComponent, {
      maxHeight: '80vh',
      width: '65%',
      maxWidth: '95vw',
      data: monthlyExpenses ? { monthlyExpenses } : null,
    });

    // 🔥 Refresh table after editing
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMonthlyExpense(); // Reload table after closing the dialog
      }
    });
  }

  getMonthlyExpense(): void {
    this.recurringExpensesService.getMonthlyExpense().subscribe(
      (data: recurringExpenses[]) => {
        this.dataSource.data = data;
        this.expensesData = data;
        console.log(this.dataSource.data);

        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching expenses data:', error);
        alert('Failed to load expenses. Please try again.');
      }
    );
  }

  deleteMonthlyExpense(id: number): void {
    if (confirm('Are you sure you want to delete this monthly expense?')) {
      this.recurringExpensesService.deleteMonthlyExpense(id).subscribe({
        next: () => {
          this.getMonthlyExpense();
          alert('Monthly Expense deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting expense:', err);
          alert('Failed to delete Monthly Expense. Please try again.');
        },
      });
    }
  }
}
