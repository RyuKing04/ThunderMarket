import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { ReporteVendedorComponent } from './reporte-vendedor/reporte-vendedor.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'; 
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { ReporteAdminComponent } from './reporte-admin/reporte-admin.component';


@NgModule({
  declarations: [
    ReporteVendedorComponent,
    ReporteAdminComponent
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule

  ]
})
export class ReporteModule { }
