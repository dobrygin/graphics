import {BitmapInput} from '../../IO/Bitmap/BitmapInput';
import BitmapOutput from '../../IO/Bitmap/BitmapOutput';
import {RenderableNode} from '../../Node';
import {makeObservable, transaction} from 'mobx';
import {SliderControl} from '../../controls/SliderControl';
import {generateUUID} from '../../../utils/generateUUID';
import {IOType} from "../../../types/IO";
import {NumberInput} from "../../IO/Number/NumberInput";

export class BCS extends RenderableNode {
  id = generateUUID();
  title: string = 'BCS';
  image: BitmapInput = new BitmapInput(
      'bitmap',
      this,
      IOType.Bitmap
  );
  output: BitmapOutput = new BitmapOutput(
      'bitmap',
      this,
      IOType.Bitmap,
      `BCS_Result_${this.id}`
  );

  contrast: NumberInput = new NumberInput(
      'contrast',
      this,
      IOType.Number,
  )

  brightness: NumberInput = new NumberInput(
      'brightness',
      this,
      IOType.Number,
  )

  saturation: NumberInput = new NumberInput(
      'saturation',
      this,
      IOType.Number,
  )

  uniforms = {
    [`contrast_BCS_${this.id}`]: 1.0,
    [`brightness_BCS_${this.id}`]: 0.0,
    [`saturation_BCS_${this.id}`]: 1.0,
  };

  constructor() {
    super();
    transaction(() => {
      this.setInputs([this.image, this.brightness, this.contrast, this.saturation]);
      this.setOutputs([this.output]);
    });
    this.setControls([
      new SliderControl(this.uniforms, `contrast_BCS_${this.id}`, 0.1, 0.0, 10.0),
      new SliderControl(this.uniforms, `brightness_BCS_${this.id}`, 0.1, -1.0, 1.0),
      new SliderControl(this.uniforms, `saturation_BCS_${this.id}`, 0.1, 0.0, 10.0),
    ]);
    makeObservable(this, {
    });
  }

  async render() {
  }

  generateShaderUniforms() {
    return `uniform float contrast_BCS_${this.id};` +
        '\n' +
        `uniform float brightness_BCS_${this.id};` +
        '\n' +
        `uniform float saturation_BCS_${this.id};`
  }

  generateShaderCustoms() {
    return `mat4 brightnessMatrix( float brightness )
{
    return mat4( 1, 0, 0, 0,
                 0, 1, 0, 0,
                 0, 0, 1, 0,
                 brightness, brightness, brightness, 1 );
}

mat4 contrastMatrix( float contrast )
{
  float t = ( 1.0 - contrast ) / 2.0;
    
  return mat4( contrast, 0, 0, 0,
                 0, contrast, 0, 0,
                 0, 0, contrast, 0,
                 t, t, t, 1 );

}

mat4 saturationMatrix( float saturation )
{
    vec3 luminance = vec3( 0.3086, 0.6094, 0.0820 );
    
    float oneMinusSat = 1.0 - saturation;
    
    vec3 red = vec3( luminance.x * oneMinusSat );
    red+= vec3( saturation, 0, 0 );
    
    vec3 green = vec3( luminance.y * oneMinusSat );
    green += vec3( 0, saturation, 0 );
    
    vec3 blue = vec3( luminance.z * oneMinusSat );
    blue += vec3( 0, 0, saturation );
    
    return mat4( red,     0,
                 green,   0,
                 blue,    0,
                 0, 0, 0, 1 );
}`;
  }

  generateShaderCode() {
    const c = (a, c) => {
      return a.isConnected ? a.connectedTo.shaderResultName : c
    }
    return `vec4 ${this.output.shaderResultName} = 
saturationMatrix(${c(this.saturation, `saturation_BCS_${this.id}`)}) * 
brightnessMatrix(${c(this.brightness, `brightness_BCS_${this.id}`)}) * ` +
`contrastMatrix(${c(this.contrast, `contrast_BCS_${this.id}`)}) * ${this.image.connectedTo.shaderResultName};`;
  }
}
