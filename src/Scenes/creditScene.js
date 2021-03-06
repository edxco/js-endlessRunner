import 'phaser';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  preload() {}

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits', {
      fontFamily: 'EquipmentPro',
      strokeThickness: 12,
      stroke: '#DA1F4C',
      fontSize: '32px',
      fill: '#fff'
    });
    this.madeByText = this.add.text(0, 0, 'Created By: Edxco', {
      fontFamily: 'EquipmentPro',
      strokeThickness: 12,
      stroke: '#fff',
      fontSize: '26px',
      fill: '#DA1F4C'
    });
    this.zone = this.add.zone(400, 300, 800, 600);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone
    );

    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function () {
        this.destroy;
      }
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this)
    });
  }
};