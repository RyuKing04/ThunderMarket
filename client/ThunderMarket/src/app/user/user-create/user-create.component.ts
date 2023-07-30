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
  ngOnInit(): void { }
   reactiveForm() {
    this.formCreate = this.fb.group({
      Nombre: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      Empresa:['']
    });
    this.getRoles();
  
}
submitForm() {
  this.makeSubmit=true;
  //Validación
  if(this.formCreate.invalid){
   return;
  }
  console.log(this.formCreate.value);
  this.authService.createUser(this.formCreate.value)
  .subscribe((respuesta:any)=>{
    this.Usuario=respuesta;
    this.router.navigate(['/usuario/login'],{
      //Mostrar un mensaje
      queryParams:{register:'true'},
    })
  })
}
onReset() {
  this.formCreate.reset();
}
getRoles() {
  this.gService
    .list('rol')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.roles = data;
      this.filteredRoles = this.roles.filter((rol: any) => rol.descripcion !== 'Administrador');
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
