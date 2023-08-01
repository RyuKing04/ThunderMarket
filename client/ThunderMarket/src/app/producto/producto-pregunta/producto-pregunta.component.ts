import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
@Component({
  selector: 'app-producto-pregunta',
  templateUrl: './producto-pregunta.component.html',
  styleUrls: ['./producto-pregunta.component.css']
})
export class ProductoPreguntaComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Lista de categorias
  productoID: Number;
  //Producto a actualizar
  preguntaInfo: any;
  currentUser: any;
  //Respuesta del API crear/modificar
  respPregunta: any;
  //Sí es submit
  idUsuario:number;
  submitted = false;
  //Nombre del formulario
  preguntaForm: FormGroup;
  //id del Producto
  idPregunta: number = 0;
  //Sí es crear
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.formularioReactive();
    this.productoID = +this.activeRouter.snapshot.paramMap.get('id');
    // this.listaProductos();
    this.idUsuario= this.authService.UsuarioID;
    console.log(this.idUsuario);
    console.log(this.productoID);
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idPregunta = params['id'];
      if (this.idPregunta != undefined) {
        this.isCreate = true;
        this.titleForm = 'Crear';
        //Obtener videojuego a actualizar del API
        this.gService
          .get('preguntas', this.idPregunta)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.preguntaInfo = data;
            //Establecer los valores en cada una de las entradas del formulario
            this.preguntaForm.setValue({
              id: this.preguntaInfo.id,
              Pregunta: this.preguntaInfo.Pregunta,
              Producto: this.preguntaInfo.ProductoID,
              Usuario: this.preguntaInfo.UsuarioID,
            });
          });
      }
    });
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.idUsuario=this.currentUser.user.id;
  }
  formularioReactive() {
    //[null, Validators.required]
    this.preguntaForm = this.fb.group({
      id: [null, null],
      Pregunta: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      ProductoID: [null, Validators.required],
      UsuarioID: [null, Validators.required],
      
    });
  }
  // listaProductos() {
  //   this.productoList = null;
  //   this.gService
  //     .list('productos')
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((data: any) => {
  //       // console.log(data);
  //       this.productoList = data;
  //     });
  // }
  // public errorHandling = (control: string, error: string) => {
  //   return this.preguntaForm.controls[control].hasError(error);
  // };

updatePregunta(): void {}

  crearPregunta(): void {
    //Establecer submit verdaderot
    this.submitted = true;
    console.log(this.productoID);
    this.preguntaForm.patchValue({ UsuarioID: this.idUsuario });
    
    this.preguntaForm.patchValue({ ProductoID: this.productoID });
    console.log(this.preguntaForm);

    //Verificar validación
    if (this.preguntaForm.invalid) {
      return;
    }

    const formData = new FormData();
    const formValue = this.preguntaForm.value;

    // Agregar los datos al FormData

    console.log(formData);
    //Asignar valor al formulario
    console.log(this.preguntaForm);
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .create('preguntas', formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respPregunta = data;
        console.log(data);
        this.router.navigate(['/productos',this.productoID]);
      });
    
  }
  public errorHandling = (control: string, error: string) => {
    return this.preguntaForm.controls[control].hasError(error);
  };
  //Actualizar producto
  onReset() {
    this.submitted = false;
    this.preguntaForm.reset();
  }
  onBack() {
    this.router.navigate(['/producto/usuario',this.idUsuario]);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
