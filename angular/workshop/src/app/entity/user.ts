import { Entity } from './entity';

export class User implements Entity {
    constructor(public id: string = null, public password: string = null, public name: string = null, 
        public nickName: string = null, public mobileNo: string = null, public pics: string[] = null, 
        public gender: any = null, public level: any = null, public isOff: boolean = false){}
}