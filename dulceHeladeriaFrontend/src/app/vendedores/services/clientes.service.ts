import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Cliente } from '../interfaces/cliente-interface';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient) {}
  private jwt: string = localStorage.getItem('token')!;

  private _options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
      Authorization: 'Bearer ' + this.jwt,
    }),
  };

  addCliente(cliente: Cliente) {
    //return this.http.post<any>('https://localhost:5001/api/Client',cliente);
    return this.http.post<Cliente>(
      'https://localhost:5001/api/Client',
      JSON.stringify(cliente),
      this._options
    );
  }

  create(cliente: Cliente): Observable<any> {
    return this.http.post<any>(
      'https://localhost:5001/api/Client',
      cliente,
      this._options
    );
  }
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(
      `https://localhost:5001/api/Client`,
      this._options
    );
  }
  getClienteByNombre(nombre: string): Observable<Cliente> {
    let params = new HttpParams();
    params = params.append('BusinessName', nombre);
    return this.http.get<Cliente>(`https://localhost:5001/api/client/name`, {...this._options, params: params});
  }
  updateCliente(cliente: Cliente): Observable<any>{
    return this.http.put(`https://localhost:5001/api/Client/${cliente.id}`,cliente, this._options);
  }
}
