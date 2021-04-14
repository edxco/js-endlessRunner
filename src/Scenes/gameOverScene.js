import {setScore} from "../js/getScore";

export default class gameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    this.load.image('bg', '../src/assets/props/gameover.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    const layOutX = (width / 2) - 200

    this.add.image(400, 300, 'bg')

    let score = localStorage.getItem('score');
    let time = localStorage.getItem('time');

    time = Math.round(time / 1000);
    let total = score / time * score * 100;

    let rand_penalty = Phaser.Math.Between(1000, 5000);

    total = total - rand_penalty;

    this.text1 = this.add.text(layOutX, 100, 'You lost! :(', {
      fontFamily: 'equipmentPro',
      align: 'center',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '49px',
      fill: '#265CFF'
    });

    this.text1 = this.add.text(layOutX, 180, `Points: ${score}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '32px',
      fill: '#B25754'
    });

    this.tweens.add({
      targets: this.text1,
      alpha: {
        from: 0,
        to: 1
      },
      ease: 'Cubic.easeIn',
      duration: 1000
    });

    this.text2 = this.add.text(layOutX, 220, `Your time: ${time}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '32px',
      fill: '#B25754'
    });

    this.tweens.add({
      targets: this.text2,
      alpha: {
        from: 0,
        to: 1
      },
      ease: 'Cubic.easeIn',
      duration: 1500
    });

    this.text3 = this.add.text(layOutX, 260, `Penalty: ${rand_penalty}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '32px',
      fill: '#FF0000'
    });

    this.tweens.add({
      targets: this.text3,
      alpha: {
        from: 0,
        to: 1
      },
      ease: 'Cubic.easeIn',
      duration: 2000
    });

    this.text3 = this.add.text(layOutX, 330, `Your Score: ${Math.round(total * 10)}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 5,
      fontSize: '46px',
      fill: '#265CFF'
    });

    this.tweens.add({
      targets: this.text3,
      alpha: {
        from: 0,
        to: 1
      },
      ease: 'Cubic.easeIn',
      duration: 2500
    });


    const saveScore = this.add.text(400, 450, 'Save my score', {
      fontFamily: 'EquipmentPro',
      fontSize: 44,
      stroke: '#003366',
      fill: '#fff',
      strokeThickness: 11
    }).setOrigin(0.5);

    this.tweens.add({
      targets: saveScore,
      alpha: {
        from: 0,
        to: 1
      },
      ease: 'Cubic.easeIn',
      duration: 1000,
      repeat: -1
    });

    saveScore.setInteractive();

    saveScore
      .on('pointerover', () => {
        saveScore.setStyle({
          stroke: '#003366',
          fill: '#fff'
        });
      })
      .on('pointerdown', () => {
        saveScore.setStyle({
          stroke: '#003366',
          fill: '#fff'
        });
        const userName = window.prompt('Please enter your name to save your score.');
        if (userName !== '' && userName !== undefined && userName !== null) {
          setScore(userName, score);
        }
      })
      .on('pointerout', () => {
        saveScore.setStyle({
          stroke: '#fff',
          fill: '#003366'
        });
      });
  }
}