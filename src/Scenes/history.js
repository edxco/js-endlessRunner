import Phaser from 'phaser';

export default class History extends Phaser.Scene {
  constructor() {
    super('History');
  }

  create() {
    this.add.text(32, 32, 'Help our heroe to scape the Ice World and reach a warm destination. \n The world is slippery and has a lot of enemies. \n Only the quickest will win', {
      font: '35px equipmentPro',
      fill: '#fff',
      align: 'center',
    }).setWordWrapWidth(750);

    const start = this.add.text(32, 300, 'Start Game', {
      font: '40px equipmentPro',
      align: 'center',
      fill: '#B25754',
      stroke: '#fff',
      strokeThickness: 10,
    }).setWordWrapWidth(750);

    start.setInteractive();

    start
      .on('pointerover', () => {
        this.enterButtonHoverState(start);
      })
      .on('pointerdown', () => {
        this.scene.switch('Game');
      })
      .on('pointerout', () => {
        this.enterButtonRestState(start);
      });
  }

  /* eslint class-methods-use-this:
  ["error", { "exceptMethods": ["enterButtonHoverState", "enterButtonRestState"] }] */
  enterButtonHoverState(btn) {
    btn.setStyle({
      fill: '#DA1F4C',
    });
  }

  enterButtonRestState(btn) {
    btn.setStyle({
      fill: '#fff',
    });
  }
}