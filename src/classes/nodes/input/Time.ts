
import {Number} from "./Number";
import {SliderControl} from "../../controls/SliderControl";

export class Time extends Number {
    constructor() {
        super()
        this.title = "Time Input Node";

        this.UIData.update({
            title: 'Time',
        })

        this.number.UIData.update({
            title: 'Time',
        })

        if (this.controls[0] instanceof SliderControl) {
            this.controls[0].UIData.update({
                title: 'Time',
            })
        }
    }

}