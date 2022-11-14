import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { userlogin } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  private sub: Subscription = new Subscription();
  miForm: FormGroup | any= this.fb.group({
    user:['',[Validators.required, Validators.email]],
    password:['', Validators.required]
  })
  user: userlogin;
  constructor(private router:Router, private fb:FormBuilder, private authService:AuthService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    localStorage.clear()
  }
  ingresar(){
    if (this.miForm.valid) {
      this.user = this.miForm.value as userlogin;
      console.log("component",this.user);

      this.sub.add(
        this.authService.ingresar(this.user).subscribe({
          next: (resp: any) => {
            console.log(resp);
            localStorage.setItem('token',resp.accessToken);
            localStorage.setItem('rol',resp.role);
            localStorage.setItem('userId',resp.userId);
            if(parseInt(localStorage.getItem('rol')!) == 0){
              this.router.navigate(['./administrador'])
            }
            if(parseInt(localStorage.getItem('rol')!) == 1){
              this.router.navigate(['./vendedor'])
            }
          },
          error: () => {
            swal.fire("Error!", "Usuario o Contraseña incorrectos!", "error");
          },
        })
      );
      }


  //this.router.navigate(['./administrador'])
  //window.open('http://localhost:4200/vendedor')
  }

}
