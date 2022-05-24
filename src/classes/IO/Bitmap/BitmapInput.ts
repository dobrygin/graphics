import { NodeInput } from '../NodeInput';
import type { Node } from '../../Node';
import {IOType} from "../../../types/IO";

export class BitmapInput extends NodeInput {
  constructor(public name: string, node: Node, ioType: IOType) {
    super();

    this.setNode(node);
    this.ioType = ioType;
  }
  //
  // setBitmap(value: Bitmap) {
  //   this.bitmap = value;
  // }
}
