import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpensesService } from '../../service/expenses.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-expenses',
  standalone: false,
  templateUrl: './add-expenses.component.html',
  styleUrl: './add-expenses.component.scss',
})
export class AddExpensesComponent {
  @Output() dataChanged = new EventEmitter<void>();
  expensesForm!: FormGroup;
  statusTypeOptions: string[] = ['Paid', 'Pending'];
  paymentMethodOptions: string[] = ['Cash', 'Card', 'Online'];

  constructor(
    private dialogRef: MatDialogRef<AddExpensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private expensesService: ExpensesService
  ) {
    console.log(data);

    this.initializeForm();
    this.patchFormData();
  }

  initializeForm(): void {
    this.expensesForm = this.fb.group({
      id: [null],
      category: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      payment_method: ['', Validators.required],
      expense_date: ['', Validators.required],
      vendor_name: ['', Validators.required],
      invoice_number: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  patchFormData(): void {
    if (this.data?.expenses) {
      const expenses = { ...this.data.expenses };
      this.expensesForm.patchValue(expenses);
    }
  }

  onSubmit(): void {
    if (this.expensesForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const expensesData = this.expensesForm.value;

    if (expensesData.expense_date) {
      expensesData.expense_date = this.formatDate(expensesData.expense_date);
    }

    if (expensesData.id) {
      this.updateExpense(expensesData);
    } else {
      this.addExpense(expensesData);
    }
  }

  updateExpense(expensesData: any): void {
    this.expensesService.updateExpense(expensesData.id, expensesData).subscribe(
      () => {
        console.log('Expense updated successfully');
        this.dataChanged.emit(); // ✅ Emit event when updated
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error updating Expense:', error);
      }
    );
  }

  addExpense(expensesData: any): void {
    this.expensesService.addExpense(expensesData).subscribe(
      () => {
        console.log('Expense added successfully');
        this.dataChanged.emit(); // ✅ Emit event when added
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error adding expense:', error);
      }
    );
  }

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
