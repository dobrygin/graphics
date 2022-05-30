import {generateUUID} from '../../../utils/generateUUID';
import {IOType} from "../../../types/IO";
import {SliderControl} from "../../controls/SliderControl";
import {RenderableNode} from "../../Node";
import NumberOutput from "../../IO/Number/NumberOutput";

export class Number extends RenderableNode {
    id = generateUUID();
    title = "Number Input Node";

    number = new NumberOutput({ title: 'Number' }, 'bitmap', this, IOType.Number, `number_${this.id}`);

    uniforms = {
        [`number_${this.id}`]: 0,
    };

    constructor() {
        super();
        this.UIData.update({
            title: 'Number'
        });
        this.setControls([
            new SliderControl({ title: 'Number' }, this.uniforms, `number_${this.id}`, 1, 0, 1),
        ]);
        this.setOutputs([this.number]);
    }

    generateShaderUniforms() {
        return `uniform float number_${this.id};`
    }

    generateShaderCustoms() {
        return '';
    }

    generateShaderCode() {
        return ``;
    }
}
