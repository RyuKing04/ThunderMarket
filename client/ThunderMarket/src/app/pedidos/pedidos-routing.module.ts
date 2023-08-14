import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosDetallesComponent } from './pedidos-detalles/pedidos-detalles.component';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosUsuarioComponent } from './pedidos-usuario/pedidos-usuario.component';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';

const routes: Routes = [
  {path:'pedidos',component:PedidosIndexComponent},
  {path:'pedidos/vendedor/:id',component:PedidosAllComponent},
  {path:'pedidos/usuario/:id',component:PedidosUsuarioComponent},
  {path:'pedidos/:id',component:PedidosDetallesComponent},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
