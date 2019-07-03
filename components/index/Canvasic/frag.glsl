@nomangle vTextureCoord resolution inputPixel uSampler delta red green blue mousePos

precision mediump float;

varying vec2 vTextureCoord;

uniform vec2 resolution;
uniform vec2 inputPixel;
uniform sampler2D uSampler;

uniform float delta;
uniform vec2 red;
uniform vec2 green;
uniform vec2 blue;
uniform vec2 mousePos;

@include "./split.glsl"

void main(void)
{
   gl_FragColor = split(vTextureCoord);
}
