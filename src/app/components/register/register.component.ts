import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
isLoading:boolean=false;
apiError:string="";

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators: this.checkRepasswordMatch})

  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router) {


  }
  submitRegister(dataForm: FormGroup) {
    this.isLoading=true;
    console.log(dataForm);
    if (dataForm.valid) {
      this._AuthenticationService.signUp(dataForm.value).subscribe({
        next: (Response) => {
          console.log(Response);
          if (Response.message === 'success') {
            // navigate login page
            this._Router.navigate(['/login'])
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
////////
 checkRepasswordMatch(dataForm:any){
  if(dataForm.get('password')?.value === dataForm.get('rePassword')?.value)
    {
      return null;

  }
  else 
  {
    dataForm.get('rePassword')?.setErrors({rePasswordMatch:' rePassword not match password' })
    return{rePasswordMatch:' rePassword not match password' }
  }
 }



}
