import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MetodopagoAllDataSource, MetodopagoAllItem } from './metodopago-all-datasource';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-metodopago-all',
  templateUrl: './metodopago-all.component.html',
  styleUrls: ['./metodopago-all.component.css']
})
export class MetodopagoAllComponent implements AfterViewInit {
  datos:any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  id:number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<MetodopagoAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Nombre', 'Tipo', "Proveedor", "NumeroDeCuenta", "Acciones"];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService) {
      let id= this.route.snapshot.paramMap.get('id');
      this.id=+id;
      if(!isNaN(Number(this.id))){
        this.listaMetodopago(Number(this.id));
      }
  }

  ngAfterViewInit(): void {
  }
  listaMetodopago(id:number){
    this.gService
    .get('metododepago/usuario',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      if(Array.isArray(data)){
        this.dataSource.data=data;
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      }
    })
  }
  detalle(id:number){
    this.router.navigate(['/metododepago',id],
    {
      relativeTo:this.route
    })
  }
  crearMetodoDePago(){
    this.router.navigate(['/metodopago/create'],
    {relativeTo:this.route})

  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
