import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';  
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoAllDataSource, ProductoAllItem } from './producto-all-datasource';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-producto-all',
  templateUrl: './producto-all.component.html',
  styleUrls: ['./producto-all.component.css']
})
export class ProductoAllComponent implements AfterViewInit {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductoAllItem>;
  dataSource: new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Nombre', 'Precio','acciones' ];

  constructor(private router:Router, 
    private route:ActivatedRoute, 
    private gService:GenericService) {

  }

  ngAfterViewInit(): void {
  this.listaProductos();
  }

  listaProductos(){
this.gService.list('productos')
.pipe(takeUntil(this.destroy$))
.subscribe((data:any)=>{
  console.log(data);
  this.datos=data;
  this.dataSource= new MatTableDataSource(this.datos);
  this.dataSource.sort= this.sort;
  this.dataSource.paginator= this.paginator;

});
  }
  detalle(id:number){
    this.router.navigate(['/productos',id])
    {
      relativeTO:this.route
    }
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}