import type Store from "../index";
import {makeAutoObservable} from "mobx";

type MousePos = {
    x: number,
    y: number,
}

export class PointerManager {
    x: number = 0;
    y: number = 0;

    isSpaghettiHovered: boolean = false;
    isPointerShown: boolean = true;

    get cursor(): string {
        if (!this.isPointerShown) {
            return 'none';
        }

        if (this.isSpaghettiHovered) {
            return 'pointer';
        }

        return 'default';
    }

    get mousePos(): MousePos {
        return { x: this.x, y: this.y };
    }

    constructor(public root: Store) {
        window.addEventListener('mousemove', (e) => {
            this.update({
                x: e.clientX,
                y: e.clientY
            })
        })
        makeAutoObservable(this, {}, {autoBind: true});
    }

    setIsSpaghettiHovered(state) {
        this.isSpaghettiHovered = state;
    }

    setIsPointerShown(shown: boolean) {
        this.isPointerShown = shown;
    }

    update(obj) {
        Object.assign(this, obj);
    }
}