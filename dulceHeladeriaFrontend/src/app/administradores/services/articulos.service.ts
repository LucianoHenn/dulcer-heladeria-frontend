import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../interfaces/articulo';
import { Articulos } from '../interfaces/articulos';
import { ArticuloStock } from '../interfaces/articuloStock';
import { UbicacionArticulo } from '../interfaces/ubicacion-articulo';

@Injectable({
  providedIn: 'root',
})
export class ArticulosService {
  constructor(private http: HttpClient) {}

  private jwt: string =localStorage.getItem('token')!

  private _options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'true', 'Authorization' : 'Bearer '+ this.jwt }),
  };

  create(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(
      'https://heladeria-back.herokuapp.com/api/item',
      articulo, this._options
    );
  }
  getAll(): Observable<Articulos[]> {
    return this.http.get<Articulos[]>('https://heladeria-back.herokuapp.com/api/item', this._options);
  }
  getUbicacionesArticulo(idArticulo: number): Observable<UbicacionArticulo[]> {
    return this.http.get<UbicacionArticulo[]>(`https://heladeria-back.herokuapp.com/api/item/${idArticulo}/stock`, this._options);
  }
  
  buscarUbicacionesDisponibles(depositId: number, itemId: number): Observable<any>{
    return this.http.get(`https://heladeria-back.herokuapp.com/api/ItemStock/available?itemId=${itemId}&depositId=${depositId}`, this._options);
  }
  createMovimientoStock(depositId: {}): Observable<any>{
    return this.http.post(`https://heladeria-back.herokuapp.com/api/ItemStock/movement`,depositId, this._options);
  }
  getArticuloById(id: number): Observable<Articulo>{
    return this.http.get(`https://heladeria-back.herokuapp.com/api/item/${id}`, this._options);
  }
  updateArticulo(id: number, articulo: Articulo): Observable<any>{
    return this.http.put(`https://heladeria-back.herokuapp.com/api/item/${id}`,articulo, this._options);
  }
  createIngresoStock(articuloStock: ArticuloStock): Observable<any>{
    return this.http.post("https://heladeria-back.herokuapp.com/api/ItemStock",articuloStock, this._options);
  }
  buscarUbicaciones(depositId: number, itemId: number): Observable<any>{
    return this.http.get(`https://heladeria-back.herokuapp.com/api/ItemStock/locations?itemId=${itemId}&depositId=${depositId}`, this._options);
  }
}
