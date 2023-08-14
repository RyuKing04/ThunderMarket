import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-direcciones-detalle',
  templateUrl: './direcciones-detalle.component.html',
  styleUrls: ['./direcciones-detalle.component.css']
})
export class DireccionesDetalleComponent {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  
  constructor( private gService: GenericService,
    private route:ActivatedRoute,
    private router: Router

    ){
      let id=this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.obtenerDirecciones(Number(id));
      }
  }
obtenerDirecciones(id:any){
    this.gService
    .get('direcciones',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
        this.datos=data; 
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
