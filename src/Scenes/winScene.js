import Phaser from 'phaser';
import {
  setScore,
} from '../js/getScore';

export default class winScene extends Phaser.Scene {
  constructor() {
    super('Win');
  }

  preload() {
    this.load.image('bg', '../src/assets/props/win.png');
  }

  create() {
    const { width } = this.scale;

    const layOutX = (width / 2) - 200;

    this.add.image(400, 300, 'bg');

    const coinsPoints = localStorage.getItem('points');
    let timeSpent = localStorage.getItem('time');
    const levelMaxTime = 60;

    const bonus = (timeSpent <= levelMaxTime) ? 2 : 1.5;

    timeSpent = Math.round(timeSpent * 100) / 100;

    // Compute the final score
    let total = Math.round(Math.max(1, levelMaxTime - timeSpent) * bonus * 1);
    total *= coinsPoints;

    this.text1 = this.add.text(layOutX, 100, 'You lost!', {
      fontFamily: 'equipmentPro',
      align: 'center',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '49px',
      fill: '#265CFF',
    });

    this.text1 = this.add.text(layOutX, 180, `Coins: ${coinsPoints}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '32px',
      fill: '#B25754',
    });

    this.tweens.add({
      targets: this.text1,
      alpha: {
        from: 0,
        to: 1,
      },
      ease: 'Cubic.easeIn',
      duration: 1000,
    });

    this.text2 = this.add.text(layOutX, 220, `Your time: ${timeSpent}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '32px',
      fill: '#B25754',
    });

    this.tweens.add({
      targets: this.text2,
      alpha: {
        from: 0,
        to: 1,
      },
      ease: 'Cubic.easeIn',
      duration: 1500,
    });

    this.text3 = this.add.text(layOutX, 260, `Bonus: ${bonus}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '32px',
      fill: '#FF0000',
    });

    this.tweens.add({
      targets: this.text3,
      alpha: {
        from: 0,
        to: 1,
      },
      ease: 'Cubic.easeIn',
      duration: 2000,
    });

    this.text4 = this.add.text(layOutX, 330, `Your score: ${total}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 5,
      fontSize: '46px',
      fill: '#265CFF',
    });

    this.tweens.add({
      targets: this.text4,
      alpha: {
        from: 0,
        to: 1,
      },
      ease: 'Cubic.easeIn',
      duration: 2800,
    });


    const saveScore = this.add.text(400, 450, 'Save my coinsPoints', {
      fontFamily: 'EquipmentPro',
      fontSize: 44,
      stroke: '#003366',
      fill: '#fff',
      strokeThickness: 11,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: saveScore,
      alpha: {
        from: 0,
        to: 1,
      },
      ease: 'Cubic.easeIn',
      duration: 1000,
      repeat: -1,
    });

    saveScore
      .setInteractive()
      .on('pointerover', () => {
        saveScore.setStyle({
          stroke: '#003366',
          fill: '#fff',
        });
      })
      .on('pointerdown', () => {
        saveScore.setStyle({
          stroke: '#003366',
          fill: '#fff',
        });
        /* eslint-disable */
        const userName = window.prompt('Please enter your name to save your coinsPoints.');
        /* eslint-enable */
        if (userName !== '' && userName !== undefined && userName !== null) {
          setScore(userName, total);
        }
        this.scene.start('ScoreBoard');
      })
      .on('pointerout', () => {
        saveScore.setStyle({
          stroke: '#fff',
          fill: '#003366',
        });
      });

    const playAgain = this.add.text(400, 500, 'Play Again', {
      fontFamily: 'EquipmentPro',
      fontSize: 40,
      stroke: '#FF0000',
      fill: '#fff',
      strokeThickness: 5,
    }).setOrigin(0.5);

    playAgain
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('Game');
      })
      .on('pointerout', () => {
        saveScore.setStyle({
          stroke: '#fff',
          fill: '#003366',
        });
      });
  }
}