import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flats } from '../models/flats';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlatService {
  private baseUrl = 'http://localhost:5000/flats';
  constructor(private http: HttpClient) {}

  getFlats(): Observable<flats[]> {
    return this.http.get<flats[]>(`${this.baseUrl}/`);
  }
  addFlat(flatData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, flatData);
  }
  deleteFlat(id: number): Observable<flats> {
    return this.http.delete<flats>(`${this.baseUrl}/${id}`);
  }
  updateFlat(id: number, flatData: any): Observable<flats> {
    return this.http.put<flats>(`${this.baseUrl}/${id}`, flatData);
  }
}
