import { Location } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ServiceResult } from './../../entity/service-result';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Entity } from './../../entity/entity';
import { BaseService } from '../../services/base.service';
import { BasePage } from './base.page';

export abstract class BaseList<T extends Entity, S extends BaseService<T>> extends BasePage {
    dataSource: MatTableDataSource<T>;
    entities: T[];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private service: S,
        public displayedColumns: string[],
        location: Location) {
        super(location);

        this.service.getAll().subscribe(res => {
            this.entities = res.datum;
            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.entities);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}