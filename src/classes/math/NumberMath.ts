import {RenderableNode} from '../Node';
import {makeObservable, transaction} from 'mobx';
import {generateUUID} from '../../utils/generateUUID';
import {IOType} from "../../types/IO";
import NumberOutput from '../IO/Number/NumberOutput';
import {NumberInput} from "../IO/Number/NumberInput";
import {SelectControl} from "../controls/SelectControl";
import {SliderControl} from "../controls/SliderControl";

export class NumberMath extends RenderableNode {
    id = generateUUID();

    title: string = 'Number Math';

    firstNumIn: NumberInput = new NumberInput(
        { title: 'First number', isShown: false },
        'number',
        this,
        IOType.Bitmap
    );

    secondNumIn: NumberInput = new NumberInput(
        { title: 'Second number', isShown: false },
        'number',
        this,
        IOType.Bitmap
    );

    numberOut: NumberOutput = new NumberOutput(
        { title: 'Number' },
        'number',
        this,
        IOType.Number,
        `Math_number_${this.id}`
    );

    uniforms = {
        [`first_num_${this.id}`]: 0,
        [`second_num_${this.id}`]: 0,
    };

    constructor() {
        super();
        this.UIData.update({
            title: 'Number math'
        });
        transaction(() => {
            this.setControls([
                new SliderControl({ title: 'First number', input: this.firstNumIn }, this.uniforms, `first_num_${this.id}`, 0.01, -4.0, 4.0),
                new SliderControl({ title: 'Second number', input: this.secondNumIn }, this.uniforms, `second_num_${this.id}`, 0.01, -4.0, 4.0),
                new SelectControl(
                    this.uniforms,
                    `selectControl_Math_Operation_${this.id}`,
                    {
                        'Add': 0,
                        'Divide': 1,
                        'Multiply': 2,
                        'Minus': 3,
                        'Sin': 4,
                        'Cos': 5
                    },
                    'Add'
                )
            ]);
            this.setInputs([this.firstNumIn, this.secondNumIn]);
            this.setOutputs([this.numberOut]);
        });
        makeObservable(this, {
        });
    }

    async render() {
    }

    generateShaderUniforms() {
        return `uniform int selectControl_Math_Operation_${this.id};
uniform float first_num_${this.id};
uniform float second_num_${this.id};`
    }

    generateShaderCustoms() {
        return ``;
    }

    generateShaderCode() {
        const c = (operation) => {
            const number1 = this.firstNumIn.isConnected ? this.firstNumIn.connectedTo.shaderResultName : `first_num_${this.id}`;
            const number2 = this.secondNumIn.isConnected ? this.secondNumIn.connectedTo.shaderResultName : `second_num_${this.id}`;
            if (operation === "sin") {
                return `Math_number_${this.id} = sin(${number1});`;
            } else if (operation === "cos") {
                return `Math_number_${this.id} = cos(${number1});`;
            } else {
                return `Math_number_${this.id} = ${number1} ${operation} ${number2};`;
            }
        };
        return `float Math_number_${this.id} = 0.0;
if (selectControl_Math_Operation_${this.id} == 0) {
    ${c('+')}
} else if(selectControl_Math_Operation_${this.id} == 1) {
    ${c('/')}
} else if(selectControl_Math_Operation_${this.id} == 2) {
    ${c('*')}
} else if(selectControl_Math_Operation_${this.id} == 3) {
    ${c('-')}
} else if(selectControl_Math_Operation_${this.id} == 4) {
    ${c('sin')}
} else if(selectControl_Math_Operation_${this.id} == 5) {
    ${c('cos')}
}
        `;
    }
}
