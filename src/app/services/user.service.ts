import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, UserRegister } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  DJANGO_URL: string = "http://127.0.0.1:8000"

  constructor(private http: HttpClient) { }

  registerUser(obj: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(`${this.DJANGO_URL}/api/auth/register`, obj)
  }

  onLogin(obj: LoginModel) {
    return this.http.post<UserRegister>(`${this.DJANGO_URL}/api/auth/login`, obj)
  }
}
