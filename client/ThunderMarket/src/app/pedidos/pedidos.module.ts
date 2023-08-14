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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';
import { PedidosUsuarioComponent } from './pedidos-usuario/pedidos-usuario.component';
import { PedidosDetallesComponent } from './pedidos-detalles/pedidos-detalles.component';
import { PedidosIndexComponent } from './pedidos-index/pedidos-index.component';


@NgModule({
  declarations: [
    PedidosAllComponent,
    PedidosUsuarioComponent,
    PedidosDetallesComponent,
    PedidosIndexComponent
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
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class PedidosModule { }
