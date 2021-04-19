import Phaser from 'phaser';
import {
  getScore,
} from '../js/getScore';

class scoreBoard extends Phaser.Scene {
  constructor() {
    super('ScoreBoard');

    this.center = 768 / 2;
    this.fontSize = 42;
    this.fontStep = 42;
    this.fontOptions = {
      fontSize: `${this.fontSize}px`,
      fontFamily: 'EquipmentPro',
      fill: '#fff',
    };
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000')
    const start = this.add.text(this.center, 110, 'Play Again', {
      fontFamily: 'EquipmentPro',
      fontSize: 44,
      stroke: '#FF0000',
      strokeThickness: 8,
    }).setOrigin(0.5);

    start.setInteractive();
    start.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.add.text(this.center, 50, '- Ice Warrior -', {
      fontFamily: 'EquipmentPro',
      stroke: '#265CFF',
      strokeThickness: 12,
      fontSize: '60px',
    }).setOrigin(0.5);

    this.score = null;
    this.add.text(this.center, 180, 'Scores', {
      fontFamily: 'EquipmentPro',
      stroke: '#003366',
      strokeThickness: 12,
      fontSize: '48px',
      fill: '#fff',
    }).setOrigin(0.5);

    this.score = getScore().catch(() => {
      this.errorMessage();
    });
    this.createScore(this.score);
  }

  createScore(score) {
    let lastPositionY = 0;
    score.then(s => {
      s.result.forEach((element) => {
        const scorePosition = [this.center, 245 + lastPositionY];
        this.add.text(...scorePosition, `${element.user} : ${element.score}`, this.fontOptions).setOrigin(0.5);

        lastPositionY += this.fontStep;
      });
    });
  }

  errorMessage() {
    const scorePosition = [this.center, 170];
    this.add.text(...scorePosition, 'We are sorry\nWe could not get the scores\nTry later', this.fontOptions).setOrigin(0.5);
  }
}

export default scoreBoard;