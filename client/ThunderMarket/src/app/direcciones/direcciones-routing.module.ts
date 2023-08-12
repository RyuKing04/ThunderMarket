import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DireccionesAllComponent } from './direcciones-all/direcciones-all.component';
import { DireccionesFormComponent } from './direcciones-form/direcciones-form.component';

const routes: Routes = [
  {path:'direcciones/usuario/:id',component:DireccionesAllComponent},
  {path:'direcciones/create',component:DireccionesFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DireccionesRoutingModule { }
