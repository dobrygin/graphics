export const uniforms = `
  uniform sampler2D tex1;
  uniform sampler2D tex2;
  uniform int width;
  uniform int height;
  uniform float saturation;
  uniform float brightness;
  uniform float contrast;
`

export const bitsConvert = `
vec2 texSize = vec2(width, height);
vec2 texCoord = vec2(gl_FragCoord.x / texSize.x, 1.0 - gl_FragCoord.y / texSize.y);

vec4 tex1_M = texture2D(tex1, texCoord) * 256.0;
vec4 tex2_M = texture2D(tex2, texCoord) * 256.0;

// float R_16 = (tex1_M.r * 256.0 + tex2_M.r) / 65536.0;
// float G_16 = (tex1_M.g * 256.0 + tex2_M.g) / 65536.0;
// float B_16 = (tex1_M.b * 256.0 + tex2_M.b) / 65536.0;
`

export const bitsRecover =`
float R = float(floor((R_16 * 65536.0) / 256.0)) / 256.0;
float G = float(floor((G_16 * 65536.0) / 256.0)) / 256.0;
float B = float(floor((B_16 * 65536.0) / 256.0)) / 256.0;
`

export const bitsRecoverFirst =`
float R = float(floor((R_16 * 65536.0) / 256.0)) / 256.0;
float G = float(floor((G_16 * 65536.0) / 256.0)) / 256.0;
float B = float(floor((B_16 * 65536.0) / 256.0)) / 256.0;
`

export const bitsRecoverSecond =`
float R = float((R_16 * 65536.0) % 256.0) / 256.0;
float G = float((G_16 * 65536.0) % 256.0) / 256.0;
float B = float((B_16 * 65536.0) % 256.0) / 256.0;
`
