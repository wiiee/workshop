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

    entityTypeName: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private matDialog: MatDialog,
        public service: BaseService<T>,
        private urlPath: string) {
            this.isNew = true;
            console.log(typeof this);
    }

    goBack(): void {
        this.location.back();
    }

    redirect(successMsg: string, errorMsg: string, commands: any[]): void {
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

    resetForm(): void {
        this.entity = Object.assign({}, this.backup);
    }

    cloneEntity(): void {
        this.backup = Object.assign({}, this.entity);
    }

    onSubmit() {
        console.log("Thanks for submitting! Data: " + JSON.stringify(this.entity));

        if (this.isNew) {
            this.service.add(this.entity).subscribe(res => {
                if (res.isSuccessful) {
                    this.redirect("Create user " + this.entity.id + " successfully!", null, [this.urlPath, this.entity.id]);
                }
                else {
                    this.msg.errorMsg = res.errorMsg;
                }
            });
        }
        else {
            this.service.update(this.entity).subscribe(res => {
                if (res.isSuccessful) {
                    this.msg.successMsg = "Update user " + this.entity.id + " successfully!";
                }
                else {
                    this.msg.errorMsg = res.errorMsg;
                }
            });
        }
    }

    getEntity(): void {
        this.route.queryParamMap.subscribe(params => {
          const id = this.route.snapshot.paramMap.get('id');
    
          if (id !== Constant.INVALID_ID) {
            this.isNew = false;
            this.service.getOne(id).subscribe(res => {
              console.log(res);
              this.entity = res.data;
              this.cloneEntity();
            });
          }
        });
      }

      delete(): void {
        let dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
          width: '250px'
        });
    
        dialogRef.afterClosed().subscribe(ok => {
          if (ok) {
            this.service.delete(this.entity.id).subscribe(res => {
              if (res.isSuccessful) {
                let navigationExtras: NavigationExtras = {
                  queryParams: { 'successMsg': "Delete user " + this.entity.id + " successfully!" }
                };
    
                // Navigate to the user detail page with extras
                this.redirect("Delete user " + this.entity.id + " successfully!", null, ['/user']);
              }
              else {
                this.msg.errorMsg = res.errorMsg;
              }
            });
          }
        });
      }
}