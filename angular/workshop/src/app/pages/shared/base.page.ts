import { Location } from '@angular/common';
export abstract class BasePage {
    constructor(public location: Location) { }

    toJson(data: any): string {
        return data ? JSON.stringify(data) : data;
    }

    //后退
    goBack(): void {
        this.location.back();
    }
}