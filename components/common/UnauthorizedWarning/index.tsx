import anime from 'animejs';
import { debounce, shuffle } from 'lodash';
import { observer } from 'mobx-react-lite';
import Router from 'next/router';
import * as Pixi from 'pixi.js';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { authStoreCtx } from '../../../stores/auth';
import { useScrollLock } from '../../../utils/hooks';
import Anchor from '../Anchor';
import styles from './style.scss';

let app: Pixi.Application;
let squares: any[] = [];

const ALPHA = 0.94;
const addSquare = (
  x: number,
  y: number,
  offsetX: number = 0,
  offsetY: number = 0,
) => {
  const animeTarget = { alpha: ALPHA };
  const square = new Pixi.Graphics();
  square
    .beginFill(0x16161d)
    .drawRect(250 * x + offsetX, 250 * y + offsetY, 250, 250)
    .endFill();
  square.alpha = 0;

  return {
    square,
    activate: () => {
      square.alpha = ALPHA;

      let prevAlpha: number;
      anime({
        targets: animeTarget,
        keyframes: [
          { alpha: 0 },
          { alpha: ALPHA },
          { alpha: 0 },
          { alpha: ALPHA },
        ],
        duration: 150,
        easing: 'steps(1)',
        update: anim => {
          const alpha = anim.animatables[0].target.alpha;
          if (prevAlpha === alpha) {
            return;
          }
          prevAlpha = alpha;
          square.alpha = alpha;
        },
      }).finished.then(() => {
        anime({
          targets: animeTarget,
          alpha: 0.91,
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutSine',
          duration: () => Math.random() * 500 + 1500,
          update: anim => {
            const alpha = anim.animatables[0].target.alpha;
            square.alpha = alpha;
          },
        });
      });
    },
    deactivate: () => {
      square.alpha = 0;
      anime.remove(animeTarget);
    },
  };
};

const clearCanvas = () => {
  app.stage.children.forEach(child => child.destroy());
  app.stage.removeChildren();
  squares = [];
};

const placeSquares = () => {
  clearCanvas();

  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;

  const rows = innerHeight / 250;
  const offsetY = (250 - (window.innerHeight % 250)) / 2;
  const cols = innerWidth / 250;
  const offsetX = (250 - (window.innerWidth % 250)) / 2;
  for (let y = 0; y <= rows + 1; y += 1) {
    for (let x = 0; x <= cols + 1; x += 1) {
      const squareSet = addSquare(x, y, -offsetX, -offsetY);
      app.stage.addChild(squareSet.square);
      squares.push(squareSet);
    }
  }

  shuffle(squares).forEach((square, index) =>
    setTimeout(() => {
      square.activate();
    }, index * 15),
  );
};
const placeSquaresDebounced = debounce(placeSquares, 200, { trailing: true });

const UnauthorizedWarning: React.FC = () => {
  const authStore = useContext(authStoreCtx);
  const $canvas = useRef<HTMLDivElement>(null);

  useScrollLock();
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (!$canvas.current) {
      return;
    }

    if (!app) {
      app = new Pixi.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        resizeTo: window,
        transparent: true,
      });
    }

    // setup shapes
    placeSquares();
    window.addEventListener('resize', placeSquaresDebounced);

    $canvas.current.appendChild(app.view);

    return () => {
      app.stage.children.forEach(child => (child.alpha = 0));
      squares.forEach(square => square.deactivate());
      window.removeEventListener('resize', placeSquaresDebounced);
    };
  }, []);

  const toIndex = useCallback(() => Router.replace('/'), []);
  const signIn = useCallback(async () => {
    try {
      await authStore.signIn();
    } catch (_) {}
  }, []);

  return authStore.initialized && !authStore.IsAdmin ? (
    <div className={styles.container}>
      <div ref={$canvas} className={styles.canvas} />
      <div className={styles.texts}>
        <h1 className={styles.textHeading}>YOU SHOULDN'T BE HERE</h1>
        <p className={styles.textSub}>
          NO ACCESS—CLICK{' '}
          <Anchor>
            <span className={styles.exit} onClick={toIndex}>
              HERE
            </span>
          </Anchor>{' '}
          TO EXIT
        </p>
        <button onClick={signIn}>Sign In</button>
      </div>
    </div>
  ) : null;
};

export default observer(UnauthorizedWarning);
