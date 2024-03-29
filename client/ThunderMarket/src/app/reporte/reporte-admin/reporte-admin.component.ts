import { Component, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-reporte-admin',
  templateUrl: './reporte-admin.component.html',
  styleUrls: ['./reporte-admin.component.css']
})
export class ReporteAdminComponent implements OnInit {
  canvas: any;
  //Contexto del Canvas
  ctx: any;
  //Elemento html del Canvas
  @ViewChild('graficoCanvas') graficoCanvas!: { nativeElement: any };
  @ViewChild('graficoCanvas2') graficoCanvas2!: { nativeElement: any };
  //Establecer gráfico
  grafico: any;
  //Datos para mostrar en el gráfico
  datos: any;
  //Lista de meses para filtrar el gráfico
  mesList:any;
  Rol:any;
//Mes actual
filtro1:any;
filtro= new Date().getMonth();
destroy$: Subject<boolean> = new Subject<boolean>();
  datosVendedores: any;
constructor(
  private gService: GenericService
) {
  this.listaMeses();
}
listaMeses(){
  this.mesList = [
    { Value: 1, Text: 'Enero' },
    { Value: 2, Text: 'Febrero' },
    { Value: 3, Text: 'Marzo' },
    { Value: 4, Text: 'Abril' },
    { Value: 5, Text: 'Mayo' },
    { Value: 6, Text: 'Junio' },
    { Value: 7, Text: 'Julio' },
    { Value: 8, Text: 'Agosto' },
    { Value: 9, Text: 'Septiembre' },
    { Value: 10, Text: 'Octubre' },
    { Value: 11, Text: 'Noviembre' },
    { Value: 12, Text: 'Diciembre' }
]
}
ngAfterViewInit(): void {
  this.inicioGrafico(this.filtro);
  this.inicioGrafico2();
}
ngOnInit(): void {}
inicioGrafico(newValue:any){
 this.filtro=newValue;
 if(this.filtro){
  //Obtener datos del API
  this.gService
    .get('facturas/Producto',this.filtro)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.datos=data;
      this.graficoBrowser();
    })
 }
}
//Configurar y crear gráfico
graficoBrowser(): void {
  this.canvas=this.graficoCanvas.nativeElement;
  this.ctx = this.canvas.getContext('2d');
  //Si existe destruir el Canvas para mostrar el grafico
  if(this.grafico){
   this.grafico.destroy();
  }
  this.grafico= new Chart(this.ctx,{
   type:'pie',
   data:{
     //Etiquetas debe ser un array
     labels: this.datos.map(x => x.Nombre),
     datasets:[
       {
         backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
           'rgba(255, 159, 64, 0.2)',
           'rgba(255, 205, 86, 0.2)',
           'rgba(75, 192, 192, 0.2)',
           'rgba(54, 162, 235, 0.2)',
           'rgba(153, 102, 255, 0.2)',  
           'rgba(201, 203, 207, 0.2)'
       ],
       //Datos del grafico, debe ser un array
       data: this.datos.map(x => x.CantidadVendida)
       },
     ]
   },
       options:{
         responsive:false,
         maintainAspectRatio: false,
       },
     
  });
 }
 inicioGrafico2() {
  this.gService
    .getAll('comentarios/mejores-vendedores')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.datosVendedores = data;
      this.graficoBrowserdos();
    });
}
 //Configurar y crear gráfico
 graficoBrowserdos(): void {
  if (this.grafico) {
    this.grafico.destroy();
  }
  this.canvas = this.graficoCanvas2.nativeElement;
  this.ctx = this.canvas.getContext('2d');
  if (this.datosVendedores) {
  const nombresVendedores = this.datosVendedores.map((x: any) => x.UsuarioVendedor.Nombre); // Cambio aquí

  this.grafico = new Chart(this.ctx, {
    type: 'bar',
    data: {
      labels: nombresVendedores, // Cambio aquí
      datasets: [
        {
          label: 'Calificación Vendedores',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(201, 203, 207, 1)',
          ],
          borderWidth: 1,
          data: this.datosVendedores.map((x: any) => x.CalificacionVendedor),
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
 }


ngOnDestroy() {
  this.destroy$.next(true);
  // Desinscribirse
  this.destroy$.unsubscribe();
}
}
