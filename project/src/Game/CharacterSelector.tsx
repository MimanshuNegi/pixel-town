import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import CharacterPreviewScene from '../scenes/CharacterPreviewScene';

const CharacterSelector = ({
  onSelect,
}: {
  onSelect: (index: number) => void;
}) => {
  const phaserRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<Phaser.Game | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!phaserRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 120,
      height: 120,
      backgroundColor: '#1e293b',
      parent: phaserRef.current,
      scene: CharacterPreviewScene,
      pixelArt: true,
      scale: {
        mode: Phaser.Scale.NONE,
      },
    };

    const gameInstance = new Phaser.Game(config);
    setGame(gameInstance);

    return () => {
      gameInstance.destroy(true);
    };
  }, []);

  const handleNext = () => {
    const next = (currentIndex + 1) % 40;
    setCurrentIndex(next);
    const scene = game?.scene.getScene('CharacterPreviewScene') as CharacterPreviewScene;
    scene?.updateCharacter(next);
  };

  const handlePrev = () => {
    const prev = (currentIndex - 1 + 40) % 40;
    setCurrentIndex(prev);
    const scene = game?.scene.getScene('CharacterPreviewScene') as CharacterPreviewScene;
    scene?.updateCharacter(prev);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
      <div className="bg-blue-950 p-6 rounded-xl text-center">
        <h2 className="text-xl font-bold mb-4">Choose Your Character</h2>
        <div className="flex justify-center items-center gap-4 mb-4">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            ◀
          </button>
          <div ref={phaserRef} />
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ▶
          </button>
        </div>
        <button
          onClick={() => onSelect(currentIndex)}
          className="mt-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CharacterSelector;
