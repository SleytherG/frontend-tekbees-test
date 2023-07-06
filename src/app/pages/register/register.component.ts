import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal, {SweetAlertIcon} from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _router: Router
  ) {
    this.registerForm = this._formRegister();
  }



  register() {
    const body = {
      nombres: this.nombresControl.value,
      apellidos: this.apellidosControl.value,
      username: this.usernameControl.value,
      password: this.passwordControl.value
    };
    this.authService.register(body).subscribe({
      next: ( responseService: any ) => {
        const { response } = responseService;
        if ( response.estado == 1) {
          this._showAlertDialog(response.mensaje, 'success')
            .then( result => {
            if ( result.isConfirmed) {
              this._router.navigate(['../login']);
            }
          })
        }
      },
      error: err => {
        this._showAlertDialog(err, "error");
      }
    });
  }

  get nombresControl() {
    return this.registerForm.get('nombres') as FormControl;
  }

  get apellidosControl() {
    return this.registerForm.get('apellidos') as FormControl;
  }

  get usernameControl() {
    return this.registerForm.get('username') as FormControl;
  }

  get passwordControl() {
    return this.registerForm.get('password') as FormControl;
  }

  _showAlertDialog(title: string, icon: SweetAlertIcon) {
    return Swal.fire({
      title: title,
      icon: icon
    })
  }

  private _formRegister(): FormGroup {
    return this.fb.group({
      'nombres': ['', [Validators.required]],
      'apellidos': ['', [Validators.required]],
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      }
    );
  }

}
