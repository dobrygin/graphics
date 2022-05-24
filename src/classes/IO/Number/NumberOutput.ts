import { Bitmap } from '../../data/Bitmap';
import { ChunkedBitmap } from '../../data/ChunkedBitmap';
import { NodeOutput } from '../NodeOutput';
import { Node } from '../../Node';
import {IOType} from "../../../types/IO";

export default class NumberOutput extends NodeOutput {
    bitmap: Bitmap | ChunkedBitmap | null = null;

    constructor(public name: string, node: Node, ioType: IOType, shaderResultName) {
        super();

        this.setNode(node)
        this.ioType = ioType;
        this.shaderResultName = shaderResultName;
    }
}
