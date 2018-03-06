import { Observable } from 'rxjs/Observable';
import { ServiceResult } from './../../entity/service-result';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Entity } from './../../entity/entity';
import { BaseService } from '../../services/base.service';
import { BasePage } from './base.page';

export abstract class BaseList<T extends Entity, S extends BaseService<T>> extends BasePage {
    //
    dataSource: MatTableDataSource<T>;
    entities: T[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    containerId: string;

    constructor(
        private service: S,
        public displayedColumns: string[]) {
        super();
        this.service.getContainerId().subscribe(text => {
            this.containerId = text;
            this.service.getAll(this.containerId).subscribe(res => {
                console.log(res);
                this.entities = res.datum;
                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.entities);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
        })
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}