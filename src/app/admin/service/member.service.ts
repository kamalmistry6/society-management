import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { members } from '../models/members';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl = 'http://localhost:5000/members';
  constructor(private http: HttpClient) {}

  getMembers(filter: { [key: string]: string } = {}): Observable<members[]> {
    let params = new HttpParams();

    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        params = params.set(key, filter[key]);
      }
    });

    return this.http.get<members[]>(`${this.baseUrl}`, { params });
  }

  addMember(memberData: members): Observable<members> {
    return this.http.post<members>(this.baseUrl, memberData);
  }
  deleteMember(id: number): Observable<members> {
    return this.http.delete<members>(`${this.baseUrl}/${id}`);
  }
  updateMember(id: number, memberData: members): Observable<members> {
    return this.http.put<members>(`${this.baseUrl}/${id}`, memberData);
  }
}
