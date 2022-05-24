// Brigtness Contrast Saturation Matrices

import { bitsConvert, bitsRecoverFirst, uniforms } from '../default';

export const BCSMatrix = `
  ${uniforms}
 
  
  mat4 brightnessMatrix( float brightness )
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
  }
 
  
  void main(){
    // 
    //
    //  vec4 applyBCS = 
    //    saturationMatrix(saturation) * 
    //    brightnessMatrix(brightness) * 
    //    contrastMatrix(contrast) * 
    //    vec4(R_16, G_16, B_16, 1.0);
    // 
    //  R_16 = applyBCS.r;
    //  G_16 = applyBCS.g;
    //  B_16 = applyBCS.b;
    //
    //
    
    vec2 texSize = vec2(width, height);
    vec2 texCoord = vec2(gl_FragCoord.x / texSize.x, gl_FragCoord.y / texSize.y);
    
    vec4 tex1_M = texture2D(tex1, texCoord);
    
    vec4 applyBCS = 
        saturationMatrix(saturation) * 
        brightnessMatrix(brightness) * 
        contrastMatrix(contrast) * 
        vec4(tex1_M.r, tex1_M.g, tex1_M.b, tex1_M.a);
    
    gl_FragColor = applyBCS;
  }
`
