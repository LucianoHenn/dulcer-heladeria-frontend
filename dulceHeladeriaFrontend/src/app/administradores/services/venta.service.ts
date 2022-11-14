import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { range } from '../interfaces/range';
import { ventaPorDia } from '../interfaces/ventaPordia';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http:HttpClient, public datepipe: DatePipe) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      withCredentials: 'true',
      Authorization: 'my-auth-token'
    })
  };

  private jwt: string =localStorage.getItem('token')!

  private _options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'true', 'Authorization' : 'Bearer '+ this.jwt }),
  };

  getAllVenta(range:range): Observable<any> {
    let newStart = this.datepipe.transform(range.start,"yyyy-MM-dd");
    let newEnd = this.datepipe.transform(range.end,"yyyy-MM-dd");
    return this.http.get(`https://localhost:5001/range?start=${newStart}&end=${newEnd}`,this._options);
  }

  getAllVenta2(start:Date, end:Date): Observable<any> {
    let newStart = this.datepipe.transform(start,"yyyy-MM-dd");
    let newEnd = this.datepipe.transform(end,"yyyy-MM-dd");
    return this.http.get(`https://localhost:5001/range?start=${newStart}&end=${newEnd}`,this._options);
  }

  getVentaConMetodoPago(start:Date): Observable<any> {
    let newStart = this.datepipe.transform(start,"yyyy-MM-dd");
    return this.http.get(`https://localhost:5001/day?start=${newStart}`,this._options);
  }

}

