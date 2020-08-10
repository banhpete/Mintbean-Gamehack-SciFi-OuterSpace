class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("background", "assets/images/background2.png");

    this.load.spritesheet("playerShip", "assets/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("spaceChicken", "assets/spritesheets/chick.png", {
      frameWidth: 16,
      frameHeight: 18
    });
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.add.text(250, 170, "Space Chicken needs help! Click to save him", { fontSize: 20 });

    this.background.setInteractive();
    this.input.on('gameobjectdown', this.startGame, this);
  }

  update() {
    this.background.tilePositionX -= 0.5;
  }

  startGame() {
    this.scene.start("playGame");
  }
}