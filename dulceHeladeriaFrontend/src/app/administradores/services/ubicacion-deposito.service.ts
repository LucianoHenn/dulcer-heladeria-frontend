import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/vendedores/interfaces/articulo';
import { UbicacionDeposito } from '../interfaces/ubicacion-deposito';

@Injectable({
  providedIn: 'root'
})
export class UbicacionDepositoService {

  constructor(private http: HttpClient) { }
  private jwt: string =localStorage.getItem('token')!

  private _options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'true', 'Authorization' : 'Bearer '+ this.jwt }),
  };

  create(ubicacion : UbicacionDeposito): Observable<UbicacionDeposito> {
    return this.http.post<UbicacionDeposito>(
      'https://heladeria-back.herokuapp.com/api/Location',ubicacion, this._options
    );
  }
  
  getAll(): Observable<UbicacionDeposito[]> {
    return this.http.get<UbicacionDeposito[]>('https://heladeria-back.herokuapp.com/api/Location', this._options);
  }
  
}
