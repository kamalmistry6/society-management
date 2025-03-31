import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { expenses, recurringExpenses } from '../models/expenses';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecurringExpensesService {
  private baseUrl = 'http://localhost:5000/recurring-expenses';
  constructor(private http: HttpClient) {}

  getExpenses(): Observable<expenses[]> {
    return this.http.get<expenses[]>(`${this.baseUrl}/`);
  }

  getMonthlyExpense(): Observable<recurringExpenses[]> {
    return this.http.get<recurringExpenses[]>(`${this.baseUrl}/`);
  }

  addMonthlyExpense(monthlyExpensesData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, monthlyExpensesData);
  }
  deleteMonthlyExpense(id: number): Observable<recurringExpenses> {
    return this.http.delete<recurringExpenses>(`${this.baseUrl}/${id}`);
  }
  updateMonthlyExpense(
    id: number,
    monthlyExpensesData: any
  ): Observable<recurringExpenses> {
    return this.http.put<recurringExpenses>(
      `${this.baseUrl}/${id}`,
      monthlyExpensesData
    );
  }
}
