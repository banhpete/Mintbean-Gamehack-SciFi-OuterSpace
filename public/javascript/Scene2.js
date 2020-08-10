class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);
    this.playerShip = this.physics.add.sprite(0, 188, "playerShip").setScale(2);
    this.playerShip.angle += -90;
    this.spaceChicken = this.physics.add.sprite(950, 188, "spaceChicken").setScale(-2);
    this.spaceChicken.angle -= 0;

    this.anims.create({
      key: "playerShip_anim",
      frames: this.anims.generateFrameNumbers("playerShip"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "spaceChicken_anim",
      frames: this.anims.generateFrameNumbers("spaceChicken"),
      frameRate: 20,
      repeat: -1
    });

    this.playerShip.play("playerShip_anim");
    this.playerShip.setCollideWorldBounds(true);
    this.spaceChicken.play("spaceChicken_anim")
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.background.tilePositionX -= 0.5;
    this.moveShipManager()
  }

  moveShipManager() {
    if (this.cursorKeys.left.isDown) {
      this.playerShip.x -= gameSettings.playerSpeed
    } else if (this.cursorKeys.right.isDown) {
      this.playerShip.x += gameSettings.playerSpeed
    }

    if (this.cursorKeys.up.isDown) {
      this.playerShip.y -= gameSettings.playerSpeed
    } else if (this.cursorKeys.down.isDown) {
      this.playerShip.y += gameSettings.playerSpeed
    }
  }

  moveShip(ship, speed) {
    ship.x += speed;
    if (ship.x > config.width) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship) {
    ship.x = 0;
    var randomY = Phaser.Math.Between(0, config.height);
    ship.y = randomY;
  }

}


  // create() {

  //   this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
  //   this.background.setOrigin(0, 0);

  //   this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "ship");
  //   this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
  //   this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "ship3");


  //   this.anims.create({
  //     key: "ship1_anim",
  //     frames: this.anims.generateFrameNumbers("ship"),
  //     frameRate: 20,
  //     repeat: -1
  //   });
  //   this.anims.create({
  //     key: "ship2_anim",
  //     frames: this.anims.generateFrameNumbers("ship2"),
  //     frameRate: 20,
  //     repeat: -1
  //   });
  //   this.anims.create({
  //     key: "ship3_anim",
  //     frames: this.anims.generateFrameNumbers("ship3"),
  //     frameRate: 20,
  //     repeat: -1
  //   });

  //   this.anims.create({
  //     key: "explode",
  //     frames: this.anims.generateFrameNumbers("explosion"),
  //     frameRate: 20,
  //     repeat: 0,
  //     hideOnComplete: true
  //   });

  //   this.ship1.play("ship1_anim");
  //   this.ship2.play("ship2_anim");
  //   this.ship3.play("ship3_anim");

  //   this.ship1.setInteractive();
  //   this.ship2.setInteractive();
  //   this.ship3.setInteractive();

  //   this.input.on('gameobjectdown', this.destroyShip, this);

  //   this.add.text(20, 20, "Playing game", {
  //     font: "25px Arial",
  //     fill: "yellow"
  //   });

  //   // POWER UPS

  //   //2.1 Two Animations for the power ups
  //   this.anims.create({
  //     key: "red",
  //     frames: this.anims.generateFrameNumbers("power-up", {
  //       start: 0,
  //       end: 1
  //     }),
  //     frameRate: 20,
  //     repeat: -1
  //   });
  //   this.anims.create({
  //     key: "gray",
  //     frames: this.anims.generateFrameNumbers("power-up", {
  //       start: 2,
  //       end: 3
  //     }),
  //     frameRate: 20,
  //     repeat: -1
  //   });

  //   // 3.1
  //   this.physics.world.setBoundsCollision();

  //   this.powerUps = this.physics.add.group();

  //   // 2.2 Add multiple objects
  //   var maxObjects = 4;
  //   for (var i = 0; i <= maxObjects; i++) {
  //     var powerUp = this.physics.add.sprite(16, 16, "power-up");
  //     this.powerUps.add(powerUp);
  //     powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

  //     // set random animation
  //     if (Math.random() > 0.5) {
  //       powerUp.play("red");
  //     } else {
  //       powerUp.play("gray");
  //     }

  //     // setVelocity
  //     powerUp.setVelocity(100, 100);
  //     // 3.2
  //     powerUp.setCollideWorldBounds(true);
  //     // 3.3
  //     powerUp.setBounce(1);

  //   }

  // }

  // update() {

  //   this.moveShip(this.ship1, 1);
  //   this.moveShip(this.ship2, 2);
  //   this.moveShip(this.ship3, 3);

  //   this.background.tilePositionY -= 0.5;

  // }

  // moveShip(ship, speed) {
  //   ship.y += speed;
  //   if (ship.y > config.height) {
  //     this.resetShipPos(ship);
  //   }
  // }

  // resetShipPos(ship) {
  //   ship.y = 0;
  //   var randomX = Phaser.Math.Between(0, config.width);
  //   ship.x = randomX;
  // }

  // destroyShip(pointer, gameObject) {
  //   gameObject.setTexture("explosion");
  //   gameObject.play("explode");
  // }
