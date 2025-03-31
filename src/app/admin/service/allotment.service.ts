import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { allotment } from '../models/allotment';

@Injectable({
  providedIn: 'root',
})
export class AllotmentService {
  private baseUrl = 'http://localhost:5000/allotments';
  constructor(private http: HttpClient) {}

  getAllotments(): Observable<allotment[]> {
    return this.http.get<allotment[]>(`${this.baseUrl}/`);
  }
  addAllotment(allotmentData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, allotmentData);
  }
  deleteAllotment(id: number): Observable<allotment> {
    return this.http.delete<allotment>(`${this.baseUrl}/${id}`);
  }
  updateAllotment(id: number, allotmentData: any): Observable<allotment> {
    return this.http.put<allotment>(`${this.baseUrl}/${id}`, allotmentData);
  }
}
