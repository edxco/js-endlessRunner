import '../phaser';

import createAligned from '../js/createAligned'
import repeat from '../js/repeat'

class GameScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'Game'
    })

    this.init();
  }

  init() {
    this.jump = 0;
    this.stars;
    this.bg;
    this.cursors;
    this.player;
    this.scoreText;
    this.moveCam = false;
  }

  preload() {
    // this.load.image('bg', 'assets/pics/the-end-by-iloe-and-made.jpg');
    this.load.image('bg', '../src/assets/bg/foreground-trees.png');
    this.load.image('block', '../src/assets/edxco/run.png');
    this.load.image('ground', '../src/assets/platform/ground.png');
  }

  create() {
    let platforms;
    this.cameras.main.setBounds(0, 0, 720 * 2.2, 600);
    this.cameras.main.setBackgroundColor('#ccc')

    for (let x = 0; x < 3; x++) {
      this.add.image(544 * x, 0, 'bg').setOrigin(0, -100);
    }

    //Platforms
    platforms = this.physics.add.staticGroup();
    //platforms.create(550, 450, 'platform1');
    repeat(platforms, 'ground');

    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add.image(400, 100, 'block');
    this.cameras.main.startFollow(this.player, true);
    this.physics.add.collider(this.player, platforms);
  }

  update() {
    const cam = this.cameras.main;

    this.player.setVelocity(0);

    if (this.moveCam) {
      if (this.cursors.left.isDown) {
        cam.scrollX -= 4;
      } else if (this.cursors.right.isDown) {
        cam.scrollX += 4;
      }

      if (this.cursors.up.isDown) {
        cam.scrollY -= 4;
      } else if (this.cursors.down.isDown) {
        cam.scrollY += 4;
      }
    } else {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-400);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(400);
      }

      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-400);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(400);
      }
    }
  }

}

export default GameScene;