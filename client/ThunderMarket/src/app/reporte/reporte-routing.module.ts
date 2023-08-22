import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteVendedorComponent } from './reporte-vendedor/reporte-vendedor.component';
import { ReporteAdminComponent } from './reporte-admin/reporte-admin.component';

const routes: Routes = [

  {path:'facturas/rGraficoAdmin' , component:ReporteAdminComponent},
  {path:'facturas/rGraficoVendedor' , component:ReporteVendedorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
