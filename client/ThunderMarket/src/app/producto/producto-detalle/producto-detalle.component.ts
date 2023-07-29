import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { GenericService } from 'src/app/share/generic.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css'],
})
export class ProductoDetalleComponent {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  imagenActual: string;
  indiceImagen: number;
  PreguntasyRespuestasForm: FormGroup;
  constructor( private gService: GenericService,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.reactiveForm();
      this.indiceImagen = 0;
    this.imagenActual = '';
      let id=this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.obtenerProducto(Number(id));
      }
  }
  obtenerProducto(id:any){
    this.gService
    .get('productos',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
        this.datos=data; 
        this.cargarPreguntasGuardadas();
    });
   
  }

  reactiveForm() {
    this.PreguntasyRespuestasForm = this.formBuilder.group({
      pregunta: [null, Validators.required],
      respuesta: [null, Validators.required],
    });
  }
  cargarPreguntasGuardadas() {
    if (this.datos.Preguntas && this.datos.Preguntas.length > 0) {
      this.datos.Preguntas.forEach((preguntaRespuesta: any) => {
        this.agregarPreguntaRespuesta(
          preguntaRespuesta.Pregunta,
          preguntaRespuesta.Respuesta.Respuesta
        );
      });
    }
  }
//Crear preguntas y Respuestas
agregarPreguntaRespuesta(pregunta: string, respuesta: string) {
  // Verificar si la matriz Preguntas ya existe en datos, si no, inicializarla
  if (!this.datos.Preguntas) {
    this.datos.Preguntas = [];
  }

  // Agregar la nueva pregunta y respuesta a la matriz Preguntas
  this.datos.Preguntas.push({
    Pregunta: pregunta,
    Respuesta: {
      Respuesta: respuesta,
    },
  });
}

crearPreguntayRespuesta() {
  const pregunta = this.PreguntasyRespuestasForm.value.pregunta;
  const respuesta = this.PreguntasyRespuestasForm.value.respuesta;

  // Enviar la pregunta y respuesta al backend utilizando el servicio gService
  const preguntaRespuesta = {
    Pregunta: pregunta,
    Respuesta: {
      Respuesta: respuesta,
    },
    Usuario: {
      UsuarioID: '2', // Reemplaza 'ID_DEL_USUARIO' con el ID del usuario actual (si está disponible en tu aplicación)
    },
    Producto: {
      ProductoID: this.datos.id, // Utiliza el ID del producto actual obtenido desde 'this.datos'
    },
  };

  // Enviar los datos al backend para crear la pregunta y respuesta
  this.gService
    .create('preguntas', preguntaRespuesta)
    .subscribe((data: any) => {
      // En caso de éxito, actualiza la lista de preguntas y respuestas
      this.agregarPreguntaRespuesta(data.Pregunta, data.Respuesta.Respuesta);

      // Limpiar los campos de entrada después de agregar la pregunta y respuesta
      this.PreguntasyRespuestasForm.reset();
    });
}

  mostrarImagenAnterior() {
    if (this.indiceImagen > 0) {
      this.indiceImagen--;
      this.imagenActual = this.datos.imagen[this.indiceImagen]?.imagen || '';
    }
  }

  mostrarSiguienteImagen() {
    if (this.indiceImagen < this.datos.imagen.length - 1) {
      this.indiceImagen++;
      this.imagenActual = this.datos.imagen[this.indiceImagen]?.imagen || '';
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

public errorHandling = (control: string, error: string) => {
  return this.PreguntasyRespuestasForm.controls[control].hasError(error);
};
}
