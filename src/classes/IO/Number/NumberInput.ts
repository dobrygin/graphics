import { NodeInput } from '../NodeInput';
import type { Node } from '../../Node';
import {IOType} from "../../../types/IO";
import InputUIDataStore from "../../../store/data/InputUIDataStore";
import {generateUUID} from "../../../utils/generateUUID";

export class NumberInput extends NodeInput {
    UIData: InputUIDataStore
    constructor(uiData: Partial<InputUIDataStore>, public name: string, node: Node, ioType: IOType, public defaultValue: number = 0.0) {
        super();

        this.UIData = new InputUIDataStore(uiData);
        this.setNode(node);
        this.ioType = ioType;
    }
}
