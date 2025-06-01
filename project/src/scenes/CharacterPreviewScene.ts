const NUM_CHARACTERS = 40;
export default class CharacterPreviewScene extends Phaser.Scene {
  private currentIndex = 0;
  private sprite: Phaser.GameObjects.Sprite | null = null;

  constructor() {
    super({ key: "CharacterPreviewScene" });
  }

  preload() {
    for (let i = 0; i < NUM_CHARACTERS; i++) {
      const index = i.toString().padStart(3, "0");
      this.load.spritesheet(
        `character_${i}`,
        `/assets/characters/${index}.png`,
        {
          frameWidth: 20,
          frameHeight: 32,
        }
      );
    }
  }

  create() {
    this.createAnimations();
    this.showCharacter(this.currentIndex);
  }
  private createAnimations() {
    for (let i = 0; i < NUM_CHARACTERS; i++) {
      this.anims.create({
        key: `walk_${i}`,
        frames: this.anims.generateFrameNumbers(`character_${i}`, {
          start: 0,
          end: 2,
        }),
        frameRate: 3,
        repeat: -1,
      });
    }
  }

  updateCharacter(index: number) {
    this.currentIndex = index;
    this.showCharacter(this.currentIndex);
  }

  private showCharacter(index: number) {
    if (this.sprite) {
      this.sprite.destroy();
    }

    this.sprite = this.add.sprite(60, 50, `character_${index}`, 0);
    this.sprite.setScale(2);
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.sprite.play(`walk_${index}`);
  }
}
