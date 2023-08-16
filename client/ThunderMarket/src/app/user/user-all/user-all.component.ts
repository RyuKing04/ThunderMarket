import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { UserAllDataSource, UserAllItem } from './user-all-datasource';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css']
})
export class UserAllComponent implements AfterViewInit {
  datos:any
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<UserAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Usuario', 'Empresa', 'Estado', 'Acciones'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService,
    private sanitizer: DomSanitizer,
    private liveAnnouncer: LiveAnnouncer
  ) {
    this.getUsuarios
  }

  ngAfterViewInit(): void {
  }
  
  getUsuarios(){
this.gService
    .getAll('usuario')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.datos = data
      this.dataSource = new MatTableDataSource(this.datos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(data)
    }
    );
  }
updateUsuario(user:any){
  this.gService
  .update('usuarios/cambiarEstado',user)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
    this.getUsuarios();
    this.notificacion.mensaje(
      'Usuario',
      'Usuario actualizado correctamente',
      TipoMessage.success
  );
    });
  }

detalle(id){}
}
