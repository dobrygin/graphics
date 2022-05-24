import {BitmapInput} from '../../IO/Bitmap/BitmapInput';
import BitmapOutput from '../../IO/Bitmap/BitmapOutput';
import {RenderableNode} from '../../Node';
import {makeObservable, transaction} from 'mobx';
import {SliderControl} from '../../controls/SliderControl';
import {generateUUID} from '../../../utils/generateUUID';
import {IOType} from "../../../types/IO";
import NumberOutput from '../../IO/Number/NumberOutput';

export class BitmapChannelSplitter extends RenderableNode {
    id = generateUUID();

    title: string = 'RGBA Splitter';

    image: BitmapInput = new BitmapInput(
        'bitmap',
        this,
        IOType.Bitmap
    );

    outR: NumberOutput = new NumberOutput(
        'R',
        this,
        IOType.Number,
        `Splitter_R_${this.id}`
    );
    outG: NumberOutput = new NumberOutput(
        'G',
        this,
        IOType.Number,
        `Splitter_G_${this.id}`
    );
    outB: NumberOutput = new NumberOutput(
        'B',
        this,
        IOType.Number,
        `Splitter_B_${this.id}`
    );
    outA: NumberOutput = new NumberOutput(
        'A',
        this,
        IOType.Number,
        `Splitter_A_${this.id}`
    );

    uniforms = {};

    constructor() {
        super();
        transaction(() => {
            this.setInputs([this.image]);
            this.setOutputs([this.outR, this.outG, this.outB, this.outA]);
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
        return `float ${this.outR.shaderResultName} = ${this.image.connectedTo.shaderResultName}.r;
float ${this.outG.shaderResultName} = ${this.image.connectedTo.shaderResultName}.g;
float ${this.outB.shaderResultName} = ${this.image.connectedTo.shaderResultName}.b;
float ${this.outA.shaderResultName} = ${this.image.connectedTo.shaderResultName}.a;`;
    }
}
