import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const GameCanvas: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let game: Phaser.Game | null = null;

    class MainScene extends Phaser.Scene {
      preload() {
        this.load.image('player', './player.png'); // Replace with your actual sprite path
      }

      create() {
        this.add.image(400, 300, 'player'); // Example static player
      }
    }

    if (gameRef.current && !game) {
      game = new Phaser.Game({
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#1e293b',
        parent: gameRef.current,
        scene: MainScene,
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
          default: 'arcade',
          arcade: {
            debug: false
          }
        }
      });
    }

    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, []);

  return <div ref={gameRef} className="absolute top-0 left-0 w-full h-full z-10" />;
};

export default GameCanvas;
