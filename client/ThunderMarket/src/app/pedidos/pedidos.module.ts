import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosUsuarioComponent } from './pedidos-usuario/pedidos-usuario.component';
import { PedidosDetallesComponent } from './pedidos-detalles/pedidos-detalles.component';


@NgModule({
  declarations: [
    PedidosAllComponent,
    PedidosUsuarioComponent,
    PedidosDetallesComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class PedidosModule { }
