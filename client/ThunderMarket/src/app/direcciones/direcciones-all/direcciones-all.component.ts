import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DireccionesAllDataSource, DireccionesAllItem } from './direcciones-all-datasource';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-direcciones-all',
  templateUrl: './direcciones-all.component.html',
  styleUrls: ['./direcciones-all.component.css']
})
export class DireccionesAllComponent implements AfterViewInit {
  datos:any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  id:number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<DireccionesAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Provincia', 'Canton', "Distrito", "telefono", "Acciones"];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService) {
      let id= this.route.snapshot.paramMap.get('id');
      this.id=+id;
      if(!isNaN(Number(this.id))){
        this.listaDirecciones(Number(this.id));
      }
  }
  
  ngAfterViewInit(): void {
  }

  listaDirecciones(id:number){
    this.gService
    .get('direcciones/usuario',id)
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
    this.router.navigate(['/direcciones',id],
    {
      relativeTo:this.route
    })
  }
  
  crearDirecciones(){
    this.router.navigate(['/direcciones/create'],
    {relativeTo:this.route})
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
