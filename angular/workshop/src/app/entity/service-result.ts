import { Entity } from './entity';

export class ServiceResult<T extends Entity>{
    constructor(public isSuccessful: boolean, public errorCode: number, public errorMsg: string, public data: T, public datum: T[]){};
}