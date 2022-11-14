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
      'https://localhost:5001/api/item',
      articulo, this._options
    );
  }
  getAll(): Observable<Articulos[]> {
    return this.http.get<Articulos[]>('https://localhost:5001/api/item', this._options);
  }
  getUbicacionesArticulo(idArticulo: number): Observable<UbicacionArticulo[]> {
    return this.http.get<UbicacionArticulo[]>(`https://localhost:5001/api/item/${idArticulo}/stock`, this._options);
  }
  
  buscarUbicacionesDisponibles(depositId: number, itemId: number): Observable<any>{
    return this.http.get(`https://localhost:5001/api/ItemStock/available?itemId=${itemId}&depositId=${depositId}`, this._options);
  }
  createMovimientoStock(depositId: {}): Observable<any>{
    return this.http.post(`https://localhost:5001/api/ItemStock/movement`,depositId, this._options);
  }
  getArticuloById(id: number): Observable<Articulo>{
    return this.http.get(`https://localhost:5001/api/item/${id}`, this._options);
  }
  updateArticulo(id: number, articulo: Articulo): Observable<any>{
    return this.http.put(`https://localhost:5001/api/item/${id}`,articulo, this._options);
  }
  createIngresoStock(articuloStock: ArticuloStock): Observable<any>{
    return this.http.post("https://localhost:5001/api/ItemStock",articuloStock, this._options);
  }
  buscarUbicaciones(depositId: number, itemId: number): Observable<any>{
    return this.http.get(`https://localhost:5001/api/ItemStock/locations?itemId=${itemId}&depositId=${depositId}`, this._options);
  }
}
