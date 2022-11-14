import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { movimiento } from '../interfaces/Movimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  
  private jwt: string =localStorage.getItem('token')!

  private _options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'true', 'Authorization' : 'Bearer '+ this.jwt }),
  };


  constructor(
    private http:HttpClient,
    public datepipe: DatePipe
    ) { }

  getMovimietos() {
    return this.http.get<movimiento[]>('https://heladeria-back.herokuapp.com/api/Movement', this._options);
  }

  getMovimietosByItem(id : number) {
    return this.http.get<movimiento[]>('https://heladeria-back.herokuapp.com/api/Movement/item?itemId=' + id, this._options);
  }

  getMovimietosByDates(start:Date, end:Date) {
    let newStart = this.datepipe.transform(start,"yyyy-MM-dd");
    let newEnd = this.datepipe.transform(end,"yyyy-MM-dd");
    return this.http.get<movimiento[]>(`https://heladeria-back.herokuapp.com/api/Movement/dates?start=${newStart}&end=${newEnd}`, this._options);
  }

}
