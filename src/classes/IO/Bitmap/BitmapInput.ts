import { NodeInput } from '../NodeInput';
import type { Node } from '../../Node';
import {IOType} from "../../../types/IO";
import InputUIDataStore from "../../../store/data/InputUIDataStore";

export class BitmapInput extends NodeInput {
  UIData: InputUIDataStore;

  constructor(uiData: Partial<InputUIDataStore>, public name: string, node: Node, ioType: IOType) {
    super();
    this.UIData = new InputUIDataStore(uiData);

    this.setNode(node);
    this.ioType = ioType;
  }
  //
  // setBitmap(value: Bitmap) {
  //   this.bitmap = value;
  // }
}
