import BitmapOutput from '../../IO/Bitmap/BitmapOutput';
import {RenderableNode} from '../../Node';
import {makeObservable, transaction} from 'mobx';
import {generateUUID} from '../../../utils/generateUUID';
import {IOType} from "../../../types/IO";
import {NumberInput} from "../../IO/Number/NumberInput";

export class BitmapChannelCombiner extends RenderableNode {
    id = generateUUID();

    title: string = 'RGBA Combiner';

    image: BitmapOutput = new BitmapOutput(
        {},
        'bitmap',
        this,
        IOType.Bitmap,
        `Ch_Splitter_Out_${this.id}`
    );

    inR: NumberInput = new NumberInput(
        {},
        'R',
        this,
        IOType.Number,
    );
    inG: NumberInput = new NumberInput(
        {},
        'G',
        this,
        IOType.Number,
    );
    inB: NumberInput = new NumberInput(
        {},
        'B',
        this,
        IOType.Number,
    );
    inA: NumberInput = new NumberInput(
        {},
        'A',
        this,
        IOType.Number,
    );

    uniforms = {};

    constructor() {
        super();
        this.UIData.update({
            title: 'RGBA Combiner'
        });

        transaction(() => {
            this.setInputs([this.inR, this.inG, this.inB, this.inA]);
            this.setOutputs([this.image]);
        });
        makeObservable(this, {
        });
    }

    async render() {
    }

    generateShaderUniforms() {
        return ``
    }

    generateShaderCustoms() {
        return ``;
    }

    generateShaderCode() {
        const c = (input) => {
            return input.isConnected ? input.connectedTo.shaderResultName : input.defaultValue;
        }
        return `vec4 ${this.image.shaderResultName} = vec4(${c(this.inR)}, ${c(this.inG)}, ${c(this.inB)}, ${c(this.inA)});`;
    }
}
