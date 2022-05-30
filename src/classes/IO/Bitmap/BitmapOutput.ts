import {Bitmap} from '../../data/Bitmap';
import {ChunkedBitmap} from '../../data/ChunkedBitmap';
import {NodeOutput} from '../NodeOutput';
import {Node} from '../../Node';
import {IOType} from "../../../types/IO";
import {action, makeObservable, observable, reaction} from "mobx";
import {FORMATS, Texture} from "pixi.js";
import OutputUIDataStore from "../../../store/data/OutputUIDataStore";
import {generateUUID} from "../../../utils/generateUUID";
import {SliderControl} from "../../controls/SliderControl";

export default class BitmapOutput extends NodeOutput {
  bitmap: Bitmap | ChunkedBitmap | null = null;
  texture: Texture = null;
  UIData: OutputUIDataStore;

  constructor(uiData: Partial<OutputUIDataStore>, public name: string, node: Node, ioType: IOType, shaderResultName: string) {
    super();

    this.UIData = new OutputUIDataStore(uiData);

    this.setNode(node)
    this.ioType = ioType;
    this.shaderResultName = shaderResultName;

    makeObservable(this, {
      texture: observable,
      setTexture: action,

      bitmap: observable,
      setBitmap: action,
    })

    reaction(() => this.bitmap, (bitmap) => {
      if (bitmap instanceof Bitmap) {
        this.setTexture(
            Texture.fromBuffer(
              bitmap.data,
              bitmap.width,
              bitmap.height,
              { format: FORMATS.RGBA}
          )
        )

        // @ts-ignore
        this.node.uniforms[`tex_${this.node.id}`] = this.node.bitmap.texture
        // @ts-ignore
        this.node.uniforms[`width_tex_${this.node.id}`] = this.node.bitmap.bitmap.width
        // @ts-ignore
        this.node.uniforms[`height_tex_${this.node.id}`] = this.node.bitmap.bitmap.height

        // @ts-ignore
        this.node.controlUniforms[`tex_${this.node.id}`] = this.node.bitmap.texture
        // @ts-ignore
        this.node.controlUniforms[`width_tex_${this.node.id}`] = this.node.bitmap.bitmap.width;
        // @ts-ignore
        this.node.controlUniforms[`height_tex_${this.node.id}`] = this.node.bitmap.bitmap.height;

        // @ts-ignore
        (this.node.controls[0] as SliderControl).setValue(this.node.bitmap.bitmap.width);
        // @ts-ignore
        (this.node.controls[1] as SliderControl).setValue(this.node.bitmap.bitmap.height);
      }
    })
  }

  setBitmap(value: Bitmap) {
    this.bitmap = value;
  }

  setTexture(tex: Texture) {
    this.texture = tex;
  }
}
