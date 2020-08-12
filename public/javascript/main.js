var config = {
  width: 1000,
  height: 600,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2, Scene3, Scene4],
  pixelArt: true,
  // 1.1 set the physics to arcade
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
}

var gameSettings = {
  playerSpeed: 10,
  isIntroDone: false,
  isGameDone: false,
  gameTime: 0
}


var game = new Phaser.Game(config);

// var config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   physics: {
//     default: 'arcade',
//     arcade: {
//       gravity: { y: 200 }
//     }
//   },
//   scene: {
//     preload: preload,
//     create: create
//   }
// };

// var game = new Phaser.Game(config);

// function preload() {
//   this.load.setBaseURL('http://labs.phaser.io');

//   this.load.image('sky', 'assets/skies/space3.png');
//   this.load.image('logo', 'assets/sprites/phaser3-logo.png');
// }

// function create() {
//   this.add.image(400, 300, 'sky');

//   var logo = this.physics.add.image(400, 100, 'logo');

//   logo.setVelocity(100, 200);
//   logo.setBounce(1, 1);
//   logo.setCollideWorldBounds(true);

//   emitter.startFollow(logo);
// }