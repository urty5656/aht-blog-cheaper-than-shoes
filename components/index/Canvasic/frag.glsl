precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 red;
uniform vec2 green;
uniform vec2 blue;
uniform vec2 mousePos;

void main(void)
{
   float r = texture2D(uSampler, vTextureCoord + mousePos * 0.01).r;
   float g = texture2D(uSampler, vTextureCoord + vec2(0, 0)).g;
   float b = texture2D(uSampler, vTextureCoord + mousePos * -0.01).b;
   vec4 result = vec4(r, g, b, 1.0);
   gl_FragColor = vec4(r, g, b, (r + g + b)/3.0);
}
