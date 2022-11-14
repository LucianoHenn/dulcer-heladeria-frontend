import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deposito } from '../interfaces/deposito';

@Injectable({
  providedIn: 'root'
})
export class DepositosService {

  constructor(private http: HttpClient) { }
  private jwt: string =localStorage.getItem('token')!

  private _options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'true', 'Authorization' : 'Bearer '+ this.jwt }),
  };
  getAll(): Observable<Deposito[]> {
    return this.http.get<Deposito[]>('https://heladeria-back.herokuapp.com/api/deposit', this._options);
  }
  create(deposito: Deposito): Observable<Deposito> {
    return this.http.post<Deposito>(
      'https://heladeria-back.herokuapp.com/api/deposit',
      deposito, this._options
    );
  }
}
