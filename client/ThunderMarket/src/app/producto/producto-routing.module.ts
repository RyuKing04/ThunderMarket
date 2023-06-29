import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';


const routes: Routes = [
{path:'productos',component:ProductoIndexComponent},
{path:'productos/all', component: ProductoAllComponent},
{path:'productos/:id', component: ProductoDetalleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
