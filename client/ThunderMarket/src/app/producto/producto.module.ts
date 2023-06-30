import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoRoutingModule } from './producto-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';

@NgModule({
  declarations: [
    ProductoIndexComponent,
    ProductoDetalleComponent,
    ProductoAllComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ProductoRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class ProductoModule {}
