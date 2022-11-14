import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userlogin } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  ingresar(user: userlogin): Observable<any> {
    return this.http.post<userlogin>(
      'https://heladeria-back.herokuapp.com/api/User/Login',
      user
    );
  }
}
