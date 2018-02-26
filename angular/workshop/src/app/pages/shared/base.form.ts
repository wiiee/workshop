import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { HeaderMessageComponent } from './../header-message/header-message.component';
import { Entity } from './../../entity/entity';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BaseService } from '../../services/base.service';
import { Constant } from '../../entity/constant';

export abstract class BaseForm<T extends Entity, S extends BaseService<T>> {
    //表单初始化数据
    entity: T
    backup: T;

    //是否新建/查看
    isNew: boolean;
    //是否编辑/查看
    isEdit: boolean;

    @ViewChild('msg')
    msg: HeaderMessageComponent;

    //数据类型名字
    entityName: string;
    //实体keys
    keys: string[];
    //id
    id: string | number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private matDialog: MatDialog,
        public service: S,
        private urlPath: string) {
        this.route.queryParamMap.subscribe(params => {
            this.id = this.route.snapshot.paramMap.get('id');
            this.id === Constant.INVALID_ID ? this.isNew = true : this.isNew = false;
            if (!this.isNew) {
                this.isNew = false;
                this.service.getOne(this.id).subscribe(res => {
                    console.log(JSON.stringify(res));
                    this.entity = res.data;
                    this.cloneEntity();
                });
            }
        });

        this.entityName = this.getEntityName();
    }

    //后退
    goBack(): void {
        this.location.back();
    }

    resetForm(): void {
        this.entity = Object.assign({}, this.backup);
    }

    cloneEntity(): void {
        this.backup = Object.assign({}, this.entity);
        this.keys = Object.keys(this.entity);
    }

    onSubmit() {
        console.log("Thanks for submitting! Data: " + JSON.stringify(this.entity));

        if (this.isNew) {
            this.service.add(this.entity).subscribe(res => {
                if (res.isSuccessful) {
                    this.entity = res.data;
                    this.redirect("Create " + this.entityName + " " + this.entity.id + " successfully!", null, [this.urlPath, this.entity.id]);
                }
                else {
                    this.msg.errorMsg = res.errorMsg;
                }
            });
        }
        else {
            this.service.update(this.entity).subscribe(res => {
                if (res.isSuccessful) {
                    this.msg.successMsg = "Update " + this.entityName + " " + this.entity.id + " successfully!";
                }
                else {
                    this.msg.errorMsg = res.errorMsg;
                }
            });
        }
    }

    delete(): void {
        let dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe(ok => {
            if (ok) {
                this.service.delete(this.entity.id).subscribe(res => {
                    if (res.isSuccessful) {
                        // Navigate to the user detail page with extras
                        this.redirect("Delete " + this.entityName + " " + this.entity.id + " successfully!", null, [this.urlPath]);
                    }
                    else {
                        this.msg.errorMsg = res.errorMsg;
                    }
                });
            }
        });
    }

    private redirect(successMsg: string, errorMsg: string, commands: any[]): void {
        let navigationExtras: NavigationExtras = {
            queryParams: {
            }
        };

        if (successMsg) {
            navigationExtras.queryParams.successMsg = successMsg;
        }

        if (errorMsg) {
            navigationExtras.queryParams.errorMsg = errorMsg;
        }

        // Navigate to the user detail page with extras
        //this.router.navigate(['/user', this.user.id], navigationExtras);
        this.router.navigate(commands, navigationExtras);
    }

    private getEntityName(): string {
        return this.constructor.name.split("DetailComponent")[0].toLowerCase();
    }
}