import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/share/cart.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css'],
})
export class ProductoIndexComponent {
  datos:any;//Respuesta del API
  destroy$:Subject<boolean>=new Subject<boolean>();
filterDatos:any;
Categoria:any
  constructor(private gService:GenericService,
    private router: Router,
    private dialog:MatDialog,
    private cartService: CartService,
    private notificacion: NotificacionService
    ){
    this.listaProductos(); 
    this.listCategoria();
  }
  listaProductos(){
    this.gService.list('productos/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.filterDatos=data;
      });
    
  }
  comprar(id:number){
    this.gService
    .get('productos',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      //Agregar videojuego obtenido del API al carrito
      this.cartService.addToCart(data);
      //Notificar al usuario
      this.notificacion.mensaje(
        'Orden',
        'Producto: '+data.producto+ ' agregado a la orden',
        TipoMessage.success
       
      )
    });
  }

  filterProducto(text:string){
   if(!text){
     this.filterDatos=this.datos
   }else{
     this.filterDatos=this.datos.filter(
      Producto=>Producto?.Nombre.toLowerCase().includes(text.toLowerCase())
      )

   }
  }
  filterCategoria(CategoriaID: number) {
    if (!CategoriaID) {
      this.filterDatos = this.datos;
    } else {
      this.filterDatos = this.datos.filter((p) =>
        p.Categoria.id === CategoriaID
      );
    }
  }
  
  listCategoria() {
    this.gService
      .list('categorias/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.Categoria = data;
      });
  }


  filterPrecio(orderBy: number) {
  
    if (orderBy == 0) {
      this.filterDatos = this.filterDatos.sort((a, b) => b.Precio - a.Precio);
    }

    if (orderBy == 1) {
      this.filterDatos = this.filterDatos.sort((a, b) => a.Precio - b.Precio);
    }
  }
  

  detalleProductos(id:number){
    this.router.navigate(['/productos', id]);

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
