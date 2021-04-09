import '../phaser';

import createAligned from '../js/createAligned'
import repeat from '../js/repeat'
import gameOver from '../js/gameOver'
import setUpPlatforms from '../js/setUpPlatforms'
import countCoin from '../js/countCoin'

class GameScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'Game'
    })
    this.init();
  }

  init() {
    this.jump = 0;
    this.coin;
    this.bg;
    this.cursors;
    this.player;
    this.coins;
    this.scoreText;
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
        frameHeight: 16
      }
    );

    this.load.spritesheet('edx-run',
      '../src/assets/player/run.png', {
        frameWidth: 50,
        frameHeight: 37
      }
    );

    this.load.spritesheet('edx-run-r',
      '../src/assets/player/run-r.png', {
        frameWidth: 50,
        frameHeight: 37
      }
    );

    this.load.spritesheet('edx-jump',
      '../src/assets/player/jump.png', {
        frameWidth: 50,
        frameHeight: 37
      }
    );

    this.load.spritesheet('edx-idle',
      '../src/assets/player/run.png', {
        frameWidth: 50,
        frameHeight: 29
      }
    );
  }

  create() {
    let bombs;
    let platforms;
    let score = 0;
    let worldBounds = 3500;
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 10;

    this.anims.create({
      key: 'coin_mov',
      frames: this.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

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

    // Sky background
    this.add.image(width * .5, height * .5, 'sky').setScrollFactor(0);
    // Parallax elements
    createAligned(this, totalWidth, 'mountain', 0.1, 1);
    createAligned(this, totalWidth, 'mountains', 0.3, 1);
    createAligned(this, totalWidth, 'trees', 0.8, 1.1);
    createAligned(this, totalWidth, 'foreground', 1, 1.1);

    //Platforms
    platforms = this.physics.add.staticGroup();
    setUpPlatforms(platforms, 'platform', worldBounds);
    //repeat(platforms, 'ground');

    //Score & health 
    this.scoreText = this.add.text(32, 16, 'score: 0', {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 10,
      fontSize: '32px',
      fill: '#000'
    }).setScrollFactor(0);

    // Player
    this.player = this.physics.add.sprite(20, 300, 'edx-run');
    this.player.setScale(1.35, 1.35)
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setSize(18, 32, true)

    this.cameras.main.setBounds(0, 0, worldBounds, 600);
    this.physics.world.setBounds(0, 0, worldBounds, 700)
    this.cameras.main.startFollow(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();


    // Coins
    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: 50,
      setScale: {
        x: 1.5,
        y: 1.5
      },
      setXY: {
        x: 100,
        y: 0,
        stepX: 70
      }
    });

    this.coins.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.coins, platforms);

    this.physics.add.collider(this.player, platforms, function (player, platforms) {
      player.body.position.x += 1;
    }, null, this);

    //bombs
    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(this.player, bombs, function(player, bomb) {
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      this.gameOver = true;
    }, null, this);

    this.physics.add.overlap(this.player, this.coins, function (player, coin) {
      coin.disableBody(true, true);
      score += 10;
      this.scoreText.setText('Score: ' + score);

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }, null, this);


  }

  update() {
    let jump = 0;
    let stars;
    let bg;

    const cam = this.cameras.main
    const speed = 5
    this.coins.playAnimation('coin_mov');
    if (this.player.y > 600) {
      this.scene.start("Game");
    }

    if (this.cursors.right.isDown) {
      //cam.scrollX += speed
      this.player.setVelocityX(200);
      this.player.anims.play('right', true);
      gameOver(this.player);

    // } else if (this.cursors.left.isDown) {
    //   this.player.setVelocityX(-200);
    //   this.player.anims.play('left', true);
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
        this.player.body.setVelocityY(-250);
        this.player.anims.play('jump', true);
      } else if (this.canDoubleJump) {
        // player can only jump 2x (double jump)
        this.canDoubleJump = false;
        this.player.body.setVelocityY(-200);
        this.player.anims.play('jump', true);
      }
    }

  }

}

export default GameScene;