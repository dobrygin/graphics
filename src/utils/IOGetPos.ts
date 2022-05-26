import {Input, Output} from "../classes/IO/IO";

export const IOGetPos = (io: Input | Output) => {
    const el = document.querySelector(`#${io.id}`);
    const bound = el.getBoundingClientRect();
    const left = bound.x + (bound.width / 2);
    const top = bound.y + (bound.height / 2);

    return [left, top];
}