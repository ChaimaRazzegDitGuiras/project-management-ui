import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  
  currentUser = signal<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('user_role');
    if (token) {
      this.currentUser.set({ token, role });
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_role', res.role);
        this.currentUser.set(res);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user && user.role === 'ADMIN';
  }

  getUserRole(): string | null {
    const user = this.currentUser();
    return user ? user.role : null;
  }
}
