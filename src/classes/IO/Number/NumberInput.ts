import { NodeInput } from '../NodeInput';
import type { Node } from '../../Node';
import {IOType} from "../../../types/IO";

export class NumberInput extends NodeInput {
    constructor(public name: string, node: Node, ioType: IOType, public defaultValue: number = 0.0) {
        super();

        this.setNode(node);
        this.ioType = ioType;
    }
}
