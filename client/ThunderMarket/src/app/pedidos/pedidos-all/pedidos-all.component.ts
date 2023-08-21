import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedidos-all',
  templateUrl: './pedidos-all.component.html',
  styleUrls: ['./pedidos-all.component.css']
})
export class PedidosAllComponent implements AfterViewInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  id: number;
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['Producto', 'Subtotal', 'Estado', 'Cantidad', 'Acciones'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    this.id = +id;
    if (!isNaN(Number(this.id))) {
      this.listaPedidos(Number(this.id));
    }
  }

  ngAfterViewInit(): void {}

  listaPedidos(id: number) {
    this.gService
      .get('facturas/vendedor', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        if (Array.isArray(data)) {
          this.dataSource.data = data;
        }
      });
  }

  detalle(id: number) {
    this.router.navigate(['/facturas', id], {
      relativeTo: this.route
    });
  }

  updateEstado(id: number, estado: any) {
    console.log(id);
    console.log(estado);
    let data = {
      Estado: estado,
      id: id
    };
    this.gService
      .update('facturas', data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        if (data) {
          this.listaPedidos(this.id);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
