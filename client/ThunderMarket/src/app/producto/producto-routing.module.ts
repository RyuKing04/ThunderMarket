import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoPreguntaComponent } from './producto-pregunta/producto-pregunta.component';


const routes: Routes = [
{path:'productos',component:ProductoIndexComponent},
{path:'productos/usuario/:id', component: ProductoAllComponent},
{path:'productos/create', component: ProductoFormComponent },
{path:'productos/:id', component: ProductoDetalleComponent},
{path:'preguntas/:id', component: ProductoPreguntaComponent},
{path:'productos/update/:id', component: ProductoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
