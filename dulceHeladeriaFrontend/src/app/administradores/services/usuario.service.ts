import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { usuario } from '../interfaces/Usuario';
import { UsuarioPasswordResponse } from '../interfaces/usuarioPasswordDto';
import { UsuarioResponse } from '../interfaces/usuarioResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = environment.userUrl; 

  constructor(private http:HttpClient) { }

  private jwt: string =localStorage.getItem('token')!

  private _options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'true', 'Authorization' : 'Bearer '+ this.jwt }),
  };

  create(usuario:usuario): Observable<any>{
    return this.http.post<any>('https://localhost:5001/api/User/Register',usuario); 
  }
  getUsers(): Observable<UsuarioResponse[]>{
    return this.http.get<UsuarioResponse[]>("https://localhost:5001/api/user",this._options)
  }
  getUserById(id: number): Observable<UsuarioResponse>{
    return this.http.get<UsuarioResponse>(`https://localhost:5001/api/user/${id}`,this._options);
  }
  changePassword(userId: number, passwords: UsuarioPasswordResponse): Observable<any>{
    return this.http.put<any>(`https://localhost:5001/api/user/${userId}/changepassword`,passwords,this._options);
  }
}
