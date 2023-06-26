import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './home/inicio/inicio.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ProductoIndexComponent } from './producto/producto-index/producto-index.component';

const routes: Routes = [
  { path:'inicio',component: InicioComponent},
  { path:'', redirectTo:'/inicio' ,pathMatch:'full'},
  { path:'**',component:PageNotFoundComponent},
  { path:'productos', component:ProductoIndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
