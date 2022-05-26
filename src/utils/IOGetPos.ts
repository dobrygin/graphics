import {Input, Output} from "../classes/IO/IO";

export const IOGetPos = (io: Input | Output) => {
    const el = document.querySelector(`#${io.id}`);
    const bound = el.getBoundingClientRect();
    const left = bound.x + (io instanceof Output ? bound.width : 0);
    const top = bound.y;

    return [left, top];
}