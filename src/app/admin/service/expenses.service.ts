import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { expenses } from '../models/expenses';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private baseUrl = 'http://localhost:5000/expenses';
  constructor(private http: HttpClient) {}

  getExpenses(): Observable<expenses[]> {
    return this.http.get<expenses[]>(`${this.baseUrl}/`);
  }
  addExpense(expensesData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, expensesData);
  }
  deleteExpense(id: number): Observable<expenses> {
    return this.http.delete<expenses>(`${this.baseUrl}/${id}`);
  }
  updateExpense(id: number, expensesData: any): Observable<expenses> {
    return this.http.put<expenses>(`${this.baseUrl}/${id}`, expensesData);
  }
}
