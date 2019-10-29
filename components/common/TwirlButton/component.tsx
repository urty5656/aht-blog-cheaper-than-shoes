import anime from 'animejs';
import * as Pixi from 'pixi.js';
import React, { useEffect, useRef } from 'react';

import styles from './styles.scss';

const TwirlButton: React.FC = () => {
  const $anim = useRef<anime.AnimeInstance>();
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
      autoDensity: true,
      resolution: 2,
      transparent: true,
      resizeTo: $canvas.current,
    });

    const circle = new Pixi.Graphics();
    circle.beginFill(0xff0000).drawCircle(64, 64, 48);
    circle.blendMode = Pixi.BLEND_MODES.SCREEN;
    circle.interactive = true;
    app.stage.addChild(circle);

    const circle2 = new Pixi.Graphics();
    circle2.beginFill(0x0000ff).drawCircle(80, 80, 48);
    circle2.blendMode = Pixi.BLEND_MODES.SCREEN;
    app.stage.addChild(circle2);

    const circle3 = new Pixi.Graphics();
    circle3.beginFill(0x00ff00).drawCircle(80, 64, 48);
    circle3.blendMode = Pixi.BLEND_MODES.SCREEN;
    app.stage.addChild(circle3);

    const displacementSprite = Pixi.Sprite.from(
      'https://pixijs.io/examples/examples/assets/pixi-filters/displace.png',
    );
    displacementSprite.width = 144;
    displacementSprite.height = 144;
    displacementSprite.position.set(72, 72);
    displacementSprite.anchor.set(0.5);

    const displacement = new Pixi.filters.DisplacementFilter(
      displacementSprite,
    );
    displacement.padding = 100;
    displacement.scale.x = 0;
    displacement.scale.y = 0;
    app.stage.addChild(displacementSprite);
    app.stage.filters = [displacement];

    const stopAnim = (): void => anime.remove(displacement.scale);

    const onMouseHover = (): void => {
      $anim.current && stopAnim();
      $anim.current = anime({
        targets: displacement.scale,
        x: 800,
        y: 800,
        duration: 350,
        easing: 'easeOutQuad',
        onComplete: () => ($anim.current = undefined),
      });
    };

    const onMouseUp = (): void => {
      $anim.current && stopAnim();
      $anim.current = anime({
        targets: displacement.scale,
        x: 0,
        y: 0,
        duration: 175,
        easing: 'easeOutQuad',
        onComplete: () => ($anim.current = undefined),
      });
    };

    circle.on('mouseover', onMouseHover).on('mouseout', onMouseUp);

    $app.current = app;
    $canvas.current.appendChild(app.view);

    return () => {
      app.destroy();
    };
  }, []);

  return <div ref={$canvas} className={styles.container} />;
};

export default TwirlButton;
