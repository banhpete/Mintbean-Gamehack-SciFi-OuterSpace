class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.anims.create({
      key: "explosion_anim",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: -1
    });

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    this.instructionText = this.add.text(20, 510, ["KEYS", "W - Move Up", "S - Move Down", "A - Move Left", "D - Move Right"])
    this.gameTimeText = this.add.text(20, 20, `Time:${gameSettings.gameTime}`)
    this.timeTrack = setInterval(() => { this.gameTimeText.setText(`Time:${++gameSettings.gameTime}`) }, 1000)
    this.chickenText = {}

    var highScore = localStorage.getItem('scScore') || "No High Score"
    this.highScoreText = this.add.text(20, 40, `High Score:${highScore}`)

    this.wKey = this.input.keyboard.addKey('W')
    this.sKey = this.input.keyboard.addKey('S')
    this.aKey = this.input.keyboard.addKey('A')
    this.dKey = this.input.keyboard.addKey('D')

    this.playerShip = this.physics.add.sprite(0, 188, "playerShip").setScale(2);
    this.playerShip.angle += -90;
    this.playerShip.play("playerShip_anim");
    this.playerShip.setCollideWorldBounds(true);

    this.spaceChicken = this.physics.add.sprite(950, 188, "spaceChicken").setScale(2);
    this.spaceChicken.angle -= 0;
    this.spaceChicken.setVelocity(100, 100)
    this.spaceChicken.play("spaceChicken_anim")
    this.spaceChicken.setCollideWorldBounds(true);
    this.spaceChicken.setBounce(1)

    this.alien1 = this.physics.add.image(1050, 550, "alien").setScale(2)
    this.alien1.setBounce(1)

    this.alien2 = this.physics.add.image(1050, 50, "alien").setScale(2)
    this.alien2.setBounce(1)

    this.asteroids = this.physics.add.group();
    for (let i = 0; i < 15; i++) {
      let asteroidString = 'asteroid' + (Math.floor(Math.random() * 3) + 1)
      let asteroid = this.physics.add.image(0, 0, asteroidString).setScale(Math.random() + 1)
      this.asteroids.add(asteroid)
      asteroid.setVelocity(75, 75)
      asteroid.setCollideWorldBounds(true);
      asteroid.setBounce(1)
      asteroid.setRandomPosition(100, 0, game.config.width, game.config.height);
    }

    this.physics.add.collider(this.asteroids)
    this.physics.add.collider(this.asteroids, this.spaceChicken, this.chickenTalk, null, this)
    this.physics.add.collider(this.asteroids, this.alien)
    this.physics.add.overlap(this.asteroids, this.playerShip, this.playerLose, null, this)
    this.physics.add.overlap(this.playerShip, this.alien, this.playerLose, null, this)
    this.physics.add.overlap(this.playerShip, this.spaceChicken, this.playerWin, null, this)
  }

  update() {
    this.background.tilePositionX -= 0.5;
    this.moveShipManager()
    this.alienHunt(this.alien1)
    this.alienHunt(this.alien2)
    this.chickenRotate()
  }

  moveShipManager() {
    if (!gameSettings.isGameDone) {
      if (this.aKey.isDown) {
        this.playerShip.x -= gameSettings.playerSpeed
      } else if (this.dKey.isDown) {
        this.playerShip.x += gameSettings.playerSpeed
      }

      if (this.wKey.isDown) {
        this.playerShip.y -= gameSettings.playerSpeed
      } else if (this.sKey.isDown) {
        this.playerShip.y += gameSettings.playerSpeed
      }
    }
  }

  chickenRotate() {
    this.spaceChicken.angle += 1.5;
  }

  chickenTalk(asteroid, chicken) {
    if (!this.chickenText._text) {
      this.chickenText = this.add.text(chicken.x - 15, chicken.y - 15, "Ow")
      setTimeout(() => { this.chickenText.setText("") }, 500)
    }
  }

  alienHunt(alien) {
    if (!gameSettings.isGameDone) {
      let xDirection = (this.playerShip.x - alien.x) / 500
      let yDirection = (this.playerShip.y - alien.y) / 500
      let total = Math.sqrt(Math.pow(xDirection, 2) + Math.pow(yDirection, 2))

      alien.x += (xDirection / total) * 1.5;
      alien.y += (yDirection / total) * 1.5;
    }
  }

  playerWin() {
    clearInterval(this.timeTrack)
    if (!gameSettings.isGameDone) {
      this.scene.start("winGame")
    }
  }

  playerLose() {
    clearInterval(this.timeTrack)
    if (!gameSettings.isGameDone) {
      gameSettings.isGameDone = true;
      this.playerShip.setTexture("explosion");
      this.playerShip.play("explosion_anim");
      setTimeout(() => {
        this.scene.start("loseGame")
      }, 1000)
    }
  }

}
