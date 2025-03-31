export interface expenses {
  id: number;
  category: string;
  description: string;
  amount: number;
  payment_method: string;
  expense_date: string;
  vendor_name: string;
  invoice_number: string;
  status: string;
}

export interface recurringExpenses {
  id: number;
  expense_id: number;
  recurring_type: string;
  next_due_date: string | Date;
  status: string;
}
