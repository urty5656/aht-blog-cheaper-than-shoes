vec4 texture(vec2 coord) {
  return texture2D(uSampler, coord);
}

// https://github.com/bradley/Blotter/blob/master/src/assets/shaders/core/blending.js
vec4 blend(vec4 top, vec4 base) {
  vec4 blend = vec4(0.0);

  if (base.a == 1.0) {
    base.a = 0.999999;
  }

  if (top.a >= 1.0) {
    blend = top.rgba;
  } else if (top.a == 0.0) {
    blend = base.rgba;
  } else {
    blend.a = 1.0 - (1.0 - top.a) * (1.0 - base.a);
    blend.r = (top.r * top.a / blend.a) + (base.r * base.a * (1.0 - top.a) / blend.a);
    blend.g = (top.g * top.a / blend.a) + (base.g * base.a * (1.0 - top.a) / blend.a);
    blend.b = (top.b * top.a / blend.a) + (base.b * base.a * (1.0 - top.a) / blend.a);
  }

  return blend;
}

// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
float rand(float n){
  return fract(sin(n) * 43758.5453123);
}
float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

vec4 split(vec2 uv) {
  // [todo] circular limit
  vec2 maxOffset = vec2(0.03);

  vec4 orig = texture(uv).rgba;
  vec4 base = vec4(0.101, 0.1176, 0.1216, 1.0);

  vec2 offset = clamp(mousePos * 0.0001, vec2(-maxOffset), vec2(maxOffset));
  vec2 absOffset = abs(offset);

  vec4 r = texture(uv + offset).rgba;
  vec4 g = texture(uv - offset / 9.0).rgba;
  vec4 b = texture(uv - offset).rgba;

  // [todo] naming
  vec4 rr = blend(r, base);
  vec4 rg = blend(g, base);
  vec4 rb = blend(b, base);
  float ra = rr.a + rg.a + rb.a;
  // 0 = 1, maxOffset = rand
  // offset / maxOffset = 0 ~ 1
  //  float ra = 1.0 - rand((gl_FragCoord.xy) * sin(delta)) * max(absOffset.x / maxOffset.x, absOffset.y / maxOffset.y);

  return blend(vec4(rr.r, rg.g, rb.b, ra), base);
}