import { ChangeDetectorRef, Component } from '@angular/core';
import { ExpensesService } from '../service/expenses.service';
import { MatDialog } from '@angular/material/dialog';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { expenses } from '../models/expenses';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-expenses',
  standalone: false,
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  displayedColumns: string[] = [
    'sr_no',
    'category',
    'description',
    'amount',
    'payment_method',
    'expense_date',
    'vendor_name',
    'invoice_number',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<expenses>();
  expensesData: expenses[] = [];
  constructor(
    private expensesService: ExpensesService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getExpenses();
  }

  // ✅ Calculate total expenses
  calculateTotalAmount(): number {
    return this.expensesData.reduce((total, expense) => {
      const amount = Number(expense.amount);
      return total + (isNaN(amount) ? 0 : amount);
    }, 0);
  }

  // ✅ Get status class for styling
  getStatusClass(status: string): string {
    return status.toLowerCase() === 'paid' ? 'status-paid' : 'status-pending';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddExpensesComponent, {
      maxHeight: '90vh',
      width: '65%',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getExpenses();
      }
    });
  }

  editExpense(expenses?: expenses): void {
    const dialogRef = this.dialog.open(AddExpensesComponent, {
      maxHeight: '80vh',
      width: '65%',
      maxWidth: '95vw',
      data: expenses ? { expenses } : null,
    });

    // 🔥 Refresh table after editing
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getExpenses(); // Reload table after closing the dialog
      }
    });
  }

  getExpenses(): void {
    this.expensesService.getExpenses().subscribe(
      (data: expenses[]) => {
        this.dataSource.data = data;
        this.expensesData = data;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching expenses data:', error);
        alert('Failed to load expenses. Please try again.');
      }
    );
  }

  deleteExpense(id: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expensesService.deleteExpense(id).subscribe({
        next: () => {
          this.getExpenses(); // 🔥 Refresh table after deleting
          alert('Expense deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting expense:', err);
          alert('Failed to delete expense. Please try again.');
        },
      });
    }
  }
}
