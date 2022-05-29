import {generateUUID} from '../../../utils/generateUUID';
import {InputNode} from '../../InputNode';
import BitmapOutput from '../../IO/Bitmap/BitmapOutput';
import {IOType} from "../../../types/IO";
import {SliderControl} from "../../controls/SliderControl";

export class Image extends InputNode {
  id = generateUUID();
  title = "Image Node";

  bitmap = new BitmapOutput({ title: 'Bitmap' }, 'bitmap', this, IOType.Bitmap, `tex_color_${this.id}`);

  uniforms = {
    [`tex_${this.id}`]: false,
    [`width_tex_${this.id}`]: 2048,
    [`height_tex_${this.id}`]: 2048,
    [`image_transform_X_${this.id}`]: 0,
    [`image_transform_Y_${this.id}`]: 0,
  };

  constructor() {
    super();
    this.UIData.update({
      title: 'Image'
    });
    this.setControls([
        new SliderControl({ title: 'Width' }, this.uniforms, `width_tex_${this.id}`, 1, -2048, 2048),
        new SliderControl({ title: 'Height' }, this.uniforms, `height_tex_${this.id}`, 1, -2048, 2048),
        new SliderControl({ title: 'Position X' }, this.uniforms, `image_transform_X_${this.id}`, 1, -100, 100),
        new SliderControl({ title: 'Position Y' }, this.uniforms, `image_transform_Y_${this.id}`, 1, -100, 100),
    ]);
    this.setOutputs([this.bitmap]);
  }

  generateShaderUniforms() {
    return `uniform sampler2D tex_${this.id};
uniform int width_tex_${this.id};
uniform int height_tex_${this.id};
uniform float image_transform_X_${this.id};
uniform float image_transform_Y_${this.id};`
  }

  generateShaderCustoms() {
    return '';
  }

  generateShaderCode() {
    return `vec2 texSize_${this.id} = vec2(width_tex_${this.id}, height_tex_${this.id});
vec2 texCoord_${this.id} = vec2(
  (gl_FragCoord.x - image_transform_X_${this.id}) / (texSize_${this.id}.x),
  (gl_FragCoord.y - image_transform_Y_${this.id}) / (texSize_${this.id}.y)
);
vec4 tex_color_${this.id} = texture2D(tex_${this.id}, texCoord_${this.id});
if (texCoord_${this.id}.x > 1.0 || texCoord_${this.id}.x < 0.0 || texCoord_${this.id}.y > 1.0 || texCoord_${this.id}.y < 0.0){
  tex_color_${this.id} = vec4(0.0, 0.0, 0.0, 0.0);
}`;
  }
}
