import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';

import { GenericService } from 'src/app/share/generic.service';
@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
})
export class ProductoFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Lista de categorias
  categoriaList: any;
  //Producto a actualizar
  productoInfo: any;
  currentUser: any;
  //Respuesta del API crear/modificar
  respProducto: any;
  //Sí es submit
  idUsuario:number;
  submitted = false;
  //Nombre del formulario
  productoForm: FormGroup;
  //id del Producto
  idProducto: number = 0;
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
    this.listaCategorias();
    this.idUsuario= this.authService.UsuarioID;
    console.log(this.idUsuario);
  }

  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProducto = params['id'];
      if (this.idProducto != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        //Obtener videojuego a actualizar del API
        this.gService
          .get('productos', this.idProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.productoInfo = data;
            //Establecer los valores en cada una de las entradas del formulario
            this.productoForm.setValue({
              id: this.productoInfo.id,
              Nombre: this.productoInfo.Nombre,
              Precio: this.productoInfo.Precio,
              Cantidad: this.productoInfo.Cantidad,
              Categorias: this.productoInfo.CategoriaID,
              UsuarioID: this.productoInfo.UsuarioID,
              Estado: this.productoInfo.Estado,
              myfile: null,
              publicar: this.productoInfo.publicar,
            });
          });
      }
    });
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.idUsuario=this.currentUser.user.id;
  }
  formularioReactive() {
    //[null, Validators.required]
    this.productoForm = this.fb.group({
      id: [null, null],
      Nombre: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      Precio: [null, Validators.required],
      Cantidad: [null, Validators.required],
      Estado: [true, Validators.required],
      publicar: [true, Validators.required],
      Categorias: [null, Validators.required],
      UsuarioID: [null, Validators.required],
      myFile: [null, Validators.required],
    });
  }
  listaCategorias() {
    this.categoriaList = null;
    this.gService
      .list('categorias')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.categoriaList = data;
      });
  }
  public errorHandling = (control: string, error: string) => {
    return this.productoForm.controls[control].hasError(error);
  };

  //Crear Producto
  crearProducto(): void {
    //Establecer submit verdaderot
    this.submitted = true;
    this.productoForm.patchValue({ UsuarioID: this.idUsuario });
    console.log(this.productoForm);

    //Verificar validación
    if (this.productoForm.invalid) {
      return;
    }

    const formData = new FormData();
    const formValue = this.productoForm.value;

    // Agregar los datos al FormData
    Object.keys(formValue).forEach((key) => {
      const value = formValue[key];

      if (key === 'myFile') {
        // If the key is 'myFile', it contains an array of files, so we need to handle it differently
        const files: File[] = value as File[];
        for (const file of files) {
          formData.append('myFile', file, file.name);
        }
      } else if (key === 'publicar') {
        formData.append(key, JSON.stringify(value));
      } else {
        // Agregar otros valores al FormData
        formData.append(key, value);
      }
    });

    console.log(formData);
    //Asignar valor al formulario
    console.log(this.productoForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .create('productos', formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        this.respProducto = data;
        this.router.navigate(['/productos/usuario',this.idUsuario]);
      });
  }
  //Actualizar producto
  actualizarProducto(): void {}
  onReset() {
    this.submitted = false;
    this.productoForm.reset();
  }
  onBack() {
    this.router.navigate(['/producto/usuario',this.idUsuario]);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const imageArray: File[] = [];
      for (const file of files) {
        imageArray.push(file);
      }
      // Limitar la cantidad de imágenes a 5 antes de asignar al formulario
      const maxImages = 5;
      const imagesToUpload = imageArray.slice(0, maxImages);
      this.productoForm.patchValue({ myFile: imagesToUpload });
    }
  }

  countSelectedImages(): number {
    const myFileControl = this.productoForm.get('myFile');
    return myFileControl.value ? myFileControl.value.length : 0;
  }
}
