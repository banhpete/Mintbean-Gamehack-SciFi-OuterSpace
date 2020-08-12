class Scene4 extends Phaser.Scene {
  constructor() {
    super("loseGame");
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    var style = { font: "bold 32px Arial", width: "1000", align: "center" };

    this.add.text(500, 300, ["You Lost!", " ", "Press Space to Try Again"], style).setOrigin(0.5, 0.5)

    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursorKeys.space.isDown) {
      this.resetGame()
    }
    this.background.tilePositionX -= 0.5;
  }

  resetGame() {
    gameSettings.gameTime = 0
    gameSettings.isGameDone = false;
    this.scene.start("playGame");
  }
}