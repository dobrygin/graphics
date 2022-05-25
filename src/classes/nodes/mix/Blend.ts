import {RenderableNode} from '../../Node';
import {makeObservable, transaction} from 'mobx';
import {generateUUID} from '../../../utils/generateUUID';
import {IOType} from "../../../types/IO";
import {SelectControl} from "../../controls/SelectControl";
import {BitmapInput} from "../../IO/Bitmap/BitmapInput";
import BitmapOutput from "../../IO/Bitmap/BitmapOutput";

export class Blend extends RenderableNode {
    id = generateUUID();

    title: string = 'Blend';

    over: BitmapInput = new BitmapInput(
        {},
        'over',
        this,
        IOType.Bitmap
    );

    under: BitmapInput = new BitmapInput(
        {},
        'under',
        this,
        IOType.Bitmap
    );

    output: BitmapOutput = new BitmapOutput(
        {},
        'out',
        this,
        IOType.Bitmap,
        `Blend_func_output_${this.id}`
    )

    uniforms = {};

    constructor() {
        super();
        this.UIData.update({
            title: 'Blend'
        });
        transaction(() => {
            this.setControls([
                new SelectControl(
                    this.uniforms,
                    `selectControl_Blend_Operation_${this.id}`,
                    {
                        'Basic': 0,
                        'Mutiply': 1,
                        'Screen': 2,
                        'Overlay': 3
                    },
                    'Add'
                )
            ]);
            this.setInputs([this.over, this.under]);
            this.setOutputs([this.output]);
        });
        makeObservable(this, {
        });
    }

    async render() {
    }

    generateShaderUniforms() {
        return `uniform int selectControl_Blend_Operation_${this.id};`;
    }

    generateShaderCustoms() {
        return `vec3 blendNormal(vec3 base, vec3 blend) {
    return blend;
}

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
    return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
}`;
    }

    generateShaderCode() {
        // const c = (operation) => {
        //     const number1 = this.firstNumIn.isConnected ? this.firstNumIn.connectedTo.shaderResultName : `first_num_${this.id}`;
        //     const number2 = this.secondNumIn.isConnected ? this.secondNumIn.connectedTo.shaderResultName : `second_num_${this.id}`;
        //     return `Math_number_${this.id} = ${number1} ${operation} ${number2};`;
        // };
        const over = this.over?.connectedTo?.shaderResultName;
        const under = this.under?.connectedTo?.shaderResultName;

        return `vec4 Blend_func_output_${this.id} = vec4(1.0, 1.0, 1.0, 1.0);
${this.under.isConnected && this.over.isConnected ? `
if (selectControl_Blend_Operation_${this.id} == 0) {
    // vec3 O_${this.id} = ${under}.rgb * (1.0 - ${over}.a) + ${over}.rgb * ${over}.a;
    // Blend_func_output_${this.id} = vec4(O_${this.id}.rgb, );
    Blend_func_output_${this.id} = vec4(
        blendNormal(
            ${under}.rgb, 
            ${over}.rgb, 
            clamp(
                ${over}.a,
                0.0,
                1.0
            )
        ).rgb, 
        clamp(
            ${under}.a + ${over}.a, 
            0.0, 
            1.0
        )
    );
} else if(selectControl_Blend_Operation_${this.id} == 1) {
    Blend_func_output_${this.id} = ${under} * ${over};
} else if(selectControl_Blend_Operation_${this.id} == 2) {
    //
} else if(selectControl_Blend_Operation_${this.id} == 3) {
    //
}
` : ''}
        `;
    }
}
