import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComentarioComponent } from './comentario/comentario.component';

const routes: Routes = [
{path:'comentarios',component:ComentarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComentarioRoutingModule { }
