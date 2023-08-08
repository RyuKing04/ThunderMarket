import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MetodopagoAllDataSource, MetodopagoAllItem } from './metodopago-all-datasource';

@Component({
  selector: 'app-metodopago-all',
  templateUrl: './metodopago-all.component.html',
  styleUrls: ['./metodopago-all.component.css']
})
export class MetodopagoAllComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<MetodopagoAllItem>;
  dataSource: MetodopagoAllDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new MetodopagoAllDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
