class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("background", "assets/images/background3.png");

    this.load.spritesheet("playerShip", "assets/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("spaceChicken", "assets/spritesheets/chick.png", {
      frameWidth: 16,
      frameHeight: 18
    });

    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.image("asteroid1", "assets/images/asteroid1.png")
    this.load.image("asteroid2", "assets/images/asteroid2.png")
    this.load.image("asteroid3", "assets/images/asteroid3.png")
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.playerShip = this.physics.add.sprite(-70, 300, "playerShip").setScale(2);
    this.playerShip.angle += -90;
    this.anims.create({
      key: "playerShip_anim",
      frames: this.anims.generateFrameNumbers("playerShip"),
      frameRate: 20,
      repeat: -1
    });
    this.playerShip.play("playerShip_anim");

    for (let i = 0; i < 500; i++) {
      setTimeout(() => { this.playerShip.x += 1 }, 100 + (3.5 * i))
    }

    var shipShakeForward = true;
    this.shipShake = setInterval(() => {
      if (shipShakeForward) {
        this.playerShip.x += 2
        if (this.playerShip.x > 500 + 5) {
          shipShakeForward = !shipShakeForward
        }
      } else {
        this.playerShip.x -= 2
        if (this.playerShip.x < 500 - 5) {
          shipShakeForward = !shipShakeForward
        }
      }
    }, 50)

    setTimeout(() => {
      this.chickenText = this.add.text(510, 260, "AHHHH")
      this.spaceChicken = this.physics.add.sprite(510, 300, "spaceChicken").setScale(-2);
      this.spaceChicken.angle -= 0;
      this.anims.create({
        key: "spaceChicken_anim",
        frames: this.anims.generateFrameNumbers("spaceChicken"),
        frameRate: 10,
        repeat: -1
      });
      this.spaceChicken.play("spaceChicken_anim")


      for (let i = 0; i < 550; i++) {
        setTimeout(() => { this.spaceChicken.x += 1, this.chickenText.x += 1 }, 100 + (5 * i))
      }

    }, 2000)

    setTimeout(() => {
      var style = { font: "bold 32px Arial", width: "1000", align: "center" };

      setTimeout(() => {
        this.introText1 = this.add.text(78.5, 200, ["You Ejected Space Chicken out of the ship by accident!"], style)
      }, 100)

      setTimeout(() => {
        this.introText2 = this.add.text(145.5, 350, ["Press Space to begin Space Chicken's rescue!"], style)
        gameSettings.isIntroDone = true;
      }, 1600)

      setTimeout(() => {
        this.shipText = this.add.text(540, 255, ["Oops"])
      }, 3000)

      setTimeout(() => {
        this.shipText = this.add.text(540, 325, ["Sorry"])
      }, 5000)


    }, 3500)

    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (gameSettings.isIntroDone) {
      if (this.cursorKeys.space.isDown) {
        this.startGame()
      }
    }

    if (this.spaceChicken) {
      this.spaceChicken.angle += 1.5;
    }

    this.background.tilePositionX += 0.5;
  }

  startGame() {
    clearInterval(this.shipShake)
    this.scene.start("playGame");
  }
}