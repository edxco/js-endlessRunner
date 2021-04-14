import Phaser from 'phaser';
import {
  getScore
} from '../js/getScore';

class Scoreboard extends Phaser.Scene {
  constructor() {
    super('Scoreboard');

    this.center = 768 / 2;
    this.fontSize = 42;
    this.fontStep = 42;
    this.fontOptions = {
      fontSize: `${this.fontSize}px`,
      fontFamily: 'EquipmentPro',
      fill: '#fff'
    };
  }

  create() {
    this.add.text(this.center, 100, '- Ice Warrior -', {
      fontFamily: 'EquipmentPro',
      stroke: '#265CFF',
      strokeThickness: 12,
      fontSize: '60px'
    }).setOrigin(0.5);

    this.score = null;
    this.add.text(this.center, 180, 'Scores', {
      fontFamily: 'EquipmentPro',
      stroke: '#003366',
      strokeThickness: 12,
      fontSize: '48px',
      fill: '#fff'
    }).setOrigin(0.5);

    this.score = getScore().catch(() => {
      this.errorMessage();
    });
    this.createScore(this.score);

    const backButton = this.add.image(690, 650, 'btnMenu').setOrigin(1, 0).setInteractive().setScale(2);

    backButton.on('pointerup', () => {
      this.scene.start('MenuScene');
    });
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

export default Scoreboard;