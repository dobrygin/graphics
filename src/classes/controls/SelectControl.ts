import { Control } from './Control';
import { action, makeObservable, observable } from 'mobx';

export type SelectMap = {[key: string]: number};

export class SelectControl extends Control {
    public value: number;
    public map: SelectMap;

    constructor(
        public object: {},
        public field: string,
        map: SelectMap,
        public defaultValue: string,
    ) {
        super();
        this.value = this.object[this.field];
        makeObservable(this, {
            value: observable,
            setValue: action,
        }, { autoBind: true })

        this.setMap(map);
        this.setValue(map[this.defaultValue]);
    }

    setValue(value: number) {
        this.object[this.field] = value;
        this.value = value;
    }

    setMap(map: SelectMap) {
        this.map = map;
    }
}
