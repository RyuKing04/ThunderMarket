import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  hide=true;
  Usuario:any;
  roles:any;
  filteredRoles:any[];
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    private fb: FormBuilder,
    private gService: GenericService, 
    private router: Router,
    private authService: AuthenticationService,
  ) {  
    this.reactiveForm();
   }
  ngOnInit(): void {

  
   }
   reactiveForm() {
    this.formCreate = this.fb.group({
      Nombre: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      Roles: ['', [Validators.required]],
      Empresa:['',],
    });
    this.getRoles();
  
}
submitForm() {
  this.makeSubmit = true;
  // Validación
  if (this.formCreate.invalid) {
    return;
  }
  console.log(this.formCreate.value);

  // Obtener los roles seleccionados
  const selectedRoles = this.formCreate.value.Roles;
  
  // Comprobar si se han seleccionado al menos un rol
  if (!selectedRoles || selectedRoles.length === 0) {
    // Mostrar un mensaje de error si no se ha seleccionado ningún rol
    console.log('Debe seleccionar al menos un rol');
    return;
  }

  // Enviar los roles seleccionados al backend
  this.authService.createUser({
    ...this.formCreate.value,
    selectedRoles: selectedRoles // Asegurarse de enviar los roles seleccionados al backend
  })
  .subscribe((respuesta: any) => {
    this.Usuario = respuesta;
    this.router.navigate(['/usuarios/login'], {
      // Mostrar un mensaje
      queryParams: { regist: 'true' }
    });
  });
}

onReset() {
  this.formCreate.reset();
}

getRoles() {
  this.gService
    .list('roles')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.roles = data;
      // Filtrar los roles para excluir "Administrador"
      this.filteredRoles = this.roles.data.filter(role => role.Descripcion !== "Administrador");
      this.formCreate.get('Roles').setValue(this.filteredRoles);
      console.log(this.filteredRoles);
    });
}


public errorHandling = (control: string, error: string) => {
  return (
    this.formCreate.controls[control].hasError(error) &&
    this.formCreate.controls[control].invalid &&
    (this.makeSubmit || this.formCreate.controls[control].touched)
  );
};
}
