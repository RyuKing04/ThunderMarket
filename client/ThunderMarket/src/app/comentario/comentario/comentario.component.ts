import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {
destroy$: Subject<boolean> = new Subject<boolean>();
//Titulo
titleForm: string = 'Crear';
//Lista de categorias
VendedorList: any;
facturaDetalleID: Number;
//Producto a actualizar
comentarioInfo: any;
currentUser: any;
//Respuesta del API crear/modificar
respComentario: any;
//Sí es submit
idUsuario:number;
submitted = false;
//Nombre del formulario
comentarioForm: FormGroup;
//id del Producto
idComentario: number = 0;
//Sí es crear
isCreate: boolean = true;

constructor(
  private fb: FormBuilder,
  private gService: GenericService,
  private router: Router,
  private activeRouter: ActivatedRoute,
  private authService: AuthenticationService
) {
  this.listaVendedor();
  this.formularioReactive();
  this.facturaDetalleID = +this.activeRouter.snapshot.paramMap.get('id');
  // this.listaProductos();
  this.idUsuario= this.authService.UsuarioID;
  console.log(this.idUsuario);
  console.log(this.facturaDetalleID);
}

ngOnInit(): void {
  //Verificar si se envio un id por parametro para crear formulario para actualizar
  this.activeRouter.params.subscribe((params: Params) => {
    this.idComentario = params['id'];
    if (this.idComentario != undefined) {
      this.isCreate = true;
      this.titleForm = 'Crear';
      //Obtener videojuego a actualizar del API
      this.gService
        .get('comentarios', this.idComentario)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.comentarioInfo = data;
          //Establecer los valores en cada una de las entradas del formulario
          this.comentarioForm.setValue({
            id: this.comentarioInfo.id,
            comentario: this.comentarioInfo.comentario,
            facturaDetalleID: this.comentarioInfo.facturaDetalleID,
            usuarioID: this.comentarioInfo.usuarioID,
          });
        });
        this.authService.currentUser.subscribe((x) => (this.currentUser = x));
        this.idUsuario= this.authService.UsuarioID;
    }
  });
}
formularioReactive() {
  this.comentarioForm = this.fb.group({
    id: [null, null],
    ComentarioCliente: [null, Validators.required],
    CalificacionCliente: [null, Validators.required],
    facturaDetalleID: [null, Validators.required],
    usuarioID: [null, Validators.required],
  });
}
//Obtener lista de vendedor
listaVendedor() {
  this.VendedorList=null;
  this.gService
    .list('usuarios')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.VendedorList = data;
    }
    );
  }
  public errorHandling = (control: string, error: string) => {
    return this.comentarioForm.controls[control].hasError(error);
  };
  //Crear o actualizar
  crearComentario() {
//establecer submit verdadero
this.submitted=true;
this.comentarioForm.patchValue({usuarioID:this.idUsuario});

this.comentarioForm.patchValue({facturaDetalleID:this.facturaDetalleID});
console.log(this.comentarioForm.value);
//Si el formulario es invalido no hace nada
if(this.comentarioForm.invalid){
  return;
}
//Si es crear
const formData=new FormData();
const formValue=this.comentarioForm.value;

console.log(formData);
console.log(this.comentarioForm);

this.gService
  .create('comentarios', formData)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
    this.respComentario = data;
    console.log(this.respComentario);
    this.router.navigate(['/comentario/listar',this.facturaDetalleID]);
  }
  );
}
actualizarComentario() {}
onReset() {
  this.submitted = false;
  this.comentarioForm.reset();
}
onBack() {
  this.router.navigate(['/productos']);
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Desinscribirse
  this.destroy$.unsubscribe();
}

}