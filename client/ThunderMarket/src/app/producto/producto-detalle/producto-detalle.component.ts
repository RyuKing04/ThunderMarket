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
  constructor( private gService: GenericService,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder) {
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

}
