import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-pedidos-index',
  templateUrl: './pedidos-index.component.html',
  styleUrls: ['./pedidos-index.component.css']
})
export class PedidosIndexComponent {
  direcciones: any[] = []; // Arreglo para almacenar las direcciones disponibles
  metodosDePago: any[] = [];
  total=0;
  Fecha = Date.now();
  currentUser: any;
  idUsuario: number;
  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'subtotal', 'acciones'];
  dataSource = new MatTableDataSource<ItemCart>();
  
  constructor(private cartService: CartService,
     private router: Router,
      private gService: GenericService, 
      private noti: NotificacionService,
      private authService: AuthenticationService
      ) 
  {}

ngOnInit(): void {
  this.authService.currentUser.subscribe((x) => {
    this.currentUser = x;
    if (x && x.user) {
      this.idUsuario = x.user.id;
    }
  });

  this.cartService.currentDataCart$.subscribe(data=>{

    this.dataSource=new MatTableDataSource(data)
    console.log(data)
   })
   this.total=this.cartService.getTotal()
   
   this.gService.get('usuarios',this.idUsuario).subscribe(
    (respuesta: any) => {
      this.direcciones = respuesta.direcciones;
      this.metodosDePago = respuesta.metodosDePago;
      console.log(respuesta);
    }
  );
}

actualizarCantidad(item: any) {
  console.log(item)
  this.cartService.addToCart(item.product);
  this.total=this.cartService.getTotal();
 /*  this.noti.mensaje('Orden',
  'Cantidad actualizada: '+item.cantidad,
  TipoMessage.info) */
}

eliminarItem(item: any) {
  this.cartService.removeFromCart(item);
  this.total=this.cartService.getTotal();
  this.noti.mensaje('Orden',
  'Producto eliminado',
  TipoMessage.warning)
}

registrarOrden() {
  if(this.cartService.getItems!=null){
     //Obtener los items del carrito de compras
     let itemsCarrito=this.cartService.getItems;
     //Armar la estructura de la tabla intermedia
     //[{'videojuegoId':valor, 'cantidad':valor}]
     let detalles=itemsCarrito.map(
       x=>({
         ['ProductoID']:x.idItem,
         ['Cantidad']: x.cantidad
       })
     )
     //Datos para el API
     let infoOrden={
       'Fecha': new Date(this.Fecha),
       'productos':detalles
     }
     this.gService.create('orden',infoOrden)
     .subscribe((respuesta:any)=>{
       this.noti.mensaje('Orden',
       'Orden registrada #'+respuesta.id,
       TipoMessage.success)
       this.cartService.deleteCart();
       this.total=this.cartService.getTotal();
       console.log(respuesta)
     })
  }else{
   this.noti.mensaje('Orden',
   'Agregue productos a la orden',
   TipoMessage.warning)
  }
 }
 
}
