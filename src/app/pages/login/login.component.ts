import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Login} from "../../models/Auth";
import {AuthService} from "../../services/auth.service";
import Swal, {SweetAlertIcon} from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this._buildLoginForm();
  }

  get usernameControl() {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }

  login() {
    const body: Login = {
      username: this.usernameControl.value,
      password: this.passwordControl.value
    };

    this.authService.login(body).subscribe({
      next: (responseService : any) => {
        const { response } = responseService;
        if ( response.estado == 1) {
          this._showAlertDialog('Sesión iniciada correctamente', "success")
            .then( result => {
              localStorage.setItem('username', this.usernameControl.value);
              this.router.navigate(['../home']);
            });
        }
      },
      error: err => {}
    })


  }

  private _showAlertDialog( title: string, icon: SweetAlertIcon) {
    return Swal.fire({
      title: title,
      icon: icon
    })
  }


  private _buildLoginForm() : FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

}
