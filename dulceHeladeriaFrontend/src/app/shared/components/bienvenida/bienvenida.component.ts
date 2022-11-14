import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  constructor() { }
  rol:string;
  ngOnInit(): void {
    if(parseInt(localStorage.getItem('rol')!)==0){
      this.rol='Administrador'
    }
    if(parseInt(localStorage.getItem('rol')!)==1){
      this.rol='Vendedor'
    }
  }

}
