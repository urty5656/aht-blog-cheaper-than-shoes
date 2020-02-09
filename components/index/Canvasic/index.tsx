import { debounce } from 'lodash';
import * as Pixi from 'pixi.js';
import React, { useEffect, useRef } from 'react';

import fragment from './frag.glsl';
import styles from './styles.module.scss';

const Cavasic: React.FC = () => {
  const $app = useRef<Pixi.Application>();
  const $canvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!$canvas.current || $app.current) {
      return;
    }

    const { width, height } = $canvas.current.getBoundingClientRect();
    const app = new Pixi.Application({
      width,
      height,
      antialias: true,
      transparent: true,
      resizeTo: window,
    });

    const filter = new Pixi.Filter(undefined, fragment.sourceCode);
    filter.uniforms.red = [-10, 0];
    filter.uniforms.blue = [0, 0];
    filter.uniforms.green = [10, 10];
    const container = new Pixi.Container();
    container.filterArea = app.screen;
    container.filters = [filter];
    const text = new Pixi.Text('MIND THE BLANK', {
      fontFamily: 'Spoqa Han Sans',
      fontSize: 144,
      fontWeight: 700,
      fill: '#fff',
      align: 'center',
    });
    container.addChild(text);

    text.anchor.set(0.5);
    text.x = app.screen.width / 2;
    text.y = app.screen.height / 2;
    app.stage.addChild(container);

    const updateCanvasDim = debounce(() => {
      app.resize();
      text.x = app.screen.width / 2;
      text.y = app.screen.height / 2;
    }, 100);
    window.addEventListener('resize', updateCanvasDim);

    let time = 0;
    app.ticker.add(delta => {
      const screenWidth = app.screen.width;
      const screenHeight = app.screen.height;
      const { x, y } = app.renderer.plugins.interaction.mouse.getLocalPosition(
        app.stage,
      );

      const mouseX = x - screenWidth / 2;
      const mouseY = y - screenHeight / 2;

      time += delta;
      filter.uniforms.delta = time;
      filter.uniforms.mousePos = [mouseX, mouseY];
    });

    $app.current = app;
    $canvas.current.appendChild(app.view);

    return () => {
      window.removeEventListener('resize', updateCanvasDim);
      app.destroy();
    };
  }, []);

  return <div ref={$canvas} className={styles.canvas} />;
};

export default Cavasic;
