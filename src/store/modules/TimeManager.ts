import {makeAutoObservable, reaction} from "mobx";
import type Store from "../index";
import {Time} from "../../classes/nodes/input/Time";

export class TimeManager {
    currentTime: number = 0;

    constructor(store: Store) {
        makeAutoObservable(this, {}, { autoBind: true })

        reaction(() => this.currentTime, time => {
            store.nodes.forEach(node => {
                if (node instanceof Time) {
                    // @ts-ignore
                    node.controls[0].setValue(time);
                }
            })
        })
    }

    tick() {
        this.update({
            currentTime: this.currentTime + 1
        })
    }

    update(obj) {
        Object.assign(this, obj);
    }
}