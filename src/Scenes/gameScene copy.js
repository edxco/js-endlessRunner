import '../phaser';

import createAligned from '../js/createAligned'
import repeat from '../js/repeat'

class GameScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'Game'
    })
    this.cursors;
    this.player;
    this.scoreText;
    this.init();
  }

  init() {
    this.jump = 0;
    this.stars;
    this.bg;
  }

  preload() {
    this.load.image('sky', '../src/assets/bg/sky.png');
    this.load.image('foreground', '../src/assets/bg/foreground-trees.png');
    this.load.image('mountains', '../src/assets/bg/mountain.png');
    this.load.image('mountain', '../src/assets/bg/one-mountain.png');
    this.load.image('trees', '../src/assets/bg/trees.png');

    this.load.image('platform1', '../src/assets/platform/platform1.png');
    this.load.image('platform2', '../src/assets/platform/platform2.png');
    this.load.image('platform3', '../src/assets/platform/platform3.png');
    this.load.image('platform4', '../src/assets/platform/platform4.png');
    this.load.image('ground', '../src/assets/platform/ground.png');

    this.load.spritesheet('edx-run',
      '../src/assets/edxco/run.png', {
        frameWidth: 50,
        frameHeight: 37
      }
    );

    this.load.spritesheet('edx-run-r',
    '../src/assets/edxco/run-r.png', {
      frameWidth: 50,
      frameHeight: 37
    }
  );

    this.load.spritesheet('edx-jump',
      '../src/assets/edxco/jump.png', {
        frameWidth: 50,
        frameHeight: 37
      }
    );

    this.load.spritesheet('edx-idle',
      '../src/assets/edxco/run.png', {
        frameWidth: 50,
        frameHeight: 29
      }
    );
  }

  create() {
    let platforms;
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 10;
  
    // Sky background
    this.add.image(width * .5, height * .5, 'sky').setScrollFactor(0);
    // Parallax elements
    createAligned(this, totalWidth, 'mountain', 0.1, 1);
    createAligned(this, totalWidth, 'mountains', 0.3, 1);
    createAligned(this, totalWidth, 'trees', 0.8, 1.1);
    createAligned(this, totalWidth, 'foreground', 1, 1.1);

    //Platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(550, 450, 'platform1');
    repeat(platforms, 'ground');

  
    this.scoreText = this.add.text(32, 16, 'score: 0', {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 10,
      fontSize: '32px',
      fill: '#000'
    }).setScrollFactor(0);

    //Add container for ScoreBoard
    this.scoreBoard = this.add.container(0, 16);
    //this.scoreBoard = this.add.container(this.player.x, 16);
    this.scoreBoard.add(this.scoreText);

  // Player
    this.player = this.physics.add.sprite(20, 500, 'edx-run');
    this.player.setBounce(0.2);
    //this.player.setCollideWorldBounds(true);
    
    this.physics.add.collider(this.player, platforms);

    this.cameras.main.setBounds(0, 0, 1920, 0);
    this.cameras.main.startFollow(this.player);

    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('edx-run', {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('edx-run-r', {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{
        key: 'edx-run',
        frame: 4
      }],
      frameRate: 20
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('edx-jump', {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    });

  }

  update() {
    let jump = 0;
    let stars;
    let bg;

    const cam = this.cameras.main
    const speed = 5

    if (this.cursors.right.isDown) {
      //cam.scrollX += speed
      this.player.setVelocityX(300);
      this.player.anims.play('right', true);
    } else if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
      this.player.anims.play('left', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    const didPressJump = Phaser.Input.Keyboard.JustDown(this.cursors.up);

    // player can only double jump if the player just jumped
    if (didPressJump) {
      if (this.player.body.onFloor()) {
        // player can only double jump if it is on the floor
        this.canDoubleJump = true;
        this.player.body.setVelocityY(-300);
        this.player.anims.play('jump', true);
      } else if (this.canDoubleJump) {
        // player can only jump 2x (double jump)
        this.canDoubleJump = false;
        this.player.body.setVelocityY(-300);
        this.player.anims.play('jump', true);
      }
    }
  }

}

export default GameScene;