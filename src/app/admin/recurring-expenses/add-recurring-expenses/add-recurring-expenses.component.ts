import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecurringExpensesService } from '../../service/recurring-expenses.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { expenses } from '../../models/expenses';
import { ExpensesService } from '../../service/expenses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-recurring-expenses',
  standalone: false,
  templateUrl: './add-recurring-expenses.component.html',
  styleUrl: './add-recurring-expenses.component.scss',
})
export class AddRecurringExpensesComponent implements OnDestroy {
  @Output() dataChanged = new EventEmitter<void>();

  monthlyExpensesForm!: FormGroup;
  statusTypeOptions: string[] = ['Active', 'Inactive'];
  recurringTypeOptions: string[] = ['Monthly', 'Quarterly', 'Yearly'];
  expenses: expenses[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<AddRecurringExpensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private recurringExpensesService: RecurringExpensesService,
    private expensesService: ExpensesService
  ) {
    this.initializeForm();
    this.patchFormData();
    this.getExpenses();
  }

  /**
   * Initialize the form with default values and validation
   */
  initializeForm(): void {
    this.monthlyExpensesForm = this.fb.group({
      id: [null],
      expense_id: ['', Validators.required],
      recurring_type: ['Monthly', Validators.required],
      next_due_date: ['', Validators.required],
      status: ['Active', Validators.required],
    });
  }

  /**
   * Patch the form with existing data if available
   */
  patchFormData(): void {
    if (this.data?.monthlyExpenses) {
      const monthlyExpenses = { ...this.data.monthlyExpenses };

      // Format the date correctly before patching
      if (monthlyExpenses.next_due_date) {
        monthlyExpenses.next_due_date = this.formatDate(
          monthlyExpenses.next_due_date
        );
      }

      this.monthlyExpensesForm.patchValue(monthlyExpenses);
    }
  }

  /**
   * Fetch expenses from the backend
   */
  getExpenses(): void {
    const expenseSub = this.expensesService.getExpenses().subscribe(
      (data: expenses[]) => {
        this.expenses = data;
      },
      (error) => {
        console.error('Error fetching expenses data:', error);
        alert('Failed to load expenses. Please try again.');
      }
    );
    this.subscriptions.add(expenseSub);
  }

  /**
   * Submit handler for the form
   */
  onSubmit(): void {
    if (this.monthlyExpensesForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const monthlyExpensesData = this.monthlyExpensesForm.value;

    // Format the date before submitting
    if (monthlyExpensesData.next_due_date) {
      monthlyExpensesData.next_due_date = this.formatDate(
        monthlyExpensesData.next_due_date
      );
    }

    if (monthlyExpensesData.id) {
      this.updateExpense(monthlyExpensesData);
    } else {
      this.addExpense(monthlyExpensesData);
    }
  }

  /**
   * Add a new recurring expense
   */
  addExpense(monthlyExpensesData: any): void {
    const addSub = this.recurringExpensesService
      .addMonthlyExpense(monthlyExpensesData)
      .subscribe(
        () => {
          console.log('Expense added successfully');
          this.dataChanged.emit();
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error adding expense:', error);
          alert('Failed to add expense. Please try again.');
        }
      );

    this.subscriptions.add(addSub);
  }

  /**
   * Update an existing recurring expense
   */
  updateExpense(monthlyExpensesData: any): void {
    const updateSub = this.recurringExpensesService
      .updateMonthlyExpense(monthlyExpensesData.id, monthlyExpensesData)
      .subscribe(
        () => {
          console.log('Expense updated successfully');
          this.dataChanged.emit();
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error updating expense:', error);
          alert('Failed to update expense. Please try again.');
        }
      );

    this.subscriptions.add(updateSub);
  }

  /**
   * Format date to YYYY-MM-DD
   */
  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', isoDate);
      return isoDate;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Close the dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Clean up subscriptions to prevent memory leaks
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
