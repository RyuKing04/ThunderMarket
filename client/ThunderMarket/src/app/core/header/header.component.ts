import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/share/cart.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isAutenticated: boolean;
  currentUser: any;
  qtyItems: Number = 0;
  UsuarioID: number;
  Admin: boolean;
  Cliente: boolean;
  Vendedor: boolean;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.qtyItems = this.cartService.quantityItems();
    this.Vendedor = this.authService.Vendedor;
    this.Admin = this.authService.Admin;
    this.Cliente = this.authService.Cliente;
    console.log(this.Vendedor);
    //afecta donde de se pone la lógica (construtor o OnInit) solo si se tiene que cargar una parte de la pagina
  }

  ngOnInit(): void {

    //valores de prueba
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor) 
    );
    this.UsuarioID = this.authService.UsuarioID;
    console.log(this.currentUser)
    this.cartService.countItems.subscribe((value) => {
      this.qtyItems = value;
    });
    }
    login() {
      this.router.navigate(['usuario/login']);
    }
    logout() {
      this.authService.logout();
      this.router.navigate(['usuario/login']);
    }
    productosusuario(id:number){
      this.router.navigate(['/productos/usuario',id])
    }
    pedidosusuario(id:number){
      this.router.navigate(['/pedidos/usuario',id])
    }
    pedidosvendedor(id:number){
      this.router.navigate(['/pedidos/vendedor',id])
    }
    metodopagousuario(id:number){
      this.router.navigate(['/metodopago/usuario',id])
    }
    
  }

