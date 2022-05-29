import { makeAutoObservable } from 'mobx';
import {Input} from "../../classes/IO/IO";

export default class ControlUIDataStore {
    title: string;
    input: Input;

    constructor(data?: Partial<ControlUIDataStore>) {
        this.update(
            Object.assign(
                {
                    title: 'NodeDefaultTitle',
                    input: null,
                },
                data
            )
        );
        makeAutoObservable(this, {}, { autoBind: true })
    }

    update(data: Partial<ControlUIDataStore>): void {
        Object.assign(this, data)
    }
}
