import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import {
  NotificacionService,
  TipoMessage,} from 'src/app/share/notificacion.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  hide = true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
    
  }
  reactiveForm() {
    this.formulario = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.mensajes();
  }
  mensajes() {
    // user register successfully
    let registrar = false;
    let auth = '';
    // get url parameters
    this.route.queryParams.subscribe((params) => {
      registrar = params['register'] === 'true' || false;
      auth = params['auth'] || '';
      if (registrar) {
        this.notificacion.mensaje(
          'Usuario',
          'Usuaio registrado! Especifique sus credenciales',
          TipoMessage.success
        );
      }
      if (auth) {
        this.notificacion.mensaje(
          'Usuario',
          'Debe autenticarse para acceder a esta página',
          TipoMessage.warning
        );
      }
    });
  }
  onReset() {
    this.formulario.reset();
  }
  submitForm() {
    this.makeSubmit = true;
    //Validación
    if (this.formulario.invalid) {
      return;
    }
    this.authService
      .loginUser(this.formulario.value)
      .subscribe((respuesta: any) => {
        this.infoUsuario = respuesta;
        if(this.authService.Admin ){
          this.router.navigate(['facturas/rGraficoAdmin']);
        }else if(this.authService.Vendedor){
          this.router.navigate(['facturas/rGraficoVendedor']);
        }else if(this.authService.Cliente) {
        this.router.navigate(['/']);
      }

        this.notificacion.mensaje(
          'Autenticación exitosa',
          'Bienvenido',
          TipoMessage.success
        );
      },
      (error) => {
        this.notificacion.mensaje(
          'Falló la autenticación',
          error.error.message,
          TipoMessage.error
        );
      }
      );
  }
  /* Manejar errores de formulario en Angular */

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}
