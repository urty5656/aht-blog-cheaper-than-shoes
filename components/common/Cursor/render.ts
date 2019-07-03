import { CursorType } from '@/stores/partial/cursor';
import anime, { AnimeInstance } from 'animejs';
import * as Pixi from 'pixi.js';

const SIZE = 32;

let rimAnim: AnimeInstance | null = null;
const rimAnimTarget = {
  time: 0,
};

let loaderAnim: AnimeInstance | null = null;
const loaderAnimTarget = {
  time: 0,
};

export const drawRim = (ctx: Pixi.Graphics, time: number) => {
  const scale = 1 + time * 0.35;
  const size = SIZE * scale;

  ctx
    .clear()
    .lineStyle(2, 0xededed, 0.85)
    .drawCircle(0, 0, size)
    .lineStyle(0.5, 0x202020, 0.85)
    .beginFill(0xffffff, 0.85)
    .drawCircle(0, 0, 2)
    .endFill();
};

export const animateRim = (ctx: Pixi.Graphics, type: CursorType) => {
  if (rimAnim) {
    anime.remove(rimAnimTarget);
  }
  rimAnim = anime({
    targets: rimAnimTarget,
    time: type === CursorType.Normal ? 0 : 1,
    duration: type === CursorType.Normal ? 750 : 333,
    easing: type === CursorType.Normal ? 'easeOutQuad' : 'easeOutCubic',
    update: () => drawRim(ctx, rimAnimTarget.time),
    complete: () => (rimAnim = null),
  });
};

export const drawLoader = (ctx: Pixi.Graphics, time: number) => {
  const startAngle = time * Math.PI * 2;

  ctx
    .clear()
    .endFill()
    .lineStyle(2, 0xededed, 1)
    .arc(0, 0, SIZE * 1.15, startAngle, startAngle + Math.PI * 0.5);
};

export const animateLoader = (ctx: Pixi.Graphics, isLoading: boolean) => {
  if (loaderAnim) {
    anime.remove(loaderAnimTarget);
  }
  if (!isLoading) {
    loaderAnimTarget.time = 0;
    return ctx.clear();
  }

  loaderAnim = anime({
    targets: loaderAnimTarget,
    time: 1,
    duration: 1000,
    easing: 'linear',
    loop: true,
    update: () => drawLoader(ctx, loaderAnimTarget.time),
    complete: () => {
      loaderAnim = null;
      loaderAnimTarget.time = 0;
    },
  });
};
