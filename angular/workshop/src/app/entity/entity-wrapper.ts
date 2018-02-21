import { Entity } from './entity';

export class EntityWrapper<T1 extends Entity, T2> {
    public entity: T1;
    public tag: T2;
}