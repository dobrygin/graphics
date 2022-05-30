import {generateUUID} from '../../../utils/generateUUID';
import {IOType} from "../../../types/IO";
import {SliderControl} from "../../controls/SliderControl";
import {RenderableNode} from "../../Node";
import NumberOutput from "../../IO/Number/NumberOutput";

export class UVNode extends RenderableNode {
    id = generateUUID();
    title = "uv";

    x = new NumberOutput({ title: 'UV X' }, 'bitmap', this, IOType.Number, `glFragX_${this.id}`);
    y = new NumberOutput({ title: 'UV Y' }, 'bitmap', this, IOType.Number, `glFragY_${this.id}`);

    uniforms = {};

    constructor() {
        super();
        this.UIData.update({
            title: 'UV'
        });
        this.setOutputs([this.x, this.y]);
    }

    generateShaderUniforms() {
        return ``
    }

    generateShaderCustoms() {
        return ``;
    }

    generateShaderCode() {
        return `float glFragX_${this.id} = gl_FragCoord.x / float(width);
float glFragY_${this.id} = gl_FragCoord.y / float(height);`;;
    }
}
