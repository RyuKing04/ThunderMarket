import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetodopagoRoutingModule } from './metodopago-routing.module';
import { MetodopagoAllComponent } from './metodopago-all/metodopago-all.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    MetodopagoAllComponent
  ],
  imports: [
    CommonModule,
    MetodopagoRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class MetodopagoModule { }
