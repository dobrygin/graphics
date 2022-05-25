import { Bitmap } from '../../data/Bitmap';
import { ChunkedBitmap } from '../../data/ChunkedBitmap';
import { NodeOutput } from '../NodeOutput';
import { Node } from '../../Node';
import {IOType} from "../../../types/IO";
import OutputUIDataStore from "../../../store/data/OutputUIDataStore";

export default class NumberOutput extends NodeOutput {
    bitmap: Bitmap | ChunkedBitmap | null = null;
    UIData: OutputUIDataStore;

    constructor(uiData: Partial<OutputUIDataStore>, public name: string, node: Node, ioType: IOType, shaderResultName) {
        super();

        this.UIData = new OutputUIDataStore(uiData);
        this.setNode(node)
        this.ioType = ioType;
        this.shaderResultName = shaderResultName;
    }
}
