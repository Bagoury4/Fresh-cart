import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  isLoading:boolean=false;
apiError:string="";

  loginForm: FormGroup = new FormGroup({
   
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
   
  })
  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router) {


  }
  submitLogin(dataForm: FormGroup) {
    this.isLoading=true;
    console.log(dataForm);
    if (dataForm.valid) {
      this._AuthenticationService.signIn(dataForm.value).subscribe({
        next: (Response) => {
          console.log(Response);
          if (Response.message === 'success') {
            localStorage.setItem('userToken',Response.token)
            this._AuthenticationService.decodeUserToken();
            this._Router.navigate(['/home'])
            this.isLoading=false;
          }

        },
        error: (err) => {
          console.log(err);
          this.isLoading=false;
          this.apiError=err.error.message
        }

      })
    }
  }
}
