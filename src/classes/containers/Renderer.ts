import {Container, FORMATS, Renderer, Sprite, Texture} from "pixi.js";

export class AppRenderer {

    canvas: HTMLCanvasElement;
    container: Container;
    texture: Texture;
    renderer: Renderer;
    sprite: Sprite;

    constructor(public width: number, public height: number) {

        this.canvas = document.createElement('canvas');
        this.container = new Container();
        this.texture = Texture.fromBuffer(new Uint8Array(width * height * 4), width, height, { format: FORMATS.RGBA });
        this.renderer = new Renderer({
            width,
            height,
            backgroundAlpha: 0,
            view: this.canvas
        });

        this.sprite = Sprite.from(this.texture);

        this.container.addChild(this.sprite);
    }
}
