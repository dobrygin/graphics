import { ALPHA_MODES, Container, Extract, FORMATS, Renderer, Sprite, Texture, TYPES } from 'pixi.js';
import { Bitmap } from '../data/Bitmap';

export default class ImageContainer {
  container: Container;
  renderer: Renderer;
  canvas: HTMLCanvasElement;
  sprite: Sprite;
  texture: Texture;
  output: Bitmap = null;

  constructor(
    public width: number,
    public height: number,
  ) {

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

    // if (this.buffer instanceof Uint16Array) {
    // add support for 16 bits later
    // }
  }



  render(): Bitmap {
    this.renderer.render(this.container);
    const extract = new Extract(this.renderer);
    this.output = new Bitmap(extract.pixels(), this.width, this.height);
    return this.output;
  }

}
