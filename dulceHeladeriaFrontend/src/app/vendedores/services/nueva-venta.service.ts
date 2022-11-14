import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { dtoNuevaVenta } from '../interfaces/dtoVenta';
import { GetVentaDto } from '../interfaces/GetVentaDto';
import { VentaRequestDto } from '../interfaces/ventaRequestDto';

@Injectable({
  providedIn: 'root'
})
export class NuevaVentaService {
  private venta$ = new BehaviorSubject<any>({});
  selectedVenta$ = this.venta$.asObservable();

  private API_URL: string = environment.apiUrlBase;
  private jwt: string =localStorage.getItem('token')!

  private _options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'true', 'Authorization' : 'Bearer '+ this.jwt }),
  };

  constructor(private http: HttpClient) { }

  registrarVenta(venta: VentaRequestDto):Observable<any>{
    return this.http.post<any>('https://heladeria-back.herokuapp.com/api/sale',venta, this._options)
  }
  getVentas(): Observable<GetVentaDto[]>{
    return this.http.get<GetVentaDto[]>("https://heladeria-back.herokuapp.com/api/sale",this._options)
  }

  //   const headers = { 'content-type': 'application/json' }
  //   const body = JSON.stringify(comando);
  //   console.log(body);
  //   return this.http.post(this.API_URL, body, this._options);
  // }
  setVenta(venta: dtoNuevaVenta) {
    this.venta$.next(venta);
  }

}
