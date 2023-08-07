import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css'],
})
export class ProductoDetalleComponent implements OnDestroy {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  imagenActual: string;
  indiceImagen: number;

  constructor(
    private gService: GenericService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.indiceImagen = 0;
    this.imagenActual = '';
    const id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerProducto(Number(id));
    }
  }

  obtenerProducto(id: any) {
    this.gService
      .get('productos', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        this.imagenActual = this.datos.imagen[this.indiceImagen]?.imagen || '';
        console.log(this.imagenActual)
      });
  }

  crearPregunta(id: number) {
    this.router.navigate(['/preguntas', id]);
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
