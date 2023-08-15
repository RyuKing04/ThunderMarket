import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pedidos-index',
  templateUrl: './pedidos-index.component.html',
  styleUrls: ['./pedidos-index.component.css'],
})
export class PedidosIndexComponent  {
  direcciones: any;
  metodosDePago: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser: any;
  idUsuario: number;
  userInfo: any;
  isAuth: boolean;
  total = 0;
  Fecha = Date.now();
  displayedColumns: string[] = [
    'producto',
    'cantidad',
    'precio',
    'subtotal',
    'acciones',
  ];
  dataSource = new MatTableDataSource<ItemCart>();
  pedidosForm: FormGroup;

  constructor(
    private cartService: CartService,
    private router: Router,
    private gService: GenericService,
    private noti: NotificacionService,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.authService.isAuthenticated.subscribe((x) => {
      this.currentUser = x;
    });
    this.idUsuario = this.authService.UsuarioID;

    if (this.idUsuario != undefined) {
      this.gService
        .get('usuarios', this.idUsuario)
        .pipe(takeUntil(this.destroy$))
        .subscribe((respuesta: any) => {
          this.userInfo = respuesta;
          console.log(respuesta);
        });
    }
    this.formularioReactive();
  }

  formularioReactive() {
    this.pedidosForm = this.fb.group({
      direccion: [null, Validators.required],
      metodoDePago: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    });
    this.total = this.cartService.getTotal();
  }

  actualizarCantidad(item: any) {
    console.log(item);
    this.cartService.addToCart(item.product);
    this.total = this.cartService.getTotal();
    /*  this.noti.mensaje('Orden',
  'Cantidad actualizada: '+item.cantidad,
  TipoMessage.info) */
  }

  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje('Orden', 'Producto eliminado', TipoMessage.warning);
  }

  registrarOrden() {
    if (
      this.cartService.getItems != null &&
      this.pedidosForm.value.metodoDePago != null &&
      this.pedidosForm.value.direccion != null
    ) {
      // Obtener los items del carrito de compras
      let itemsCarrito = this.cartService.getItems;
  
      let productos = itemsCarrito.map((x) => ({
        ProductoID: x.idItem,
        Cantidad: x.cantidad,
        Subtotal: x.subtotal,
      }));
  
      // Datos para el API
      let infoOrden = {
        UsuarioID: this.idUsuario, // Asegúrate de que idUsuario tenga un valor correcto
        DireccionID: this.pedidosForm.value.direccion,
        MetodoDePagoID: this.pedidosForm.value.metodoDePago,
        Total: this.total,
        Estado: 'pendiente',
        facturaDetalle: productos,
      };
  
      this.gService.create('facturas', infoOrden).subscribe(
        (respuesta: any) => {
          this.noti.mensaje(
            'Orden',
            'Orden registrada #' + respuesta.id,
            TipoMessage.success
          );
          this.cartService.deleteCart();
          this.total = this.cartService.getTotal();
          console.log(respuesta);
        },
        (error) => {
          console.error(error); // Manejo de errores
          this.noti.mensaje(
            'Error',
            'No se pudo registrar la orden',
            TipoMessage.error
          );
        }
      );
    } else {
      this.noti.mensaje(
        'Orden',
        'Agregue productos a la orden',
        TipoMessage.warning
      );
    }
  }
}  
