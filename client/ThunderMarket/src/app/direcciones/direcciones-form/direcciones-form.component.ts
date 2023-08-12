import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { LocationService } from 'src/app/share/location.service';

@Component({
  selector: 'app-direcciones-form',
  templateUrl: './direcciones-form.component.html',
  styleUrls: ['./direcciones-form.component.css'],
})
export class DireccionesFormComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  DireccionInfo: any;
  currentUser: any;
  respDireccion: any;
  idUsuario: number;
  submitted = false;
  direccionForm: FormGroup;
  idDireccion: number = 0;
  isCreate: boolean = true;
  Provincias: any[];
  Cantones: any[];
  Distritos: any[];
  selectedProvincia: string;
  selectedCanton: string;
  selectedDistrito: string;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService,
    private locationService: LocationService
  ) {
    this.formularioReactive();
    this.getProvincia();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
      if (x && x.user) {
        this.idUsuario = x.user.id;
      }
    });
    this.activeRouter.params.subscribe((params: Params) => {
      this.idDireccion = params['id'];
      if (this.idDireccion != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';

        this.gService
          .get('direccion', this.idDireccion)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.DireccionInfo = data;
            this.direccionForm.patchValue({
              id: this.DireccionInfo.id,
              Provincia: this.DireccionInfo.Provincia,
              Canton: this.DireccionInfo.Canton,
              Distrito: this.DireccionInfo.Distrito,
              CodigoPostal: this.DireccionInfo.CodigoPostal,
              Direccion: this.DireccionInfo.Direccion,
              telefono: this.DireccionInfo.telefono,
              UsuarioID: this.DireccionInfo.UsuarioID,
            });
          });
      }
    });
  }
  crearDirecciones() {
    this.submitted = true;
    this.direccionForm.patchValue({ UsuarioID: this.idUsuario });
    console.log(this.direccionForm.value);

    if (this.direccionForm.invalid) {
      return;
    }

    const direccionData = {
      Provincia: this.selectedProvincia,
      Canton: this.selectedCanton,
      Distrito: this.selectedDistrito,
      CodigoPostal: this.direccionForm.value.CodigoPostal,
      Direccion: this.direccionForm.value.Direccion,
      telefono: this.direccionForm.value.telefono,
      UsuarioID: this.direccionForm.value.UsuarioID,
    };
    this.direccionForm.value.UsuarioID = this.idUsuario;
    this.gService
      .create('direcciones', direccionData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          // La dirección se ha creado exitosamente
          this.respDireccion = data;
          console.log('Dirección creada:', this.respDireccion);

          // Puedes redirigir a otra página o realizar cualquier acción necesaria
          this.router.navigate(['/direcciones/usuario', this.idUsuario]);
        },
        (error) => {
          // Manejar errores si la creación falla
          console.error('Error al crear dirección:', error);
        }
      );
  }

  actualizarDirecciones() {}
  formularioReactive() {
    this.direccionForm = this.fb.group({
      id: [null, null],
      Provincia: [null, Validators.required],
      Canton: [null, Validators.required],
      Distrito: [null, Validators.required],
      CodigoPostal: [null, Validators.required],
      Direccion: [null, Validators.required],
      telefono: [null, Validators.required],
      UsuarioID: [null, Validators.required],
    });
  }

  async getProvincia() {
    this.Provincias = await this.locationService.getProvincia();
    const provincesArray = Object.entries(this.Provincias).map(
      ([id, nombre]) => ({
        id,
        nombre,
      })
    );
    this.Provincias = provincesArray;
  }

  async getCantones(idProvince) {
    this.selectedProvincia = this.Provincias.find(p => p.id === idProvince)?.nombre;
    const cantons = await this.locationService.getCantones(idProvince);
    const cantonsArray = Object.entries(cantons).map(([id, nombre]) => ({
      id,
      nombre,
      provinceId: idProvince,
    }));
    this.Cantones = cantonsArray;
  }
  

 async getDistritos(idCanton, idProvince) {
  console.log('getDistritos called with', idCanton, idProvince);
  
  this.selectedCanton = this.Cantones.find(c => c.id === idCanton)?.nombre;
  this.selectedProvincia = this.Provincias.find(p => p.id === idProvince)?.nombre;
  
  const districts = await this.locationService.getDistritos(idProvince, idCanton);
  const districtsArray = Object.entries(districts).map(([id, nombre]) => ({
    id,
    nombre,
  }));
  this.Distritos = districtsArray;

  // Asignar el valor del primer distrito si está disponible
  if (this.Distritos.length > 0) {
    const firstDistrictName = this.Distritos[0].nombre;
    this.direccionForm.get('Distrito').setValue(firstDistrictName);
    this.selectedDistrito = firstDistrictName;
  }
}

  errorHandling = (control: string, error: string) => {
    return this.direccionForm.controls[control].hasError(error);
  };

  onSubmit() {
    if (this.direccionForm.valid) {
      // Aquí puedes hacer la lógica de guardar la información en tu base de datos
      console.log(this.direccionForm.value);
    }
  }
  onReset() {
    this.submitted = false;
    this.direccionForm.reset();
  }

  onBack() {
    this.router.navigate(['/direcciones/usuario', this.idUsuario]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
