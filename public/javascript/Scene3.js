class Scene3 extends Phaser.Scene {
  constructor() {
    super("endGame");
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.add.text(155, 170, "You saved Space Chicken! You Win! Click to reset the game!", { fontSize: 20 });

    this.background.setInteractive();
    this.input.on('gameobjectdown', this.resetGame, this);
  }

  update() {
    this.background.tilePositionX -= 0.5;
  }

  resetGame() {
    this.scene.start("playGame");
  }
}