import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-metodopago-form',
  templateUrl: './metodopago-form.component.html',
  styleUrls: ['./metodopago-form.component.css']
})
export class MetodopagoFormComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  MetodoDePagoInfo: any;
  currentUser: any;
  respMetodoDePago: any;
  idUsuario: number;
  submitted = false;
  metodoForm: FormGroup;
  idMetodoDePago: number = 0;
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
      if (x && x.user) {
        this.idUsuario = x.user.id;
      }
    });

    this.activeRouter.params.subscribe((params: Params) => {
      this.idMetodoDePago = params['id'];
      if (this.idMetodoDePago != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';

        this.gService.get('metododepago', this.idMetodoDePago)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.MetodoDePagoInfo = data;
            this.metodoForm.patchValue({
              id: this.MetodoDePagoInfo.id,
              Nombre: this.MetodoDePagoInfo.Nombre,
              Tipo: this.MetodoDePagoInfo.Tipo,
              Proveedor: this.MetodoDePagoInfo.Proveedor,
              NumeroDeCuenta: this.MetodoDePagoInfo.NumeroDeCuenta,
              Expira: this.MetodoDePagoInfo.Expira,
              UsuarioID: this.MetodoDePagoInfo.UsuarioID,
            });
          });
      }
    });
  }

  formularioReactive() {
    this.metodoForm = this.fb.group({
      id: [null, null],
      Nombre: [null, Validators.required],
      Tipo: [null, Validators.required],
      Proveedor: [null, Validators.required],
      NumeroDeCuenta: [null, Validators.required],
      Expira: [null, Validators.required],
      UsuarioID: [null, Validators.required],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.metodoForm.controls[control].hasError(error);
  }

  crearMetodoDePago() {
    this.submitted = true;
    this.metodoForm.patchValue({UsuarioID: this.idUsuario});
    console.log(this.metodoForm.value);
    if (this.metodoForm.invalid) {
      return;
    }
    this.metodoForm.value.UsuarioID = this.idUsuario;
    this.gService.create('metododepago', this.metodoForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.respMetodoDePago = data;
        console.log(data);
        this.router.navigate(['/metodopago/usuario', this.idUsuario]);
      });
  }

  actualizarMetodoDePago() {}

  onReset() {
    this.submitted = false;
    this.metodoForm.reset();
  }

  onBack() {
    this.router.navigate(['/metodopago/usuario', this.idUsuario]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
