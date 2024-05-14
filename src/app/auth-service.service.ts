import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://127.0.0.1:8000/api'; 
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(currentUser ? JSON.parse(currentUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) { // Change parameter name to email
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }) // Change property to email
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
