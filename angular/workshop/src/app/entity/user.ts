import { Entity } from './entity';

export class User implements Entity {
    constructor(public id: string, public password: string, public name: string, 
        public nickName: string, public mobileNo: string, public pics: string[], public gender: any, 
        public level: any, public isOff: boolean){}
}