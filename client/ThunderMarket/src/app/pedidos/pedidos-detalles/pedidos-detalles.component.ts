import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GenericService } from 'src/app/share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedidos-detalles',
  templateUrl: './pedidos-detalles.component.html',
  styleUrls: ['./pedidos-detalles.component.css'],
  providers: [DatePipe]
})
export class PedidosDetallesComponent {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();


  constructor( private gService: GenericService,
    private route:ActivatedRoute,
    private datePipe: DatePipe
    ){
      let id=this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.obtenerPedidos(Number(id));
      }
  }
  obtenerPedidos(id:any){
    this.gService
    .get('facturas',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
        this.datos=data; 
        // Aplicar el formato de fecha
      this.datos.Fecha = this.datePipe.transform(this.datos.Fecha, 'yyyy-MM-dd');
    });
   
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
