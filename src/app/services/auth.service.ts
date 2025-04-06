// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { profile } from '../auth/models/profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';
  private apiProfileUrl = 'http://localhost:5000/profile';
  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());

  // Shared profile subject
  private profileSubject = new BehaviorSubject<profile | null>(null);
  profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {}

  // REGISTER
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // LOGIN
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        this.storeToken(res.token);
        this.storeRole(res.role);
        this.authStatusSubject.next(true);
      })
    );
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.authStatusSubject.next(false);
    this.profileSubject.next(null);
  }

  // FETCH USER PROFILE
  getProfile(): Observable<profile> {
    return this.http
      .get<profile>(this.apiProfileUrl, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        tap((profile) => this.profileSubject.next(profile)) // Set profile on fetch
      );
  }

  // REFRESH PROFILE (e.g., after photo update)
  refreshProfile(): void {
    this.getProfile().subscribe(); // auto-updates via tap
  }

  // UPDATE PROFILE
  updateProfile(profileData: any): Observable<any> {
    return this.http
      .put(`${this.apiProfileUrl}`, profileData, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        tap(() => this.refreshProfile()) // update shared profile
      );
  }

  // CHANGE PASSWORD
  changePassword(oldPassword: string, newPassword: string) {
    return this.http.put(
      `${this.apiProfileUrl}/change-password`,
      { oldPassword, newPassword },
      {
        headers: this.getAuthHeaders(), // ✅ add this line
      }
    );
  }

  // AUTH HEADER
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
  }

  // TOKEN & ROLE STORAGE
  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private storeRole(role: string): void {
    localStorage.setItem('role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // AUTH CHECKS
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isUser(): boolean {
    return this.getRole() === 'user';
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}
