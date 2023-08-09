import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetodopagoAllComponent } from './metodopago-all/metodopago-all.component';
import { MetodopagoFormComponent } from './metodopago-form/metodopago-form.component';

const routes: Routes = [
{path:'metodopago/usuario/:id',component:MetodopagoAllComponent},
{path:'metodopago/create',component:MetodopagoFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetodopagoRoutingModule { }
