import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-reporte-vendedor',
  templateUrl: './reporte-vendedor.component.html',
  styleUrls: ['./reporte-vendedor.component.css']
})
export class ReporteVendedorComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  productosDataSource: any[] = [];
  displayedColumns: string[] = ['nombre', 'cantidadVendida'];
  currentUser: any;
  idUsuario: number;
  datos: any[] = [];

  constructor(
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    this.idUsuario = this.authService.UsuarioID;
  }

  ngOnInit(): void {
    this.cargarProductosMasVendidos();
  }

  cargarProductosMasVendidos() {
    console.log(this.idUsuario)

    this.gService
      .get('facturas/Producto', 8)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log('Datos recibidos:', data); // Verifica los datos en la consola
          this.datos = data;
          this.productosDataSource = data;
        },
        error => {
          console.error('Error al cargar productos:', error); // Verifica si hay errores
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
