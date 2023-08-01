import { AfterViewInit, Component,OnDestroy, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { PedidosUsuarioDataSource, PedidosUsuarioItem } from './pedidos-usuario-datasource';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pedidos-usuario',
  templateUrl: './pedidos-usuario.component.html',
  styleUrls: ['./pedidos-usuario.component.css'],
  providers: [DatePipe]

})
export class PedidosUsuarioComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  id: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<PedidosUsuarioItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'Fecha','Total', 'Estado', 'Acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService,
    private datePipe: DatePipe
    ) {
      let id = this.route.snapshot.paramMap.get('id');
      this.id = +id;
      if (!isNaN(Number(this.id))) {
        this.listaPedidos(Number(this.id));
       
      }
  }

  ngAfterViewInit(): void {
  }
  listaPedidos(id:number) {
    this.gService
    .get('facturas/usuario',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      console.log(data);
      if (Array.isArray(data)) {
        // Aplicar el formato de fecha a cada elemento de data
        data.forEach((pedido: any) => {
          pedido.Fecha = this.datePipe.transform(pedido.Fecha, 'yyyy-MM-dd');
        });

        this.dataSource.data = data; 
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  detalle(id:number){
    this.router.navigate(['/pedidos',id],
    {
      relativeTo:this.route
    })
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
