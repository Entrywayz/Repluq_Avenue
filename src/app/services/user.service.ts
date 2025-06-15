import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, UserRegister } from '../models/models';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { StorageService } from './storage.service';

interface LogData {
  id: string,
  email: string
  refresh: string
  access: string
}
@Injectable({
  providedIn: 'root'
})

export class UserService {

  DJANGO_URL: string = "http://127.0.0.1:8000"
  logdata: LogData | null = null; 

  constructor(private http: HttpClient, private storage: StorageService) {
    const storedData = this.storage.getItem('logdata');
    if (storedData) {
      try {
        this.logdata = JSON.parse(storedData) as LogData; 
      } catch (e) {
        console.error("Failed to parse logdata:", e);
        this.logdata = null;
      }
    }
  }

  registerUser(obj: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(`${this.DJANGO_URL}/api/auth/register`, obj)
  }

  onLogin(obj: LoginModel) {
    return this.http.post<UserRegister>(`${this.DJANGO_URL}/api/auth/login`, obj)
  }

  logout(): Observable<any> {
    const logdata = JSON.parse(localStorage.getItem('logdata') || '{}');
    
    if (!logdata?.refresh) {
      localStorage.removeItem('logdata');
      return of(null);
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${logdata.access}`  // Добавляем access_token
    });
  
    return this.http.post(`${this.DJANGO_URL}/api/auth/logout`, { refresh: logdata.refresh }, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('logdata');  // Очищаем localStorage после успеха
      }),
      catchError(error => {
        localStorage.removeItem('logdata');  // Очищаем даже при ошибке
        return throwError(() => error);
      })
    );
  }
}