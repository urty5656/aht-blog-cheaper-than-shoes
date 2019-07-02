import { globalStoreCtx } from '@/stores/global';
import { debounce } from 'lodash';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as Pixi from 'pixi.js';
import React, { useContext, useEffect, useRef } from 'react';
import { animateLoader, animateRim, drawRim } from './render';
import styles from './styles.scss';

const Cursor: React.FC = () => {
  const { cursor: store } = useContext(globalStoreCtx);
  const $app = useRef<Pixi.Application>();
  const $canvas = useRef<HTMLDivElement>(null);

  // Canvas
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

    const container = new Pixi.Container();
    app.stage.addChild(container);

    const updateCanvasDim = debounce(() => {
      app.resize();
    }, 100);
    window.addEventListener('resize', updateCanvasDim);

    // setup shapes
    const rim = new Pixi.Graphics();
    const loader = new Pixi.Graphics();
    container.addChild(rim, loader);

    rim.lineStyle(8, 0x202020, 1);
    loader.beginFill(0x202020);

    const disposeRim = autorun(() => {
      animateRim(rim, store.type);
    });
    drawRim(rim, 0);

    const disposeLoader = autorun(() => {
      animateLoader(loader, store.isLoading);
    });

    app.loader.onLoad = console.log;
    app.ticker.add(() => {
      const mousePos = app.renderer.plugins.interaction.mouse.getLocalPosition(
        app.stage,
      );
      container.position = mousePos;
    });

    store.setInitialized();

    $app.current = app;
    $canvas.current.appendChild(app.view);

    return () => {
      disposeRim();
      disposeLoader();
      window.removeEventListener('resize', updateCanvasDim);
      app.destroy();
    };
  }, []);

  return <div ref={$canvas} className={styles.canvas} />;
};

export default observer(Cursor);
