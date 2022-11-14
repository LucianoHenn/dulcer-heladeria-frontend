import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(protected router:Router) { }

  ngOnInit(): void {
    if(this.router.url=='/'){
      if(parseInt(localStorage.getItem('rol')!)==0){
        setTimeout(() => {
          this.router.navigate(['./administrador']);
        }, 500); 
      }
      if(parseInt(localStorage.getItem('rol')!)==1){
        setTimeout(() => {
          this.router.navigate(['./vendedor']);
        }, 500); 
      }
    }
    
  }
  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('./auth/login');
  }
}
