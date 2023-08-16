import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './home/inicio/inicio.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ProductoIndexComponent } from './producto/producto-index/producto-index.component';
import { PedidosAllComponent } from './pedidos/pedidos-all/pedidos-all.component';
import { PedidosUsuarioDataSource } from './pedidos/pedidos-usuario/pedidos-usuario-datasource';
import { PedidosUsuarioComponent } from './pedidos/pedidos-usuario/pedidos-usuario.component';
import { MetodopagoAllComponent } from './metodopago/metodopago-all/metodopago-all.component';
import { DireccionesAllComponent } from './direcciones/direcciones-all/direcciones-all.component';
import { UserAllDataSource } from './user/user-all/user-all-datasource';

const routes: Routes = [
  { path:'inicio',component: InicioComponent},
  { path:'', redirectTo:'/inicio' ,pathMatch:'full'},
  { path:'**',component:PageNotFoundComponent},
  { path:'productos', component:ProductoIndexComponent},
  {path:'pedidos', component:PedidosUsuarioComponent},
  {path:'metododepago',component:MetodopagoAllComponent},
  {path:'direcciones',component:DireccionesAllComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
