import Phaser from 'phaser';

import createAligned from '../js/createAligned';
import setUpPlatforms from '../js/setUpPlatforms';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.jump = 0;
    this.cursors = {};
    this.player = {};
    this.coins = {};
    this.coinsPointsText = {};
    this.timerText = {};
    this.timer = 0;
    this.coinsPoints = 0;
  }

  preload() {
    this.load.image('sky', '../src/assets/bg/sky.png');
    this.load.image('foreground', '../src/assets/bg/foreground-trees.png');
    this.load.image('mountains', '../src/assets/bg/mountain.png');
    this.load.image('mountain', '../src/assets/bg/one-mountain.png');
    this.load.image('trees', '../src/assets/bg/trees.png');
    this.load.image('platform', '../src/assets/props/platform.png');
    this.load.image('bomb', '../src/assets/props/bomb.png');

    this.load.spritesheet('coin',
      '../src/assets/props/coin.png', {
        frameWidth: 16,
        frameHeight: 16,
      });

    this.load.spritesheet('edx-run',
      '../src/assets/player/run.png', {
        frameWidth: 50,
        frameHeight: 37,
      });

    this.load.spritesheet('edx-jump',
      '../src/assets/player/jump.png', {
        frameWidth: 50,
        frameHeight: 37,
      });

    this.load.spritesheet('edx-idle',
      '../src/assets/player/idle.png', {
        frameWidth: 50,
        frameHeight: 37,
      });
  }

  create() {
    let bombs;
    let platforms;
    const worldBounds = 3500;
    const {
      width,
    } = this.scale;
    const {
      height,
    } = this.scale;

    this.anims.create({
      key: 'coin_mov',
      frames: this.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('edx-run', {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('edx-idle', {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });


    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('edx-jump', {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Sky background
    this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);
    // Parallax elements
    createAligned(this, 'mountain', 0.1, worldBounds, 0.8);
    createAligned(this, 'mountains', 0.3, worldBounds, 0.8);
    createAligned(this, 'trees', 0.8, worldBounds, 0.9);
    createAligned(this, 'foreground', 1, worldBounds, 0.9);

    // Platforms
    platforms = this.physics.add.staticGroup();
    setUpPlatforms(platforms, 'platform', worldBounds);
    // repeat(platforms, 'ground');

    // points & timer
    this.coinsPointsText = this.add.text(32, 16, 'Coins: 0', {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 10,
      fontSize: '32px',
      fill: '#000',
    }).setScrollFactor(0);

    this.timerText = this.add.text(32, 64, 'Time: 0', {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 10,
      fontSize: '32px',
      fill: '#0080FF',
    }).setScrollFactor(0);

    //  Create Timer
    this.timer = this.time.addEvent({
      callbackScope: this,
      delay: 60000,
    });

    // Player
    this.player = this.physics.add.sprite(20, 300, 'edx-run');
    this.player.setScale(1.35, 1.35);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setSize(18, 32, true);

    this.cameras.main.setBounds(0, 0, worldBounds, 600);
    this.physics.world.setBounds(0, 0, worldBounds, 700);
    this.cameras.main.startFollow(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();
    // Coins
    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: 50,
      setScale: {
        x: 1.5,
        y: 1.5,
      },
      setXY: {
        x: 100,
        y: 0,
        stepX: 70,
      },
    });

    this.coins.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.coins, platforms);

    // Slippery function
    this.physics.add.collider(this.player, platforms, (player) => {
      player.body.position.x += 1;
    }, null, this);

    // Bombs
    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(this.player, bombs, function (player) {
      this.physics.pause();
      player.setTint(0xff0000);
      this.gameOver();
    }, null, this);

    this.physics.add.overlap(this.player, this.coins, function (player, coin) {
      coin.disableBody(true, true);
      this.coinsPoints += 10;
      this.coinsPointsText.setText(`Coins: ${this.coinsPoints}`);

      let x;
      if (player.x < (worldBounds / 2) + 1) {
        x = Phaser.Math.Between(player.x, player.x + 400);
      } else {
        x = Phaser.Math.Between(player.x, player.x - 400);
      }

      const bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }, null, this);
  }

  update() {
    //  Start the timer running
    this.timerText.setText(`Time: ${Math.round(this.timer.getElapsedSeconds())}`);

    if (this.player.y > 600) {
      this.gameOver();
    }

    if (this.player.x >= 3450) {
      this.win();
    }

    if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.play('walk', true);
    } else {
      this.player.setVelocityX(0);
      this.player.play('idle', true);
    }

    const didPressJump = Phaser.Input.Keyboard.JustDown(this.cursors.up);

    // player can only double jump if the player just jumped
    if (didPressJump) {
      this.player.play('jump', true);
      if (this.player.body.onFloor()) {
        // player can only double jump if it is on the floor
        this.canDoubleJump = true;
        this.player.body.setVelocityY(-250);
      } else if (this.canDoubleJump) {
        // player can only jump 2x (double jump)
        this.canDoubleJump = false;
        this.player.body.setVelocityY(-200);
      }
    }
  }

  gameOver() {
    const timeElapsed = this.timer.getElapsedSeconds();
    localStorage.setItem('points', this.coinsPoints);
    localStorage.setItem('time', timeElapsed);
    this.scene.start('GameOver');
  }

  win() {
    const timeElapsed = this.timer.getElapsedSeconds();
    localStorage.setItem('points', this.coinsPoints);
    localStorage.setItem('time', timeElapsed);
    this.scene.start('Win');
  }
}

export default GameScene;