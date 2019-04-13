import * as Pixi from 'pixi.js';
import React, { useEffect, useRef } from 'react';

let app: Pixi.Application;

const Cavasic: React.FC = () => {
  const $canvas = useRef<HTMLDivElement>(null);
  // const $app = useRef<Pixi.Application>();

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (!$canvas.current) {
      return;
    }

    if (!app) {
      app = new Pixi.Application({
        width: 480,
        height: 54,
        transparent: true,
      });

      // [todo] use './frag.glsl'
      const frag = `
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
  }`;
      const filter = new Pixi.Filter(undefined, frag);
      filter.uniforms.red = [-10, 0];
      filter.uniforms.blue = [0, 0];
      filter.uniforms.green = [10, 10];
      const container = new Pixi.Container();
      container.filterArea = app.screen;
      container.filters = [filter];
      const text = new Pixi.Text('PLEASE WAIT', {
        fontFamily: 'Spoqa Han Sans',
        fontSize: 32,
        fontWeight: 700,
        fill: '#ffffff',
        align: 'center',
      });
      container.addChild(text);

      const background = new Pixi.Graphics();
      background
        .beginFill(0x303030)
        .drawRect(0, 0, 480, 54)
        .endFill();
      text.anchor.set(0.5);
      text.x = app.screen.width / 2;
      text.y = app.screen.height / 2;
      app.stage.addChild(background);
      app.stage.addChild(container);

      app.ticker.add(() => {
        const width = container.width;
        const height = container.height;
        const mousePos = app!.renderer.plugins.interaction.mouse.getLocalPosition(
          container,
        );

        filter.uniforms.mousePos = [
          (mousePos.x - width / 2) / width,
          (mousePos.y - height / 2) / height,
        ];
      });
    }

    $canvas.current.appendChild(app.view);
  }, []);

  return <div ref={$canvas} style={{ width: '480px', height: '54px' }} />;
};

export default Cavasic;
